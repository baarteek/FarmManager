import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SoilMeasurementContext = createContext();

export const useSoilMeasurementContext = () => useContext(SoilMeasurementContext);

export const SoilMeasurementProvider = ({ children }) => {
  const [soilMeasurements, setSoilMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSoilMeasurementsFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem('soilMeasurements');
      if (stored) {
        setSoilMeasurements(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading soil measurements from storage:', err.message);
    }
  };

  const saveSoilMeasurementsToStorage = async (updatedMeasurements) => {
    try {
      await AsyncStorage.setItem('soilMeasurements', JSON.stringify(updatedMeasurements));
    } catch (err) {
      console.error('Error saving soil measurements to storage:', err.message);
    }
  };

  const fetchSoilMeasurementById = async (id) => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('soilMeasurements');
      if (stored) {
        const measurements = JSON.parse(stored);
        const measurement = measurements.find(m => m.id === id);
        if (measurement) {
          setError(null);
          return measurement;
        }
      }
      throw new Error('Soil measurement not found.');
    } catch (err) {
      console.error('Error fetching soil measurement:', err.message);
      setError('Failed to load soil measurement.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSoilMeasurements = async (fieldId) => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('soilMeasurements');
      if (stored) {
        const measurements = JSON.parse(stored);
        setSoilMeasurements(measurements.filter(m => m.fieldId === fieldId));
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching soil measurements:', err.message);
      setError('Failed to load soil measurements.');
    } finally {
      setLoading(false);
    }
  };

  const addSoilMeasurement = async (newMeasurement) => {
    setLoading(true);
    try {
      setSoilMeasurements(prev => {
        const updated = [...prev, newMeasurement];
        saveSoilMeasurementsToStorage(updated);
        return updated;
      });
      setError(null);
    } catch (err) {
      console.error('Error adding soil measurement:', err.message);
      setError('Failed to add soil measurement.');
    } finally {
      setLoading(false);
    }
  };

  const editSoilMeasurement = async (updatedMeasurement) => {
    setLoading(true);
    try {
        console.log(updatedMeasurement);
      const updatedMeasurements = soilMeasurements.map(measurement => {
        if (measurement.id === updatedMeasurement.id) {
          return { 
            ...measurement, 
            ...updatedMeasurement, 
            fieldId: measurement.fieldId 
          };
        }
        return measurement;
      });
      setSoilMeasurements(updatedMeasurements);
      await saveSoilMeasurementsToStorage(updatedMeasurements);
      setError(null);
    } catch (err) {
      console.error('Error updating soil measurement:', err.message);
      setError('Failed to update soil measurement.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSoilMeasurement = async (id) => {
    setLoading(true);
    try {
      setSoilMeasurements(prev => {
        const updated = prev.filter(m => m.id !== id);
        saveSoilMeasurementsToStorage(updated);
        return updated;
      });
      setError(null);
    } catch (err) {
      console.error('Error deleting soil measurement:', err.message);
      setError('Failed to delete soil measurement.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSoilMeasurementsFromStorage();
  }, []);

  return (
    <SoilMeasurementContext.Provider value={{
      soilMeasurements,
      loading,
      error,
      addSoilMeasurement,
      editSoilMeasurement,
      handleDeleteSoilMeasurement,
      fetchSoilMeasurements,
      fetchSoilMeasurementById
    }}>
      {children}
    </SoilMeasurementContext.Provider>
  );
};

export default SoilMeasurementProvider;