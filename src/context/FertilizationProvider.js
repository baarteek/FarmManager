import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FertilizationContext = createContext();

export const useFertilizationContext = () => useContext(FertilizationContext);

export const FertilizationProvider = ({ children }) => {
    const [fertilizations, setFertilizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFertilizationsFromStorage = async () => {
        try {
            const storedFertilizations = await AsyncStorage.getItem('fertilizations');
            if (storedFertilizations) {
                setFertilizations(JSON.parse(storedFertilizations));
            }
        } catch (err) {
            console.error('Error loading fertilizations from storage:', err.message);
        }
    };

    const saveFertilizationsToStorage = async (updatedFertilizations) => {
        try {
            await AsyncStorage.setItem('fertilizations', JSON.stringify(updatedFertilizations));
        } catch (err) {
            console.error('Error saving fertilizations to storage:', err.message);
        }
    };

    const fetchFertilizationById = async (id) => {
        setLoading(true);
        try {
            const storedFertilizations = await AsyncStorage.getItem('fertilizations');
            if (storedFertilizations) {
                const parsedFertilizations = JSON.parse(storedFertilizations);
                const fertilization = parsedFertilizations.find(fertilization => fertilization.id === id);
                if (fertilization) {
                    setError(null);
                    return fertilization;
                }
            }
            throw new Error('Fertilization not found.');
        } catch (err) {
            console.error('Error fetching fertilization:', err.message);
            setError('Failed to load fertilization.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchFertilizations = async (cropId) => {
        setLoading(true);
        try {
            const storedFertilizations = await AsyncStorage.getItem('fertilizations');
            if (storedFertilizations) {
                const parsedFertilizations = JSON.parse(storedFertilizations);
                setFertilizations(parsedFertilizations.filter(fertilization => fertilization.cropId === cropId));
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching fertilizations:', err.message);
            setError('Failed to load fertilizations.');
        } finally {
            setLoading(false);
        }
    };

    const addFertilization = async (newFertilization) => {
        setLoading(true);
        try {
            const updatedFertilizations = [...fertilizations, newFertilization];
            setFertilizations(updatedFertilizations);
            await saveFertilizationsToStorage(updatedFertilizations);
            setError(null);
        } catch (err) {
            console.error('Error adding fertilization:', err.message);
            setError('Failed to add fertilization.');
        } finally {
            setLoading(false);
        }
    };

    const editFertilization = async (fertilizationId, updatedFertilization) => {
        setLoading(true);
        try {
            const updatedFertilizations = fertilizations.map(fertilization =>
                fertilization.id === fertilizationId ? { ...fertilization, ...updatedFertilization } : fertilization
            );
            setFertilizations(updatedFertilizations);
            await saveFertilizationsToStorage(updatedFertilizations);
            setError(null);
        } catch (err) {
            console.error('Error updating fertilization:', err.message);
            setError('Failed to update fertilization.');
        } finally {
            setLoading(false);
        }
    };

    const deleteFertilization = async (id) => {
        setLoading(true);
        try {
            const updatedFertilizations = fertilizations.filter(fertilization => fertilization.id !== id);
            setFertilizations(updatedFertilizations);
            await saveFertilizationsToStorage(updatedFertilizations);
            setError(null);
        } catch (err) {
            console.error('Error deleting fertilization:', err.message);
            setError('Failed to delete fertilization.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFertilizationsFromStorage();
    }, []);

    return (
        <FertilizationContext.Provider value={{
            fertilizations,
            loading,
            error,
            addFertilization,
            editFertilization,
            deleteFertilization,
            fetchFertilizations,
            fetchFertilizationById
        }}>
            {children}
        </FertilizationContext.Provider>
    );
};