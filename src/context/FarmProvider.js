import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const FarmContext = createContext();

export const useFarmContext = () => useContext(FarmContext);

export const FarmProvider = ({ children }) => {
    const { token } = useAuth();
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFarms = async () => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await axios.get(`${API_BASE_URL}/Farms/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFarms(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching farms:', err.message);
            setError('Failed to load farms. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFarms();
    }, [token]);

    const addFarm = async (newFarm) => {
        setLoading(true);
        try {
            if(!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/Farms`, newFarm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setFarms(prevFarms => [...prevFarms, response.data]);
        } catch(err) {
            console.error('Error adding farm:', err.message);
            setError('Failed to add farm. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editFarm = (updatedFarm) => {
        setFarms(prevFarms =>
            prevFarms.map(farm => farm.id === updatedFarm.id ? updatedFarm : farm)
        );
    };

    const handleDeleteFarm = (id) => {
        setFarms(prevFarms => prevFarms.filter(farm => farm.id !== id));
    };

    return (
        <FarmContext.Provider value={{ farms, loading, error, addFarm, editFarm, handleDeleteFarm }}>
            {children}
        </FarmContext.Provider>
    );
};