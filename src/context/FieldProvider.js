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
        if (fields.length === 0) {
            return 1;
        }
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

    const addSoilMeasurementToField = (fieldId, newMeasurement) => {
        setFields((prevFields) => {
            return prevFields.map(field => {
                if (field.id === fieldId) {
                    return {
                        ...field,
                        soilMeasurements: [...field.soilMeasurements, newMeasurement],
                    };
                }
                return field;
            });
        });
    };

    const editSoilMeasurementInField = (fieldId, measurementIndex, updatedMeasurement) => {
        setFields((prevFields) => {
            return prevFields.map(field => {
                if (field.id === fieldId) {
                    const updatedMeasurements = [...field.soilMeasurements];
                    updatedMeasurements[measurementIndex] = updatedMeasurement;
                    return {
                        ...field,
                        soilMeasurements: updatedMeasurements,
                    };
                }
                return field;
            });
        });
    };

    const deleteSoilMeasurement = (fieldId, measurementIndex) => {
        setFields((prevFields) =>
            prevFields.map((field) => {
                if (field.id === fieldId) {
                    const updatedMeasurements = field.soilMeasurements.filter((_, index) => index !== measurementIndex);
                    return { ...field, soilMeasurements: updatedMeasurements };
                }
                return field;
            })
        );
    };

    const addFertilizationToCrop = (fieldId, cropId, newFertilization) => {
        setFields((prevFields) => 
            prevFields.map((field) => {
                if (field.id === fieldId) {
                    return {
                        ...field,
                        crops: field.crops.map((crop) => {
                            if (crop.id === cropId) {
                                return {
                                    ...crop,
                                    fertilizationHistory: [...crop.fertilizationHistory, newFertilization],
                                };
                            }
                            return crop;
                        }),
                    };
                }
                return field;
            })
        );
    };

    const editFertilizationInCrop = (fieldId, cropId, fertilizationIndex, updatedFertilization) => {
        setFields((prevFields) => 
            prevFields.map((field) => {
                if (field.id === fieldId) {
                    return {
                        ...field,
                        crops: field.crops.map((crop) => {
                            if (crop.id === cropId) {
                                const updatedFertilizations = [...crop.fertilizationHistory];
                                updatedFertilizations[fertilizationIndex] = updatedFertilization;
                                return {
                                    ...crop,
                                    fertilizationHistory: updatedFertilizations,
                                };
                            }
                            return crop;
                        }),
                    };
                }
                return field;
            })
        );
    };

    const deleteFertilizationFromCrop = (fieldId, cropId, fertilizationIndex) => {
        setFields((prevFields) => 
            prevFields.map((field) => {
                if (field.id === fieldId) {
                    return {
                        ...field,
                        crops: field.crops.map((crop) => {
                            if (crop.id === cropId) {
                                const updatedFertilizations = crop.fertilizationHistory.filter((_, index) => index !== fertilizationIndex);
                                return {
                                    ...crop,
                                    fertilizationHistory: updatedFertilizations,
                                };
                            }
                            return crop;
                        }),
                    };
                }
                return field;
            })
        );
    };

    return (
        <FieldContext.Provider value={{
            fields,
            addField,
            handleDelete,
            getNextId,
            editField,
            addCropToField,
            deleteCropFromField,
            editCropInField,
            addSoilMeasurementToField,
            editSoilMeasurementInField,
            deleteSoilMeasurement,
            addFertilizationToCrop,
            editFertilizationInCrop,
            deleteFertilizationFromCrop,
        }}>
            {children}
        </FieldContext.Provider>
    );
};

export const useFieldContext = () => {
    return useContext(FieldContext);
};
