// import Order from '../model/order.js';
// import User from '../model/user.js'; 
// import mongoose from 'mongoose';

// // Accept Membership Request
// export const approveMembership = async (req, res) => {
//     const { orderId } = req.body;
  
//     try {
//       const order = await Order.findById(orderId);
//       if (!order || order.type !== 'membership') {
//         return res.status(404).json({ error: 'Membership request not found' });
//       }
  
//       if (order.status !== 'paid') {
//         return res.status(400).json({ error: 'Payment not completed yet' });
//       }
  
//       const user = await User.findByIdAndUpdate(
//         order.userId,
//         { isMember: true, dateofexpire: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) },
//         { new: true }
//       );
  
//       res.status(200).json({ message: 'Membership approved', order, user });
//     } catch (error) {
//       console.error('Error approving membership:', error);
//       res.status(500).json({ error: 'Failed to approve membership' });
//     }
//   };
  
// // Reject Membership Request
// export const rejectMembership = async (req, res) => {
//     const { orderId } = req.body;
  
//     try {
//       const order = await Order.findById(orderId);
//       if (!order || order.type !== 'membership') {
//         return res.status(404).json({ error: 'Membership request not found' });
//       }
  
//       if (order.status === 'paid') {
//         return res.status(400).json({ error: 'Cannot reject a paid membership' });
//       }
  
//       order.status = 'rejected';
//       await order.save();
  
//       res.status(200).json({ message: 'Membership request rejected', order });
//     } catch (error) {
//       console.error('Error rejecting membership:', error);
//       res.status(500).json({ error: 'Failed to reject membership' });
//     }
//   };
  