import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';
import CenterMapButton from '../../components/CenterMapButton';
import FunctionListButton from '../../components/FunctionListButton';
import LoadingView from '../../components/LoadingView';
import { parseCoordinates } from '../../utils/CoordinateUtils';
import FieldDetailsModal from '../../components/FieldDetailsModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorView from '../../components/ErrorView';
import { useLocationContext } from '../../context/LocationProvider';
import { calculateDistance, calculateMidpoint, calculatePolygonArea } from '../../utils/MapCalculations';

const MapScreen = () => {
  const mapRef = useRef(null);
  const { location, locationLoading } = useLocationContext();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [farmErrorMsg, setFarmErrorMsg] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mapType, setMapType] = useState('hybrid');
  const [distanceMode, setDistanceMode] = useState(false);
  const [polygonMode, setPolygonMode] = useState(false);
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    loadFarmData();
  }, []);

  const loadFarmData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('farms');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setFields(parsedData[0].fields);
        }
      }
    } catch (error) {
      setFarmErrorMsg('Error loading farm data');
    } finally {
      setLoading(false);
    }
  };

  const toggleMapType = () => {
    setMapType(prevType => (prevType === 'standard' ? 'hybrid' : 'standard'));
  };

  const handlePolygonPress = (field) => {
    setSelectedField(field);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedField(null);
  };

  const centerMapOnLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  const toggleDistanceMode = () => {
    if (distanceMode) {
      setPoints([]);
      setLines([]);
      setColorIndex(0);
    }
    setDistanceMode(!distanceMode);
    if (!distanceMode) {
      setPolygonMode(false);
      setPolygons([]);
    }
  };

  const togglePolygonMode = () => {
    if (polygonMode) {
      setPoints([]);
      setPolygons([]);
      setColorIndex(0);
    }
    setPolygonMode(!polygonMode);
    if (!polygonMode) {
      setDistanceMode(false);
      setLines([]);
    }
  };

  const handleMapPress = (e) => {
    const newPoint = e.nativeEvent.coordinate;
    if (polygonMode) {
      if (
        points.length > 2 &&
        newPoint.latitude === points[0].latitude &&
        newPoint.longitude === points[0].longitude
      ) {
        const area = calculatePolygonArea(points);
        const newPolygon = {
          points,
          area,
          color: colors[colorIndex],
        };
        setPolygons([...polygons, newPolygon]);
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        setPoints([]);
      } else {
        setPoints([...points, newPoint]);
      }
    }
    if (distanceMode) {
      setPoints([...points, newPoint]);
      if (points.length === 1) {
        const newLine = {
          points: [points[0], newPoint],
          color: colors[colorIndex],
          distance: calculateDistance(points[0], newPoint),
          midpoint: calculateMidpoint(points[0], newPoint),
        };
        setLines([...lines, newLine]);
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        setPoints([]);
      }
    }
  };

  if (locationLoading) {
    return <LoadingView title="Loading location..." />;
  }
  if (!location) {
    return <LoadingView title="Fetching location..." />;
  }
  if (loading) {
    return <LoadingView title="Loading map data..." />;
  }
  if (farmErrorMsg) {
    return <ErrorView message={farmErrorMsg} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapType}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        onPress={handleMapPress}
      >
        {fields.map((field, index) => {
          const coords = parseCoordinates(field.geometry);
          const mid = coords.length > 1 ? calculateMidpoint(coords[0], coords[Math.floor(coords.length / 2)]) : null;
          return (
            <React.Fragment key={index}>
              <Polygon
                coordinates={coords}
                strokeColor="#00ff00"
                fillColor="rgba(0, 255, 0, 0.1)"
                strokeWidth={2}
                onPress={() => handlePolygonPress(field)}
              />
              {mid && field.crop && (
                <Marker coordinate={mid} anchor={{ x: 0.5, y: 0.5 }}>
                  <View style={styles.cropLabel}>
                    <Text style={styles.cropText}>{field.crop}</Text>
                  </View>
                </Marker>
              )}
            </React.Fragment>
          );
        })}
        {points.map((point, index) => (
          <Marker key={`point-${index}`} coordinate={point} />
        ))}
        {lines.map((line, index) => (
          <React.Fragment key={`line-${index}`}>
            <Polyline
              coordinates={line.points}
              strokeColor={line.color}
              strokeWidth={2}
            />
            <Marker
              coordinate={line.midpoint}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={styles.distanceLabel}>
                <Text style={styles.distanceText}>{`${line.distance} km`}</Text>
              </View>
            </Marker>
          </React.Fragment>
        ))}
        {polygons.map((polygon, index) => (
          <React.Fragment key={`polygon-${index}`}>
            <Polygon
              coordinates={polygon.points}
              strokeColor={polygon.color}
              fillColor="rgba(0, 255, 0, 0.2)"
              strokeWidth={2}
            />
            {polygon.points.length >= 3 && (
              <Marker
                coordinate={calculateMidpoint(
                  polygon.points[0],
                  polygon.points[Math.floor(polygon.points.length / 2)]
                )}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.areaLabel}>
                  <Text style={styles.areaText}>{`${polygon.area} ha`}</Text>
                </View>
              </Marker>
            )}
          </React.Fragment>
        ))}
      </MapView>
      <CenterMapButton onPress={centerMapOnLocation} />
      <FunctionListButton>
        <TouchableOpacity onPress={toggleMapType} style={styles.listItemContainer}>
          <Ionicons name="map-outline" size={20} color="black" />
          <Text style={styles.listItem}>{mapType === 'standard' ? 'Change to satellite view' : 'Change to standard view'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDistanceMode} style={styles.listItemContainer}>
          <Ionicons name="analytics-outline" size={20} color="black" />
          <Text style={styles.listItem}>{distanceMode ? 'Cancel measuring distance' : 'Measure distance'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePolygonMode} style={styles.listItemContainer}>
          <Ionicons name="shapes-outline" size={20} color="black" />
          <Text style={styles.listItem}>{polygonMode ? 'Cancel polygon mode' : 'Start polygon mode'}</Text>
        </TouchableOpacity>
      </FunctionListButton>
      <FieldDetailsModal isVisible={isModalVisible} onClose={closeModal} field={selectedField} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItem: {
    marginLeft: 10,
    fontSize: 16,
  },
  distanceLabel: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  areaLabel: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  areaText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cropLabel: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  cropText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MapScreen;