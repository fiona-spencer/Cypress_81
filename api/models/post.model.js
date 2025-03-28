import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    severity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dateOfIncident: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://thumbs.dreamstime.com/b/seamless-banner-toronto%C3%A2%E2%82%AC%E2%84%A2s-skyline-toronto-canada-seamless-banner-city%C3%A2%E2%82%AC%E2%84%A2s-skyline-hand-drawn-black-white-118891593.jpg',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
