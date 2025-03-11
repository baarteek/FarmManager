import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CropContext = createContext();
export const useCropContext = () => useContext(CropContext);

export const CropProvider = ({ children }) => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCropsFromStorage = async () => {
        try {
            const storedCrops = await AsyncStorage.getItem('crops');
            if (storedCrops) {
                setCrops(JSON.parse(storedCrops));
            }
        } catch (err) {
            console.error('Error loading crops from storage:', err.message);
        }
    };

    const saveCropsToStorage = async (updatedCrops) => {
        try {
            await AsyncStorage.setItem('crops', JSON.stringify(updatedCrops));
        } catch (err) {
            console.error('Error saving crops to storage:', err.message);
        }
    };

    const fetchActiveCrops = async () => {
        setLoading(true);
        try {
            await loadCropsFromStorage();
            setError(null);
        } catch (err) {
            console.error('Error fetching crops:', err.message);
            setError('Failed to load crops.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCropById = async (cropId) => {
        setLoading(true);
        try {
            const storedCrops = await AsyncStorage.getItem('crops');
            if (storedCrops) {
                const parsedCrops = JSON.parse(storedCrops);
                const crop = parsedCrops.find(crop => crop.id === cropId);
                if (crop) {
                    setError(null);
                    return crop;
                }
            }
            throw new Error('Crop not found.');
        } catch (err) {
            console.error('Error fetching crop:', err.message);
            setError('Failed to load crop details.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addCrop = async (newCrop) => {
        setLoading(true);
        try {
            const updatedCrops = [...crops, newCrop];
            setCrops(updatedCrops);
            await saveCropsToStorage(updatedCrops);
            setError(null);
        } catch (err) {
            console.error('Error adding crop:', err.message);
            setError('Failed to add crop.');
        } finally {
            setLoading(false);
        }
    };

    const editCrop = async (cropId, updatedCrop) => {
        setLoading(true);
        try {
            const updatedCrops = crops.map(crop => (crop.id === cropId ? { ...crop, ...updatedCrop } : crop));
            setCrops(updatedCrops);
            await saveCropsToStorage(updatedCrops);
            setError(null);
        } catch (err) {
            console.error('Error updating crop:', err.message);
            setError('Failed to update crop.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCrop = async (id) => {
        setLoading(true);
        try {
            const updatedCrops = crops.filter(crop => crop.id !== id);
            setCrops(updatedCrops);
            await saveCropsToStorage(updatedCrops);
            setError(null);
        } catch (err) {
            console.error('Error deleting crop:', err.message);
            setError('Failed to delete crop.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCropsFromStorage();
    }, []);

    return (
        <CropContext.Provider value={{ crops, loading, error, addCrop, editCrop, handleDeleteCrop, fetchActiveCrops, fetchCropById }}>
            {children}
        </CropContext.Provider>
    );
};