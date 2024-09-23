import proj4 from 'proj4';

const EPSG2180 = "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +datum=WGS84 +units=m +no_defs";
const EPSG4326 = 'EPSG:4326';

export const convertToWGS84 = (coordinatesArray) => {
  return coordinatesArray[0].map(([x, y]) => {
    const [longitude, latitude] = proj4(EPSG2180, EPSG4326, [x, y]);
    return { latitude, longitude };
  });
};

export const parseCoordinates = (coordinatesString) => {
  try {
    const coordinatesArray = JSON.parse(coordinatesString);
    if (!Array.isArray(coordinatesArray) || coordinatesArray.length === 0) {
      console.error('Invalid coordinates format: coordinates should be a non-empty array');
      return [];
    }
    return convertToWGS84(coordinatesArray);
  } catch (err) {
    console.error('Error parsing coordinates:', err);
    return [];
  }
};
