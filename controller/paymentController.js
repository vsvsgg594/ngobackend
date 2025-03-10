import User from '../model/user.js';
import Order from '../model/order.js';
import order from '../model/order.js';

export const paymentInitiate = async (req, res) => {
    try {
        const { userId, type, amount, upiId,number } = req.body; // Fixed "upaId" typo

        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate type
        if (!['donation', 'membership'].includes(type)) {
            return res.status(400).json({ message: "Invalid payment type" });
        }

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        // Validate UPI ID for donations
        if (type === "donation" && !upiId) {
            return res.status(400).json({ message: "UPI ID is required for donations" });
        }

        // Create new order
        const newOrder = new Order({
            userId,
            type,
            amount,
            number,
            upiId,
            status: "pending"
        });

        await newOrder.save();

        return res.status(200).json({ 
            message: "Payment initiated successfully", 
            orderId: newOrder._id 
        });

    } catch (error) {
        console.error("Failed to initiate payment", error);
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

export const getAllPayMentRequest = async (req, res) => {
    try {
        const payments = await Order.find({ status: "pending", type: "membership" });


        if (!payments.length) {
            return res.status(404).json({ message: "No pending payments found" });
        }

        return res.status(200).json({ message: "All pending orders", payments });

    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export const getAllAcceptedPaymentRequest=async(req,res)=>{
    try{
        const orderConfime=await Order.find({status:"paid",type:"membership"});
        if(!orderConfime.length){
            return res.status(401).json({message:"not found "});
        }
        // await orderConfime.save();
        return res.status(200).json({message:"successfully fetch confirm data",orderConfime});

    }catch(err){
        console.log("failed to fetch ",err);
        return res.status(402).json({message:"failed to fetch data"})

    }
}

export const donationOrder=async(req,res)=>{
    try{
        const donationOrder=await Order.find({type:"donation"});
        if(!donationOrder.length){
            return res.status(402).json({message:"Not Donation found"});
        }
        return res.status(200).json({message:"Donation data",donationOrder});

    }catch(error){
        console.log("failed to fetch Donation order",error);
        return res.status(403).json({message:"failed to fetch donation order"});

    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { orderId } = req.body;  // Change from req.params to req.body

        // Find order by ID
        const order = await Order.findOne({ _id: orderId });

        // Check if order exists
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update status if the amount is valid
        if (order.amount > 0) {
            order.status = "paid";
            await order.save();
            return res.status(200).json({ message: "Payment verified successfully", order });
        }

        return res.status(400).json({ message: "Invalid order amount" });

    } catch (error) {
        console.error("Failed to verify payment:", error);
        return res.status(500).json({ message: "Failed to verify payment" });
    }
};


export const updateOrderStatus=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;
        const updateOrder=await Order.findByIdAndUpdate(
            id,
            {status:"paid"},
            {new:true}
        )
        if(!updateOrder){
            return res.status(404).json({message:"Order not found"});
        }
        await updateOrder.save();
        return res.status(200).json({message:"update status in order",updateOrder});
    }catch(err){
        console.log("failed to update order status",err);
        return res.status(402).json({message:"failed to update order status"})

    }
}