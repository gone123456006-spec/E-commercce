import React from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { toast } from 'sonner';

export const LocationSelector: React.FC = () => {
    const {
        latitude,
        longitude,
        locationLoading,
        locationError,
        detectLocation
    } = useLocation();

    const handleDetectLocation = () => {
        detectLocation();
        toast.info('Detecting your location...');
    };

    if (latitude && longitude) {
        return null; // Hide selector when location is detected
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                            Enable location for better experience
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            We'll use your location to check delivery availability and show you accurate delivery times.
                        </p>

                        {/* Error Message */}
                        {locationError && (
                            <div className="flex items-start gap-2.5 text-red-700 text-sm mb-4 bg-red-50 border border-red-200 p-3.5 rounded-lg">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{locationError}</span>
                            </div>
                        )}

                        {/* Button */}
                        <button
                            onClick={handleDetectLocation}
                            disabled={locationLoading}
                            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5 shadow-sm hover:shadow-md disabled:shadow-none"
                        >
                            {locationLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Detecting location...</span>
                                </>
                            ) : (
                                <>
                                    <MapPin className="w-4 h-4" />
                                    <span>Detect my location</span>
                                </>
                            )}
                        </button>

                        {/* Privacy Note */}
                        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                            Your location data is only used to check delivery availability and is not stored.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
