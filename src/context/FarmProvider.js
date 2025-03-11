import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FarmContext = createContext();

export const useFarmContext = () => useContext(FarmContext);

export const FarmProvider = ({ children }) => {
    const [farms, setFarms] = useState([]);
    const [farmList, setFarmList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const loadFarmsFromStorage = async () => {
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (storedFarms) {
                setFarms(JSON.parse(storedFarms));
            }
        } catch (err) {
            console.error('Error loading farms from storage:', err.message);
        }
    };

    const saveFarmsToStorage = async (updatedFarms) => {
        try {
            await AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));
        } catch (err) {
            console.error('Error saving farms to storage:', err.message);
        }
    };

    // Pobieranie farm (z lokalnej pamięci zamiast API)
    const fetchFarms = async () => {
        setLoading(true);
        try {
            await loadFarmsFromStorage();
            setError(null);
        } catch (err) {
            console.error('Error fetching farms:', err.message);
            setError('Failed to load farms.');
        } finally {
            setLoading(false);
        }
    };

    // Pobieranie listy farm (nazwy + ID)
    const fetchFarmsNamesAndId = async () => {
        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (storedFarms) {
                const parsedFarms = JSON.parse(storedFarms);
                setFarmList(parsedFarms.map(farm => ({ id: farm.id, name: farm.name })));
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching farm names and ids:', err.message);
            setError('Failed to load farm names and ids.');
        } finally {
            setLoading(false);
        }
    };

    const addFarm = async (newFarm) => {
        setLoading(true);
        try {
            const updatedFarms = [...farms, newFarm];
            setFarms(updatedFarms);
            await saveFarmsToStorage(updatedFarms);
            setError(null);
        } catch (err) {
            console.error('Error adding farm:', err.message);
            setError('Failed to add farm.');
        } finally {
            setLoading(false);
        }
    };

    // Edytowanie istniejącej farmy
    const editFarm = async (updatedFarm) => {
        setLoading(true);
        try {
            const updatedFarms = farms.map(farm => farm.id === updatedFarm.id ? updatedFarm : farm);
            setFarms(updatedFarms);
            await saveFarmsToStorage(updatedFarms);
            setError(null);
        } catch (err) {
            console.error('Error updating farm:', err.message);
            setError('Failed to update farm.');
        } finally {
            setLoading(false);
        }
    };

    // Usuwanie farmy
    const handleDeleteFarm = async (id) => {
        setLoading(true);
        try {
            const updatedFarms = farms.filter(farm => farm.id !== id);
            setFarms(updatedFarms);
            await saveFarmsToStorage(updatedFarms);
            setError(null);
        } catch (err) {
            console.error('Error deleting farm:', err.message);
            setError('Failed to delete farm.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFarmsFromStorage();
    }, []);

    return (
        <FarmContext.Provider value={{ 
            farms, 
            farmList, 
            loading, 
            error, 
            setError, 
            addFarm, 
            editFarm, 
            handleDeleteFarm, 
            fetchFarms, 
            fetchFarmsNamesAndId 
        }}>
            {children}
        </FarmContext.Provider>
    );
};