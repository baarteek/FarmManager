import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const SoilMeasurementContext = createContext();

export const useSoilMeasurementContext = () => useContext(SoilMeasurementContext);

export const SoilMeasurementProvider = ({ children }) => {
    const { token } = useAuth();
    const [soilMeasurements, setSoilMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSoilMeasurementById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/SoilMeasurements/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error('Error fetching soil measurement:', err.message);
            throw err;
        }
    };

    const fetchSoilMeasurements = async (fieldId) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await axios.get(`${API_BASE_URL}/SoilMeasurements/field/${fieldId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSoilMeasurements(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching soil measurements:', err.message);
            setError('Failed to load soil measurements. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const addSoilMeasurement = async (newMeasurement) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/SoilMeasurements`, newMeasurement, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSoilMeasurements(prevMeasurements => [...prevMeasurements, response.data]);
        } catch (err) {
            console.error('Error adding soil measurement:', err.message);
            setError('Failed to add soil measurement. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editSoilMeasurement = async (updatedMeasurement) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${API_BASE_URL}/SoilMeasurements/${updatedMeasurement.id}`, updatedMeasurement, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSoilMeasurements(prevMeasurements =>
                prevMeasurements.map(measurement => measurement.id === updatedMeasurement.id ? updatedMeasurement : measurement)
            );
            setError(null);
        } catch (err) {
            console.error('Error updating soil measurement:', err.message);
            setError('Failed to update soil measurement. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSoilMeasurement = async (id) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`${API_BASE_URL}/SoilMeasurements/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setSoilMeasurements(prevMeasurements => prevMeasurements.filter(measurement => measurement.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting soil measurement:', err.message);
            setError('Failed to delete soil measurement. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SoilMeasurementContext.Provider value={{
            soilMeasurements, loading, error, addSoilMeasurement, editSoilMeasurement, handleDeleteSoilMeasurement, fetchSoilMeasurements, fetchSoilMeasurementById
        }}>
            {children}
        </SoilMeasurementContext.Provider>
    );
};
