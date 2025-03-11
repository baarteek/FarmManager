import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CultivationOperationContext = createContext();

export const useCultivationOperationContext = () => useContext(CultivationOperationContext);

export const CultivationOperationProvider = ({ children }) => {
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOperationsFromStorage = async () => {
        try {
            const storedOperations = await AsyncStorage.getItem("operations");
            if (storedOperations) {
                setOperations(JSON.parse(storedOperations));
            }
        } catch (err) {
            console.error("Error loading operations from storage:", err.message);
        }
    };

    const saveOperationsToStorage = async (updatedOperations) => {
        try {
            await AsyncStorage.setItem("operations", JSON.stringify(updatedOperations));
        } catch (err) {
            console.error("Error saving operations to storage:", err.message);
        }
    };

    const fetchCultivationOperationById = async (id) => {
        setLoading(true);
        try {
            const storedOperations = await AsyncStorage.getItem("operations");
            if (storedOperations) {
                const parsedOperations = JSON.parse(storedOperations);
                const operation = parsedOperations.find(operation => operation.id === id);
                if (operation) {
                    setError(null);
                    return operation;
                }
            }
            throw new Error("Operation not found.");
        } catch (err) {
            console.error("Error fetching cultivation operation:", err.message);
            setError("Failed to load cultivation operation.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchCultivationOperationsByCropId = async (cropId) => {
        setLoading(true);
        try {
            const storedOperations = await AsyncStorage.getItem("operations");
            if (storedOperations) {
                const parsedOperations = JSON.parse(storedOperations);
                setOperations(parsedOperations.filter(operation => operation.cropId === cropId));
            }
            setError(null);
        } catch (err) {
            console.error("Error fetching cultivation operations:", err.message);
            setError("Failed to load cultivation operations.");
        } finally {
            setLoading(false);
        }
    };

    const addCultivationOperation = async (newOperation) => {
        setLoading(true);
        try {
            const updatedOperations = [...operations, newOperation];
            setOperations(updatedOperations);
            await saveOperationsToStorage(updatedOperations);
            setError(null);
        } catch (err) {
            console.error("Error adding cultivation operation:", err.message);
            setError("Failed to add cultivation operation.");
        } finally {
            setLoading(false);
        }
    };

    const editCultivationOperation = async (operationId, updatedOperation) => {
        setLoading(true);
        try {
            const updatedOperations = operations.map(operation =>
                operation.id === operationId ? { ...operation, ...updatedOperation } : operation
            );
            setOperations(updatedOperations);
            await saveOperationsToStorage(updatedOperations);
            setError(null);
        } catch (err) {
            console.error("Error updating cultivation operation:", err.message);
            setError("Failed to update cultivation operation.");
        } finally {
            setLoading(false);
        }
    };

    const deleteCultivationOperation = async (id) => {
        setLoading(true);
        try {
            const updatedOperations = operations.filter(operation => operation.id !== id);
            setOperations(updatedOperations);
            await saveOperationsToStorage(updatedOperations);
            setError(null);
        } catch (err) {
            console.error("Error deleting cultivation operation:", err.message);
            setError("Failed to delete cultivation operation.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOperationsFromStorage();
    }, []);

    return (
        <CultivationOperationContext.Provider value={{
            operations,
            loading,
            error,
            fetchCultivationOperationById,
            fetchCultivationOperationsByCropId,
            addCultivationOperation,
            editCultivationOperation,
            deleteCultivationOperation
        }}>
            {children}
        </CultivationOperationContext.Provider>
    );
};