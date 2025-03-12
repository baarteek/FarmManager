import proj4 from 'proj4';

const EPSG2180 = "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +datum=WGS84 +units=m +no_defs";
const EPSG4326 = 'EPSG:4326';

export const convertToWGS84 = (geometry) => {
  if (!Array.isArray(geometry) || geometry.length % 2 !== 0) {
    console.error('Invalid geometry format:', geometry);
    return [];
  }

  const transformedCoordinates = [];
  for (let i = 0; i < geometry.length; i += 2) {
    const [longitude, latitude] = proj4(EPSG2180, EPSG4326, [geometry[i], geometry[i + 1]]);
    transformedCoordinates.push({ latitude, longitude });
  }

  return transformedCoordinates;
};

export const parseCoordinates = (geometry) => {
  try {
    if (!Array.isArray(geometry) || geometry.length === 0) {
      console.error('Invalid geometry format: Expected an array of numbers');
      return [];
    }

    return convertToWGS84(geometry);
  } catch (err) {
    console.error('Error parsing coordinates:', err);
    return [];
  }
};