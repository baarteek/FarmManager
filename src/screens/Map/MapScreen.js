import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useMapContext } from '../../context/MapProvider';
import useLocation from '../../hooks/useLocation';
import CenterMapButton from '../../components/CenterMapButton'; 
import FunctionListButton from '../../components/FunctionListButton';
import LoadingView from '../../components/LoadingView';
import { parseCoordinates } from '../../utils/CoordinateUtils';
import FieldDetailsModal from '../../components/FieldDetailsModal';

const MapScreen = () => {
  const { location, errorMsg } = useLocation();
  const { mapData, loading, error, fetchMapData } = useMapContext();
  const mapRef = useRef(null);
  const [mapType, setMapType] = useState('hybrid');
  const [selectedField, setSelectedField] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (location) {
      fetchMapData('90673cf9-dbf8-4133-b465-2b7d47ca2a00');
    }
  }, [location]);

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
    setSelectedField(field);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedField(null);
  };

  if (errorMsg) {
    return <Text>Error: {errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            mapType={mapType}
            initialRegion={location}
            showsUserLocation={true}
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
            <TouchableOpacity onPress={toggleMapType}>
              <Text style={styles.listItem}>
                {mapType === 'standard' ? 'Change to satellite view' : 'Change to normal view'}
              </Text>
            </TouchableOpacity>
          </FunctionListButton>

          <FieldDetailsModal 
            isVisible={isModalVisible}
            onClose={closeModal}
            field={selectedField}
          />
        </>
      ) : (
        <LoadingView title='Loading location...' />
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
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
  },
});

export default MapScreen;
