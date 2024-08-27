import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const PlotNumberContext = createContext();

export const usePlotNumberContext = () => useContext(PlotNumberContext);

export const PlotNumberProvider = ({ children }) => {
    const { token } = useAuth();
    const [plotNumbers, setPlotNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlotNumberById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ReferenceParcels/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error('Error fetching plot number:', err.message);
            throw err;
        }
    };

    const fetchPlotNumbers = async (fieldId) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await axios.get(`${API_BASE_URL}/ReferenceParcels/field/${fieldId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPlotNumbers(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching plot numbers:', err.message);
            setError('Failed to load plot numbers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const addPlotNumber = async (newPlotNumber) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/ReferenceParcels`, newPlotNumber, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPlotNumbers(prevPlotNumbers => [...prevPlotNumbers, response.data]);
        } catch (err) {
            console.error('Error adding plot number:', err.message);
            setError('Failed to add plot number. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editPlotNumber = async (updatedPlotNumber) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${API_BASE_URL}/ReferenceParcels/${updatedPlotNumber.id}`, updatedPlotNumber, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setPlotNumbers(prevPlotNumbers =>
                prevPlotNumbers.map(plotNumber => plotNumber.id === updatedPlotNumber.id ? updatedPlotNumber : plotNumber)
            );
            setError(null);
        } catch (err) {
            console.error('Error updating plot number:', err.message);
            setError('Failed to update plot number. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deletePlotNumber = async (id) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`${API_BASE_URL}/ReferenceParcels/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setPlotNumbers(prevPlotNumbers => prevPlotNumbers.filter(plotNumber => plotNumber.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting plot number:', err.message);
            setError('Failed to delete plot number. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PlotNumberContext.Provider value={{
            plotNumbers, loading, error, addPlotNumber, editPlotNumber, deletePlotNumber, fetchPlotNumbers, fetchPlotNumberById
        }}>
            {children}
        </PlotNumberContext.Provider>
    );
};
