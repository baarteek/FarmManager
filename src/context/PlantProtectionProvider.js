import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlantProtectionContext = createContext();

export const usePlantProtectionContext = () => useContext(PlantProtectionContext);

export const PlantProtectionProvider = ({ children }) => {
    const [plantProtections, setPlantProtections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPlantProtectionsFromStorage = async () => {
        try {
            const storedPlantProtections = await AsyncStorage.getItem('plantProtections');
            if (storedPlantProtections) {
                setPlantProtections(JSON.parse(storedPlantProtections));
            }
        } catch (err) {
            console.error('Error loading plant protections from storage:', err.message);
        }
    };

    const savePlantProtectionsToStorage = async (updatedPlantProtections) => {
        try {
            await AsyncStorage.setItem('plantProtections', JSON.stringify(updatedPlantProtections));
        } catch (err) {
            console.error('Error saving plant protections to storage:', err.message);
        }
    };

    const fetchPlantProtectionById = async (id) => {
        setLoading(true);
        try {
            const storedPlantProtections = await AsyncStorage.getItem('plantProtections');
            if (storedPlantProtections) {
                const parsedPlantProtections = JSON.parse(storedPlantProtections);
                const plantProtection = parsedPlantProtections.find(pp => pp.id === id);
                if (plantProtection) {
                    setError(null);
                    return plantProtection;
                }
            }
            throw new Error('Plant protection not found.');
        } catch (err) {
            console.error('Error fetching plant protection:', err.message);
            setError('Failed to load plant protection.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchPlantProtections = async (cropId) => {
        setLoading(true);
        try {
            const storedPlantProtections = await AsyncStorage.getItem('plantProtections');
            if (storedPlantProtections) {
                const parsedPlantProtections = JSON.parse(storedPlantProtections);
                setPlantProtections(parsedPlantProtections.filter(pp => pp.cropId === cropId));
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching plant protections:', err.message);
            setError('Failed to load plant protections.');
        } finally {
            setLoading(false);
        }
    };

    const addPlantProtection = async (newPlantProtection) => {
        setLoading(true);
        try {
            const updatedPlantProtections = [...plantProtections, newPlantProtection];
            setPlantProtections(updatedPlantProtections);
            await savePlantProtectionsToStorage(updatedPlantProtections);
            setError(null);
        } catch (err) {
            console.error('Error adding plant protection:', err.message);
            setError('Failed to add plant protection.');
        } finally {
            setLoading(false);
        }
    };

    const editPlantProtection = async (plantProtectionId, updatedPlantProtection) => {
        setLoading(true);
        try {
            const updatedPlantProtections = plantProtections.map(pp =>
                pp.id === plantProtectionId ? { ...pp, ...updatedPlantProtection } : pp
            );
            setPlantProtections(updatedPlantProtections);
            await savePlantProtectionsToStorage(updatedPlantProtections);
            setError(null);
        } catch (err) {
            console.error('Error updating plant protection:', err.message);
            setError('Failed to update plant protection.');
        } finally {
            setLoading(false);
        }
    };

    const deletePlantProtection = async (id) => {
        setLoading(true);
        try {
            const updatedPlantProtections = plantProtections.filter(pp => pp.id !== id);
            setPlantProtections(updatedPlantProtections);
            await savePlantProtectionsToStorage(updatedPlantProtections);
            setError(null);
        } catch (err) {
            console.error('Error deleting plant protection:', err.message);
            setError('Failed to delete plant protection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlantProtectionsFromStorage();
    }, []);

    return (
        <PlantProtectionContext.Provider value={{
            plantProtections,
            loading,
            error,
            addPlantProtection,
            editPlantProtection,
            deletePlantProtection,
            fetchPlantProtections,
            fetchPlantProtectionById
        }}>
            {children}
        </PlantProtectionContext.Provider>
    );
};