// import mongoose from 'mongoose';

// const orderSchema = mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     paymentmethods: {
//       type: String,
//       enum: ['cards', 'digital'],
//       required: true,
//     },
//     totalamount: {
//       type: Number,
//       required: true,
//     },
//     razorpayOrderId: {
//       type: String,
//       default: null,
//     },
//     razorpayPaymentId: {
//       type: String,
//       default: null,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'paid', 'failed'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model('Order', orderSchema);