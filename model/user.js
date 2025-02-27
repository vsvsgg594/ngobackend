import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateofexpire: { type: String },
    img: { type: String },
    isMember: { type: Boolean, default: false }, // Track membership status
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);