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

    const editField = (id, updatedField) => {
        const updatedData = fields.map(field => 
            field.id === id ? { ...field, ...updatedField } : field
        );
        setFields(updatedData);
    };

    const addCropToField = (fieldId, newCrop) => {
        const updatedData = fields.map(field => {
            if (field.id === fieldId) {
                return {
                    ...field,
                    crops: [...field.crops, newCrop],
                };
            }
            return field;
        });
        setFields(updatedData);
    };

    const deleteCropFromField = (fieldId, cropId) => {
        const updatedData = fields.map(field => {
            if (field.id === fieldId) {
                return {
                    ...field,
                    crops: field.crops.filter(crop => crop.id !== cropId),
                };
            }
            return field;
        });
        setFields(updatedData);
    };

    const editCropInField = (fieldId, updatedCrop) => {
        const updatedData = fields.map(field => {
            if (field.id === fieldId) {
                return {
                    ...field,
                    crops: field.crops.map(crop => crop.id === updatedCrop.id ? updatedCrop : crop)
                };
            }
            return field;
        });
        setFields(updatedData);
    };

    return (
        <FieldContext.Provider value={{ fields, addField, handleDelete, getNextId, editField, addCropToField, deleteCropFromField, editCropInField }}>
            {children}
        </FieldContext.Provider>
    );
};

export const useFieldContext = () => {
    return useContext(FieldContext);
};
