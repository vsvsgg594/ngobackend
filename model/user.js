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
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);