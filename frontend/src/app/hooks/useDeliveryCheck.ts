import { useState } from 'react';
import { checkDeliveryAvailability, getNearestStore } from '../services/locationService';

interface DeliveryInfo {
    available: boolean;
    distance: number | null;
    estimatedTime: string | null;
    deliveryFee: number | null;
    nearestStore: any | null;
    message: string | null;
}

export const useDeliveryCheck = () => {
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        available: false,
        distance: null,
        estimatedTime: null,
        deliveryFee: null,
        nearestStore: null,
        message: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkDelivery = async (latitude: number, longitude: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await checkDeliveryAvailability(latitude, longitude);
            setDeliveryInfo(response);
            return response;
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to check delivery availability';
            setError(errorMessage);
            setDeliveryInfo({
                available: false,
                distance: null,
                estimatedTime: null,
                deliveryFee: null,
                nearestStore: null,
                message: errorMessage
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const findNearestStore = async (latitude: number, longitude: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getNearestStore(latitude, longitude);
            return response.store;
        } catch (err: any) {
            setError(err.message || 'Failed to find nearest store');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearDeliveryInfo = () => {
        setDeliveryInfo({
            available: false,
            distance: null,
            estimatedTime: null,
            deliveryFee: null,
            nearestStore: null,
            message: null
        });
        setError(null);
    };

    return {
        deliveryInfo,
        loading,
        error,
        checkDelivery,
        findNearestStore,
        clearDeliveryInfo
    };
};
