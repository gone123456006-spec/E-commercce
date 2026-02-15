import React from 'react';
import { Clock, CheckCircle, XCircle, Navigation, Truck } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export const DeliveryBanner: React.FC = () => {
    const {
        latitude,
        longitude,
        deliveryAvailable,
        distance,
        estimatedTime,
        deliveryFee,
        nearestStore,
        deliveryMessage,
        deliveryLoading,
        clearLocation
    } = useLocation();

    if (!latitude || !longitude || deliveryLoading) {
        return null;
    }

    return (
        <div className={`rounded-2xl shadow-sm overflow-hidden mb-6 border ${deliveryAvailable
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
            }`}>
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                        {/* Status Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${deliveryAvailable ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                            {deliveryAvailable ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h4 className={`text-lg font-semibold mb-1 ${deliveryAvailable ? 'text-green-900' : 'text-red-900'
                                }`}>
                                {deliveryMessage}
                            </h4>

                            {deliveryAvailable && nearestStore && (
                                <div className="space-y-2.5 mt-4">
                                    {/* Distance */}
                                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            <Navigation className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="font-medium">{distance?.toFixed(1)} km</span>
                                        <span className="text-gray-500">from {nearestStore.name}</span>
                                    </div>

                                    {/* Delivery Time */}
                                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <span className="font-medium">{estimatedTime}</span>
                                        <span className="text-gray-500">delivery time</span>
                                    </div>

                                    {/* Delivery Fee */}
                                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            <Truck className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <span className="text-gray-500">Delivery fee:</span>
                                        {deliveryFee === 0 ? (
                                            <span className="font-bold text-green-600 text-base">FREE</span>
                                        ) : (
                                            <span className="font-semibold text-gray-900">₹{deliveryFee}</span>
                                        )}
                                    </div>

                                    {/* Store Closed Warning */}
                                    {!nearestStore.isOpen && (
                                        <div className="flex items-start gap-2 text-sm text-orange-700 bg-orange-100 border border-orange-200 p-3 rounded-lg mt-3">
                                            <span className="text-base">⚠️</span>
                                            <span className="font-medium">
                                                Store is currently closed. Opens at {nearestStore.operatingHours?.open}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!deliveryAvailable && (
                                <p className="text-sm text-red-700 mt-3 leading-relaxed">
                                    We're working hard to expand our delivery coverage. Stay tuned!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Change Location Button */}
                    <button
                        onClick={clearLocation}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium underline flex-shrink-0 transition-colors"
                    >
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};
