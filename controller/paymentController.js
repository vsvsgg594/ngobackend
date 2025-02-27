import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../model/user.js';
import Order from '../model/order.js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay Order
export const initiatePayment = async (req, res) => {
  const { userId, amount, currency, paymentMethod } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise (e.g., ₹500 = 50000 paise)
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(options);

    // Save the order details in the database
    const newOrder = new Order({
      userId,
      paymentmethods: paymentMethod,
      totalamount: amount,
      razorpayOrderId: order.id,
    });
    await newOrder.save();

    // Return the order details to the frontend
    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
};

// Verify Payment and Update User/Membership Status
export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, userId } = req.body;

  try {
    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update the order with payment ID and mark as paid
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: order_id },
      { razorpayPaymentId: payment_id, status: 'paid' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the user's membership status (if applicable)
    const user = await User.findByIdAndUpdate(
      userId,
      { isMember: true, dateofexpire: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }, // 1 year membership
      { new: true }
    );

    res.status(200).json({ message: 'Payment verified successfully', order, user });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};