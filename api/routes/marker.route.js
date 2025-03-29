import express from 'express';
import { createMarker, getMarkers, test } from '../controllers/marker.controller.js';

const router = express.Router();

// Test route to check if the API is working
router.get('/test', test);

// Route to create a new marker (location and name only)
router.post('/createMarker', createMarker);

// Route to get all markers
router.get('/getMarkers', getMarkers);

export default router;
