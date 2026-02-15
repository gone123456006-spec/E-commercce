import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useDeliveryCheck } from '../hooks/useDeliveryCheck';

interface LocationContextType {
    // Current location
    latitude: number | null;
    longitude: number | null;
    locationError: string | null;
    locationLoading: boolean;

    // Delivery info
    deliveryAvailable: boolean;
    distance: number | null;
    estimatedTime: string | null;
    deliveryFee: number | null;
    nearestStore: any | null;
    deliveryMessage: string | null;
    deliveryLoading: boolean;

    // Selected address
    selectedAddress: any | null;

    // Actions
    detectLocation: () => void;
    checkDelivery: (lat: number, lon: number) => Promise<void>;
    setSelectedAddress: (address: any) => void;
    clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const geolocation = useGeolocation();
    const deliveryCheck = useDeliveryCheck();
    const [selectedAddress, setSelectedAddress] = useState<any | null>(null);

    // Auto-check delivery when location is detected
    useEffect(() => {
        if (geolocation.latitude && geolocation.longitude && !geolocation.loading) {
            deliveryCheck.checkDelivery(geolocation.latitude, geolocation.longitude);
        }
    }, [geolocation.latitude, geolocation.longitude]);

    const detectLocation = () => {
        geolocation.requestLocation();
    };

    const checkDelivery = async (lat: number, lon: number) => {
        await deliveryCheck.checkDelivery(lat, lon);
    };

    const clearLocation = () => {
        geolocation.clearLocation();
        deliveryCheck.clearDeliveryInfo();
        setSelectedAddress(null);
    };

    return (
        <LocationContext.Provider
            value={{
                // Location
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                locationError: geolocation.error,
                locationLoading: geolocation.loading,

                // Delivery
                deliveryAvailable: deliveryCheck.deliveryInfo.available,
                distance: deliveryCheck.deliveryInfo.distance,
                estimatedTime: deliveryCheck.deliveryInfo.estimatedTime,
                deliveryFee: deliveryCheck.deliveryInfo.deliveryFee,
                nearestStore: deliveryCheck.deliveryInfo.nearestStore,
                deliveryMessage: deliveryCheck.deliveryInfo.message,
                deliveryLoading: deliveryCheck.loading,

                // Selected address
                selectedAddress,

                // Actions
                detectLocation,
                checkDelivery,
                setSelectedAddress,
                clearLocation
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};
