import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const FertilizationContext = createContext();

export const useFertilizationContext = () => useContext(FertilizationContext);

export const FertilizationProvider = ({ children }) => {
    const { token } = useAuth();
    const [fertilizations, setFertilizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFertilizationById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Fertilizations/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error('Error fetching fertilization:', err.message);
            throw err;
        }
    }

   const fetchFertilizations = async (cropId) => {
    setLoading(true);
    try {
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get(`${API_BASE_URL}/Fertilizations/crops/${cropId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setFertilizations(response.data);
        setError(null);
    } catch (err) {
        console.error('Error fetching fertilizations:', err.message);
        setError('Failed to load fertilizations. Please try again later');
    } finally {
        setLoading(false);
    }
};

    const addFertilization = async (newFertilization) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/Fertilizations`, newFertilization, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setFertilizations(prevFertilizations => [...prevFertilizations, response.data]);
        } catch (err) {
            console.error('Error adding fertilization:', err.message);
            setError('Failed to add fertilization. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editFertilization = async (fertilizationId, updatedFertilization) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${API_BASE_URL}/Fertilizations/${fertilizationId}`, updatedFertilization, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setFertilizations(prevFertilizations =>
                prevFertilizations.map(fertilization => fertilization.id === fertilizationId ? { ...fertilization, ...updatedFertilization } : fertilization)
            );
            setError(null);
        } catch (err) {
            console.error('Error updating fertilization:', err.message);
            setError('Failed to update fertilization. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteFertilization = async (id) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`${API_BASE_URL}/Fertilizations/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setFertilizations(prevFertilizations => prevFertilizations.filter(fertilization => fertilization.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting fertilization:', err.message);
            setError('Failed to delete fertilization. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FertilizationContext.Provider value={{ fertilizations, loading, error, addFertilization, editFertilization, deleteFertilization, fetchFertilizations, fetchFertilizationById }}>
            {children}
        </FertilizationContext.Provider>
    );
};