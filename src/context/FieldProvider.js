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

    const addField = async (newField) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/Fields`, newField, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const addedField = {
                ...response.data,
                referenceParcels: response.data.referenceParcels || [], 
                soilMeasurements: response.data.soilMeasurements || [], 
                crops: response.data.crops || []
            };

            setFields(prevFields => [...prevFields, addedField]);
            setError(null);
        } catch(err) {
            console.error('Error adding field:', err.message);
            setError('Failed to add the field. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fieldId) => {
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/Fields/${fieldId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setFields(prevFields => prevFields.filter(field => field.id !== fieldId));
            setError(null);
        } catch (err) {
            console.error('Error deleting field:', err.message);
            setError('Failed to delete the field. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FieldContext.Provider value={{
            fields, loading, error, fetchFields, addField, handleDelete
        }}>
            {children}
        </FieldContext.Provider>
    );
};

export const useFieldContext = () => {
    return useContext(FieldContext);
};