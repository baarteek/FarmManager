import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import CenterMapButton from '../../components/CenterMapButton'; 
import FunctionListButton from '../../components/FunctionListButton';
import LoadingView from '../../components/LoadingView';

const MapScreen = () => {
  const { location, errorMsg } = useLocation();
  const mapRef = useRef(null);
  const [mapType, setMapType] = useState('hybrid');

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
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Moja lokalizacja"
              description="Tutaj jesteś!"
              pinColor='blue'
            />

            <Circle
              center={{ latitude: location.latitude, longitude: location.longitude }}
              radius={100}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.2)"
            />
          </MapView>

          <CenterMapButton onPress={centerMapOnLocation} />

          <FunctionListButton>
            <TouchableOpacity onPress={toggleMapType}>
              <Text style={styles.listItem}>
                {mapType === 'standard' ? 'Change to satellite view' : 'Change to normal view'}
              </Text>
            </TouchableOpacity>
          </FunctionListButton>
        </>
      ) : (
        <LoadingView title='Loading location' />
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
