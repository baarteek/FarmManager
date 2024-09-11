import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const PlantProtectionContext = createContext();

export const usePlantProtectionContext = () => useContext(PlantProtectionContext);

export const PlantProtectionProvider = ({ children }) => {
    const { token } = useAuth();
    const [plantProtections, setPlantProtections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlantProtectionById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/PlantProtections/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error('Error fetching plant protection:', err.message);
            throw err;
        }
    };

    const fetchPlantProtections = async (cropId) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${API_BASE_URL}/PlantProtections/crops/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPlantProtections(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching plant protections:', err.message);
            setError('Failed to load plant protections. Please try again later');
        } finally {
            setLoading(false);
        }
    };

    const addPlantProtection = async (newPlantProtection) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/PlantProtections`, newPlantProtection, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPlantProtections(prevPlantProtections => [...prevPlantProtections, response.data]);
        } catch (err) {
            console.error('Error adding plant protection:', err.message);
            setError('Failed to add plant protection. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editPlantProtection = async (plantProtectionId, updatedPlantProtection) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${API_BASE_URL}/PlantProtections/${plantProtectionId}`, updatedPlantProtection, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setPlantProtections(prevPlantProtections =>
                prevPlantProtections.map(plantProtection => plantProtection.id === plantProtectionId ? { ...plantProtection, ...updatedPlantProtection } : plantProtection)
            );
            setError(null);
        } catch (err) {
            console.error('Error updating plant protection:', err.message);
            setError('Failed to update plant protection. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deletePlantProtection = async (id) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`${API_BASE_URL}/PlantProtections/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setPlantProtections(prevPlantProtections => prevPlantProtections.filter(plantProtection => plantProtection.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting plant protection:', err.message);
            setError('Failed to delete plant protection. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PlantProtectionContext.Provider value={{ plantProtections, loading, error, addPlantProtection, editPlantProtection, deletePlantProtection, fetchPlantProtections, fetchPlantProtectionById }}>
            {children}
        </PlantProtectionContext.Provider>
    );
};
