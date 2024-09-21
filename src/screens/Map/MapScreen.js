import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import CenterMapButton from '../../components/CenterMapButton';

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
    return <Text>{errorMsg}</Text>;
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
        </>
      ) : (
        <Text>Ładowanie lokalizacji...</Text>
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
});

export default MapScreen;
