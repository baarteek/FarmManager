import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import CenterMapButton from '../../components/CenterMapButton'; 
import FunctionListButton from '../../components/FunctionListButton';
import LoadingView from '../../components/LoadingView';

const MapScreen = () => {
  const { location, errorMsg } = useLocation();
  const mapRef = useRef(null);

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

  if (errorMsg) {
    return ;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
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
            <TouchableOpacity onPress={() => alert('Funkcja 1')}>
              <Text style={styles.listItem}>Function 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Funkcja 2')}>
              <Text style={styles.listItem}>Function 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Funkcja 3')}>
              <Text style={styles.listItem}>Function 3</Text>
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
