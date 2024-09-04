import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username!'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email!'],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// We first check whether there is already a model
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;