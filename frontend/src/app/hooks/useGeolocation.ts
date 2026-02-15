import { useState } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
    loading: boolean;
}

export const useGeolocation = () => {
    const [location, setLocation] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: false
    });

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                error: 'Geolocation is not supported by your browser',
                loading: false
            }));
            return;
        }

        setLocation(prev => ({ ...prev, loading: true, error: null }));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        break;
                }

                setLocation(prev => ({
                    ...prev,
                    error: errorMessage,
                    loading: false
                }));
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    const clearLocation = () => {
        setLocation({
            latitude: null,
            longitude: null,
            error: null,
            loading: false
        });
    };

    return {
        ...location,
        requestLocation,
        clearLocation,
        hasLocation: location.latitude !== null && location.longitude !== null
    };
};
