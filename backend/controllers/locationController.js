import Store from '../models/Store.js';
import { calculateHaversineDistance, isWithinRadius, estimateDeliveryTime, calculateDeliveryFee } from '../utils/distanceCalculator.js';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * @route   POST /api/location/check-delivery
 * @desc    Check if delivery is available at given location
 * @access  Public
 */
export const checkDeliveryAvailability = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body;

        // Find nearest active store
        const stores = await Store.find({ isActive: true });

        if (stores.length === 0) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                available: false,
                message: 'No active stores found'
            });
        }

        // Calculate distance to each store and find nearest
        let nearestStore = null;
        let minDistance = Infinity;

        for (const store of stores) {
            const [storeLon, storeLat] = store.location.coordinates;
            const distance = calculateHaversineDistance(latitude, longitude, storeLat, storeLon);

            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = store;
            }
        }

        // Check if within delivery radius
        const available = minDistance <= nearestStore.deliveryRadius;
        const estimatedTime = estimateDeliveryTime(minDistance);
        const deliveryFee = calculateDeliveryFee(minDistance);

        res.status(HTTP_STATUS.OK).json({
            available,
            distance: minDistance,
            estimatedTime,
            deliveryFee,
            nearestStore: available ? {
                id: nearestStore._id,
                name: nearestStore.name,
                address: nearestStore.address,
                distance: minDistance,
                isOpen: nearestStore.isOpen()
            } : null,
            message: available
                ? `Delivery available in ${estimatedTime}`
                : `Sorry, we don't deliver to this location yet`
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/location/nearest-store
 * @desc    Find nearest store to user location
 * @access  Public
 */
export const getNearestStore = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body;

        const stores = await Store.find({ isActive: true });

        if (stores.length === 0) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'No active stores found'
            });
        }

        // Find nearest store
        let nearestStore = null;
        let minDistance = Infinity;

        for (const store of stores) {
            const [storeLon, storeLat] = store.location.coordinates;
            const distance = calculateHaversineDistance(latitude, longitude, storeLat, storeLon);

            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = store;
            }
        }

        res.status(HTTP_STATUS.OK).json({
            store: {
                id: nearestStore._id,
                name: nearestStore.name,
                address: nearestStore.address,
                city: nearestStore.city,
                distance: minDistance,
                deliveryRadius: nearestStore.deliveryRadius,
                isOpen: nearestStore.isOpen(),
                operatingHours: nearestStore.operatingHours
            }
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/location/calculate-distance
 * @desc    Calculate distance between two points
 * @access  Public
 */
export const calculateDistance = async (req, res, next) => {
    try {
        const { fromLat, fromLon, toLat, toLon } = req.body;

        const distance = calculateHaversineDistance(fromLat, fromLon, toLat, toLon);
        const estimatedTime = estimateDeliveryTime(distance);
        const deliveryFee = calculateDeliveryFee(distance);

        res.status(HTTP_STATUS.OK).json({
            distance,
            estimatedTime,
            deliveryFee
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/location/delivery-estimate
 * @desc    Get delivery estimate for a location
 * @access  Public
 */
export const getDeliveryEstimate = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body;

        // Find nearest store
        const stores = await Store.find({ isActive: true });

        if (stores.length === 0) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: 'No active stores found'
            });
        }

        let minDistance = Infinity;
        for (const store of stores) {
            const [storeLon, storeLat] = store.location.coordinates;
            const distance = calculateHaversineDistance(latitude, longitude, storeLat, storeLon);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }

        const estimatedTime = estimateDeliveryTime(minDistance);
        const deliveryFee = calculateDeliveryFee(minDistance);

        res.status(HTTP_STATUS.OK).json({
            distance: minDistance,
            estimatedTime,
            deliveryFee
        });

    } catch (error) {
        next(error);
    }
};
