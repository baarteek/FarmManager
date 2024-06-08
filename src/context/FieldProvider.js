import React, { createContext, useState, useContext } from 'react';
import { initialData } from '../data/InitialData';

const FieldContext = createContext();

export const FieldProvider = ({ children }) => {
    const [fields, setFields] = useState(initialData);

    const addField = (newField) => {
        setFields((prevFields) => [...prevFields, newField]);
    };

    const handleDelete = (id) => {
        const updatedData = fields.filter(field => field.id !== id);
        setFields(updatedData);
    };

    const getNextId = () => {
        const maxId = fields.reduce((max, field) => (field.id > max ? field.id : max), fields[0].id);
        return maxId + 1;
    };

    return (
        <FieldContext.Provider value={{ fields, addField, handleDelete, getNextId }}>
            {children}
        </FieldContext.Provider>
    );
};

export const useFieldContext = () => {
    return useContext(FieldContext);
};
