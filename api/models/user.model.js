import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Add userType field
    userType: {
      type: String,
      enum: ['Public', 'City Staff', 'Admin'], // Ensure only these types are allowed
      required: true, // Make it a required field
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
