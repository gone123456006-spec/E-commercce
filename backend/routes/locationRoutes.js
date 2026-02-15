import express from 'express';
import { checkDeliveryAvailability, getNearestStore, calculateDistance, getDeliveryEstimate } from '../controllers/locationController.js';
import { validateCoordinates } from '../middleware/locationValidator.js';

const router = express.Router();

/**
 * @route   POST /api/location/check-delivery
 * @desc    Check if delivery is available at location
 * @access  Public
 */
router.post('/check-delivery', validateCoordinates, checkDeliveryAvailability);

/**
 * @route   POST /api/location/nearest-store
 * @desc    Find nearest store to user location
 * @access  Public
 */
router.post('/nearest-store', validateCoordinates, getNearestStore);

/**
 * @route   POST /api/location/calculate-distance
 * @desc    Calculate distance between two points
 * @access  Public
 */
router.post('/calculate-distance', calculateDistance);

/**
 * @route   POST /api/location/delivery-estimate
 * @desc    Get delivery estimate for a location
 * @access  Public
 */
router.post('/delivery-estimate', validateCoordinates, getDeliveryEstimate);

export default router;
