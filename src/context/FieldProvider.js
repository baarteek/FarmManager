import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const FieldContext = createContext();

export const FieldProvider = ({ children }) => {
    const { token } = useAuth();
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFields = async (farmId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/Fields/farm/${farmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFields(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching fields:', err.message);
            setError('Failed to load fields. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FieldContext.Provider value={{
            fields, fetchFields, loading, error
        }}>
            {children}
        </FieldContext.Provider>
    );
};

export const useFieldContext = () => {
    return useContext(FieldContext);
};