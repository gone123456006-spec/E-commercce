const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Check if delivery is available at given location
 */
export const checkDeliveryAvailability = async (latitude: number, longitude: number) => {
    const response = await fetch(`${API_BASE_URL}/api/location/check-delivery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to check delivery availability');
    }

    return response.json();
};

/**
 * Find nearest store to user location
 */
export const getNearestStore = async (latitude: number, longitude: number) => {
    const response = await fetch(`${API_BASE_URL}/api/location/nearest-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to find nearest store');
    }

    return response.json();
};

/**
 * Calculate distance between two points
 */
export const calculateDistance = async (
    fromLat: number,
    fromLon: number,
    toLat: number,
    toLon: number
) => {
    const response = await fetch(`${API_BASE_URL}/api/location/calculate-distance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromLat, fromLon, toLat, toLon })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to calculate distance');
    }

    return response.json();
};

/**
 * Get delivery estimate for a location
 */
export const getDeliveryEstimate = async (latitude: number, longitude: number) => {
    const response = await fetch(`${API_BASE_URL}/api/location/delivery-estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to get delivery estimate');
    }

    return response.json();
};
