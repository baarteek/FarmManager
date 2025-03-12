import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const checkStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    console.log('Stored values:', values);
  } catch (error) {
    console.error('Error fetching AsyncStorage data', error);
  }
};

export const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage has been cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
    }
  };