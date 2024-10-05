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
  