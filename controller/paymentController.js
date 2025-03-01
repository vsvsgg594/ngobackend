// // Initialize Razorpay
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import User from '../model/user.js';
// import Order from '../model/order.js';
// import mongoose from 'mongoose';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Initiate Payment
// export const initiatePayment = async (req, res) => {
//     const { userId, amount, type } = req.body; 
  
//     console.log("Received userId:", userId);
  
//     try {
//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//         console.error("❌ Invalid ObjectId format:", userId);
//         return res.status(400).json({ error: "Invalid User ID format" });
//       }
  
//       const user = await User.findById(new mongoose.Types.ObjectId(userId));
  
//       if (!user) {
//         console.error("❌ User not found in DB:", userId);
//         return res.status(404).json({ error: "User not found" });
//       }
  
//       console.log("✅ User found:", user);
  
//       const options = {
//         amount: amount * 100, // Convert to paise
//         currency: "INR",
//         receipt: `receipt_${Date.now()}`,
//         payment_capture: 1,
//       };
  
//       const order = await razorpay.orders.create(options);
  
//       const newOrder = new Order({
//         userId,
//         type,
//         amount,
//         razorpayOrderId: order.id,
//         status: "pending",
//       });
  
//       await newOrder.save();
  
//       res.status(200).json({ id: order.id, currency: order.currency, amount: order.amount });
  
//     } catch (error) {
//       console.error("🔥 Error creating Razorpay order:", error);
//       res.status(500).json({ error: "Failed to create payment order" });
//     }
//   };

// // Verify Payment and Update User/Membership Status
// export const verifyPayment = async (req, res) => {
//     const { order_id, payment_id, signature, userId } = req.body;
  
//     try {
//       const generatedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(`${order_id}|${payment_id}`)
//         .digest('hex');
  
//       if (generatedSignature !== signature) {
//         return res.status(400).json({ error: 'Invalid payment signature' });
//       }
  
//       const order = await Order.findOneAndUpdate(
//         { razorpayOrderId: order_id },
//         { razorpayPaymentId: payment_id, status: 'paid' },
//         { new: true }
//       );
  
//       if (!order) return res.status(404).json({ error: 'Order not found' });
  
//       res.status(200).json({ message: 'Payment verified successfully', order });
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       res.status(500).json({ error: 'Failed to verify payment' });
//     }
//   };
  