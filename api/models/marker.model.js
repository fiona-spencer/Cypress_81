import mongoose from 'mongoose';

// Simplified marker schema with only location and locationName
const markerSchema = new mongoose.Schema(
  {
    position: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    locationName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Marker model
const Marker = mongoose.model('Marker', markerSchema);

export default Marker;
