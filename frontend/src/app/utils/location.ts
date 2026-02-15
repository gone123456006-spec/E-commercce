/**
 * Shop location and delivery range configuration.
 * Coordinates from: https://www.google.com/maps/@27.5942672,91.869274,21z
 */
export const SHOP_LOCATION = {
  latitude: 27.5942672,
  longitude: 91.869274,
  mapsUrl: 'https://www.google.com/maps?q=27.5942672,91.869274',
  deliveryRadiusKm: 6
};

/**
 * Calculate distance between two coordinates using Haversine formula.
 * Returns distance in kilometers.
 */
export function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Check if a location is within the delivery range (6km) of the shop.
 */
export function isWithinDeliveryRange(
  userLat: number,
  userLon: number
): { inRange: boolean; distanceKm: number } {
  const distanceKm = getDistanceKm(
    SHOP_LOCATION.latitude,
    SHOP_LOCATION.longitude,
    userLat,
    userLon
  );
  return {
    inRange: distanceKm <= SHOP_LOCATION.deliveryRadiusKm,
    distanceKm
  };
}
