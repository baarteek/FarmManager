import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';
import { useMapContext } from '../../context/MapProvider';
import { useFarmContext } from '../../context/FarmProvider';
import { useLocationContext } from '../../context/LocationProvider'; 
import CenterMapButton from '../../components/CenterMapButton'; 
import FunctionListButton from '../../components/FunctionListButton';
import LoadingView from '../../components/LoadingView';
import { parseCoordinates } from '../../utils/CoordinateUtils';
import FieldDetailsModal from '../../components/FieldDetailsModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { calculateDistance, calculateMidpoint, calculatePolygonArea } from '../../utils/MapCalculations';
import ErrorView from '../../components/ErrorView';
import ActionSheet from 'react-native-actionsheet';

const MapScreen = () => {
  const { location, errorMsg, loading: locationLoading } = useLocationContext();
  const mapRef = useRef(null);
  const { mapData, fetchMapDataByUser, fetchMapDataByFarmId } = useMapContext();
  const { farmList, fetchFarmsNamesAndId } = useFarmContext();
  
  const [mapType, setMapType] = useState('hybrid');
  const [selectedField, setSelectedField] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distanceMode, setDistanceMode] = useState(false);
  const [polygonMode, setPolygonMode] = useState(false);
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const [colorIndex, setColorIndex] = useState(0);
  const actionSheetRef = useRef(null);

  useEffect(() => {
    if (location) {
      fetchMapDataByUser();
    }
  }, [location]);

  useEffect(() => {
    fetchFarmsNamesAndId();
  }, []);

  const centerMapOnLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
  };

  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'standard' ? 'hybrid' : 'standard'));
  };

  const handlePolygonPress = (field) => {
    if (!distanceMode && !polygonMode) {
      setSelectedField(field);
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedField(null);
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

  const handleFarmSelection = async (farmId) => {
    setSelectedFarmId(farmId);
    if (farmId === 'all') {
      await fetchMapDataByUser();
    } else {
      await fetchMapDataByFarmId(farmId);
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const handleMapPress = (e) => {
    const newPoint = e.nativeEvent.coordinate;

    if (polygonMode) {
      if (points.length > 2 && newPoint.latitude === points[0].latitude && newPoint.longitude === points[0].longitude) {
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

  if (errorMsg) {
    return <ErrorView message={errorMsg} />;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
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
            {mapData && mapData.map((field, index) => (
              <Polygon
                key={index}
                coordinates={parseCoordinates(field.coordinates)}
                strokeColor="#00ff00"
                fillColor="rgba(0, 255, 0, 0.1)"
                strokeWidth={2}
                onPress={() => handlePolygonPress(field)}
              />
            ))}
          </MapView>

          <CenterMapButton onPress={centerMapOnLocation} />

          <FunctionListButton>
            <TouchableOpacity onPress={toggleMapType} style={styles.listItemContainer}>
              <Ionicons name="map-outline" size={20} color="black" />
              <Text style={styles.listItem}>
                {mapType === 'standard' ? 'Change to satellite view' : 'Change to standard view'}
              </Text>
            </TouchableOpacity>
          </FunctionListButton>
        </>
      ) : (
        <LoadingView title="Fetching location..." />
      )}
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
  }
});

export default MapScreen;