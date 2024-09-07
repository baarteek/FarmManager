import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const FieldContext = createContext();

export const FieldProvider = ({ children }) => {
    const { token } = useAuth();
    const [fields, setFields] = useState([]);
    const [fieldList, setFieldList] = useState([]);
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

    const fetchFieldsNamesAndId = async (farmId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/Fields/farm/list/${farmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFieldList(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching field names and ids:', err.message);
            setError('Failed to load field names and ids. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchFieldById = async (fieldId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/Fields/${fieldId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setError(null);
            return response.data;
        } catch (err) {
            console.error('Error fetching field by ID:', err.message);
            setError('Failed to load field details. Please try again later.');
            throw err;
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

    const editField = async (fieldId, updatedField) => {
        setLoading(true);
        try {
            const response = await axios.put(`${API_BASE_URL}/Fields/${fieldId}`, updatedField, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const editedField = {
                ...response.data,
                referenceParcels: response.data.referenceParcels || [],
                soilMeasurements: response.data.soilMeasurements || [],
                crops: response.data.crops || []
            };

            setFields(prevFields => prevFields.map(field => 
                field.id === fieldId ? editedField : field
            ));
            setError(null);
        } catch (err) {
            console.error('Error editing field:', err.message);
            setError('Failed to edit the field. Please try again later.');
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
            fields, fieldList, loading, error, fetchFields, fetchFieldsNamesAndId, fetchFieldById, addField, handleDelete, editField
        }}>
            {children}
        </FieldContext.Provider>
    );
};

export const useFieldContext = () => {
    return useContext(FieldContext);
};
