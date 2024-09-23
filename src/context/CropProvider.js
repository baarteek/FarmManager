import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const CropContext = createContext();

export const useCropContext = () => useContext(CropContext);

export const CropProvider = ({ children }) => {
    const { token } = useAuth();
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActiveCrops = async () => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await axios.get(`${API_BASE_URL}/Crops/user/active`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCrops(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching crops:', err.message);
            setError('Failed to load crops. Please try again later');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchActiveCrops();
    }, [token]);

    const fetchCropById = async (cropId) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${API_BASE_URL}/Crops/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setError(null);
            setCrops(response.data);
            return response.data;
        } catch (err) {
            console.error('Error fetching crop:', err.message);
            setError('Failed to load crop details. Please try again later.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addCrop = async (newCrop) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/Crops`, newCrop, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setCrops(prevCrops => [...prevCrops, response.data]);
        } catch (err) {
            console.error('Error adding crop:', err.message);
            setError('Failed to add crop. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editCrop = async (cropId, updatedCrop) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${API_BASE_URL}/Crops/${cropId}`, updatedCrop, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setCrops(prevCrops =>
                prevCrops.map(crop => crop.id === cropId ? { ...crop, ...updatedCrop } : crop)
            );
            setError(null);
        } catch (err) {
            console.error('Error updating crop:', err.message);
            setError('Failed to update crop. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCrop = async (id) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`${API_BASE_URL}/Crops/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setCrops(prevCrops => prevCrops.filter(crop => crop.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting crop:', err.message);
            setError('Failed to delete crop. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CropContext.Provider value={{ crops, loading, error, addCrop, editCrop, handleDeleteCrop, fetchActiveCrops, fetchCropById }}>
            {children}
        </CropContext.Provider>
    );
};
