import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['donation', 'membership'], required: true },
  amount: { type: Number, required: true },
  upiId:{type:String,required:true},
  number:{type:String,required:true},
  status: { type: String, enum: ['pending', 'paid', 'failed', 'rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
