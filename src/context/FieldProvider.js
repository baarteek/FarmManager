import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FieldContext = createContext();

export const FieldProvider = ({ children }) => {
    const [fields, setFields] = useState([]);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFieldsFromStorage = async () => {
        try {
            const storedFields = await AsyncStorage.getItem('fields');
            if (storedFields) {
                setFields(JSON.parse(storedFields));
            }
        } catch (err) {
            console.error('Error loading fields from storage:', err.message);
        }
    };

    const saveFieldsToStorage = async (updatedFields) => {
        try {
            await AsyncStorage.setItem('fields', JSON.stringify(updatedFields));
        } catch (err) {
            console.error('Error saving fields to storage:', err.message);
        }
    };

    const fetchFields = async () => {
        setLoading(true);
        try {
            await loadFieldsFromStorage();
            setError(null);
        } catch (err) {
            console.error('Error fetching fields:', err.message);
            setError('Failed to load fields.');
        } finally {
            setLoading(false);
        }
    };

    const fetchFieldsNamesAndId = async () => {
        setLoading(true);
        try {
            const storedFields = await AsyncStorage.getItem('fields');
            if (storedFields) {
                const parsedFields = JSON.parse(storedFields);
                setFieldList(parsedFields.map(field => ({ id: field.id, name: field.name })));
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching field names and ids:', err.message);
            setError('Failed to load field names and ids.');
        } finally {
            setLoading(false);
        }
    };

    const fetchFieldById = async (fieldId) => {
        setLoading(true);
        try {
            const storedFields = await AsyncStorage.getItem('fields');
            if (storedFields) {
                const parsedFields = JSON.parse(storedFields);
                const field = parsedFields.find(field => field.id === fieldId);
                if (field) {
                    setError(null);
                    return field;
                }
            }
            throw new Error('Field not found.');
        } catch (err) {
            console.error('Error fetching field by ID:', err.message);
            setError('Failed to load field details.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addField = async (newField) => {
        setLoading(true);
        try {
            const updatedFields = [...fields, newField];
            setFields(updatedFields);
            await saveFieldsToStorage(updatedFields);
            setError(null);
        } catch (err) {
            console.error('Error adding field:', err.message);
            setError('Failed to add the field.');
        } finally {
            setLoading(false);
        }
    };

    const editField = async (fieldId, updatedField) => {
        setLoading(true);
        try {
            const updatedFields = fields.map(field => (field.id === fieldId ? updatedField : field));
            setFields(updatedFields);
            await saveFieldsToStorage(updatedFields);
            setError(null);
        } catch (err) {
            console.error('Error editing field:', err.message);
            setError('Failed to edit the field.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fieldId) => {
        setLoading(true);
        try {
            const updatedFields = fields.filter(field => field.id !== fieldId);
            setFields(updatedFields);
            await saveFieldsToStorage(updatedFields);
            setError(null);
        } catch (err) {
            console.error('Error deleting field:', err.message);
            setError('Failed to delete the field.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFieldsFromStorage();
    }, []);

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