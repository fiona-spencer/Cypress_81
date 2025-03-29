import Marker from '../models/marker.model.js';
import { errorHandler } from '../utils/error.js';

// Test route to check if the API is working
export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

// Create a new marker (location only)
export const createMarker = async (req, res, next) => {
  try {
    const { position, locationName } = req.body;

    // Check if required fields are provided
    if (!position || !locationName) {
      return next(errorHandler(400, 'Position and locationName are required'));
    }

    // Create a new marker
    const newMarker = new Marker({
      position,
      locationName,
    });

    // Save the marker to the database
    await newMarker.save();

    // Send back the created marker data
    res.status(201).json({
      success: true,
      message: 'Marker created successfully!',
      data: newMarker,  // Returning the created marker as part of the response
    });
  } catch (error) {
    next(error);  // Pass the error to the error handler
  }
};

// Get all markers
export const getMarkers = async (req, res, next) => {
  try {
    const markers = await Marker.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Markers fetched successfully!',
      data: markers,  // Returning the list of markers
    });
  } catch (error) {
    next(error);  // Pass the error to the error handler
  }
};
