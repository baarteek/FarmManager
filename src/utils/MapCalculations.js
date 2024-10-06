export const calculateDistance = (point1, point2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (point2.latitude - point1.latitude) * (Math.PI / 180);
  const dLon = (point2.longitude - point1.longitude) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.latitude * (Math.PI / 180)) * Math.cos(point2.latitude * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2); 
};

export const calculateMidpoint = (point1, point2) => {
  const midLat = (point1.latitude + point2.latitude) / 2;
  const midLon = (point1.longitude + point2.longitude) / 2;
  return {
    latitude: midLat,
    longitude: midLon
  };
};

export const calculatePolygonArea = (points) => {
  const numPoints = points.length;
  let area = 0;

  for (let i = 0; i < numPoints; i++) {
    const { latitude: lat1, longitude: lon1 } = points[i];
    const { latitude: lat2, longitude: lon2 } = points[(i + 1) % numPoints];

    const radLat1 = lat1 * (Math.PI / 180);
    const radLat2 = lat2 * (Math.PI / 180);
    const radLon1 = lon1 * (Math.PI / 180);
    const radLon2 = lon2 * (Math.PI / 180);

    area += (radLon2 - radLon1) * (2 + Math.sin(radLat1) + Math.sin(radLat2));
  }

  const km2Area = Math.abs((area * 6371 ** 2) / 2);
  const hectares = km2Area * 100;
  return hectares.toFixed(2);
};

