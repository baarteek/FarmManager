import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlotNumberContext = createContext();

export const usePlotNumberContext = () => useContext(PlotNumberContext);

export const PlotNumberProvider = ({ children }) => {
    const [plotNumbers, setPlotNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPlotNumbersFromStorage = async () => {
        try {
            const storedPlotNumbers = await AsyncStorage.getItem('plotNumbers');
            if (storedPlotNumbers) {
                setPlotNumbers(JSON.parse(storedPlotNumbers));
            }
        } catch (err) {
            console.error('Error loading plot numbers from storage:', err.message);
        }
    };

    const savePlotNumbersToStorage = async (updatedPlotNumbers) => {
        try {
            await AsyncStorage.setItem('plotNumbers', JSON.stringify(updatedPlotNumbers));
        } catch (err) {
            console.error('Error saving plot numbers to storage:', err.message);
        }
    };

    const fetchPlotNumberById = async (id) => {
        setLoading(true);
        try {
            const storedPlotNumbers = await AsyncStorage.getItem('plotNumbers');
            if (storedPlotNumbers) {
                const parsedPlotNumbers = JSON.parse(storedPlotNumbers);
                const plotNumber = parsedPlotNumbers.find(pn => pn.id === id);
                if (plotNumber) {
                    setError(null);
                    return plotNumber;
                }
            }
            throw new Error('Plot number not found.');
        } catch (err) {
            console.error('Error fetching plot number:', err.message);
            setError('Failed to load plot number.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchPlotNumbers = async (fieldId) => {
        setLoading(true);
        try {
            const storedPlotNumbers = await AsyncStorage.getItem('plotNumbers');
            if (storedPlotNumbers) {
                const parsedPlotNumbers = JSON.parse(storedPlotNumbers);
                setPlotNumbers(parsedPlotNumbers.filter(pn => pn.fieldId === fieldId));
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching plot numbers:', err.message);
            setError('Failed to load plot numbers.');
        } finally {
            setLoading(false);
        }
    };

    const addPlotNumber = async (newPlotNumber) => {
        setLoading(true);
        try {
            const updatedPlotNumbers = [...plotNumbers, newPlotNumber];
            setPlotNumbers(updatedPlotNumbers);
            await savePlotNumbersToStorage(updatedPlotNumbers);
            setError(null);
        } catch (err) {
            console.error('Error adding plot number:', err.message);
            setError('Failed to add plot number.');
        } finally {
            setLoading(false);
        }
    };

    const editPlotNumber = async (updatedPlotNumber) => {
        setLoading(true);
        try {
            const updatedPlotNumbers = plotNumbers.map(pn =>
                pn.id === updatedPlotNumber.id ? updatedPlotNumber : pn
            );
            setPlotNumbers(updatedPlotNumbers);
            await savePlotNumbersToStorage(updatedPlotNumbers);
            setError(null);
        } catch (err) {
            console.error('Error updating plot number:', err.message);
            setError('Failed to update plot number.');
        } finally {
            setLoading(false);
        }
    };

    const deletePlotNumber = async (id) => {
        setLoading(true);
        try {
            const updatedPlotNumbers = plotNumbers.filter(pn => pn.id !== id);
            setPlotNumbers(updatedPlotNumbers);
            await savePlotNumbersToStorage(updatedPlotNumbers);
            setError(null);
        } catch (err) {
            console.error('Error deleting plot number:', err.message);
            setError('Failed to delete plot number.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlotNumbersFromStorage();
    }, []);

    return (
        <PlotNumberContext.Provider value={{
            plotNumbers,
            loading,
            error,
            addPlotNumber,
            editPlotNumber,
            deletePlotNumber,
            fetchPlotNumbers,
            fetchPlotNumberById
        }}>
            {children}
        </PlotNumberContext.Provider>
    );
};