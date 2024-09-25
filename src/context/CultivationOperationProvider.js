import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import API_BASE_URL from "../config/apiConfig";
import axios from "axios";

const CultivationOperationContext = createContext();

export const useCultivationOperationContext = () => useContext(CultivationOperationContext);

export const CultivationOperationProvider = ({ children }) => {
    const { token } = useAuth();
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCultivationOperationById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/CultivationOperation/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error('Error fetching cultivation operation:', err.message);
            setError(err);
            throw err;
        }
    }

    const fetchCultivationOperationsByCropId = async (cropId) => {
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${API_URL_BASE}/CultivationOperation/crop/${cropId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOperations(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching cutlivation operation:', err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addCultivationOperation = async (newOperation) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${API_BASE_URL}/CultivationOperation`, newOperation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setOperations(prevOperation => [...prevOperation, response.data]);
            setError(null);
        } catch (err) {
            console.error('Error adding plant protection:', err.message);
            setError('Failed to add cultivation operation. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const editCultivationOperation = async (operationId, updatedOperation) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${API_BASE_URL}/CultivationOperation/${operationId}`, updatedOperation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setOperations(prevOperation =>
                prevOperation.map(operation => operation.id === operationId ? { ...operation, ...updatedOperation } : operation)
            );
            setError(null);
        } catch (err) {
            console.error('Error updating plant protection:', err.message);
            setError('Failed to update plant protection. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteCultivationOperation = async (id) => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            await axios.delete(`${API_BASE_URL}/CultivationOperation/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setOperations(prevOperation => prevOperation.filter(operation => operation.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting plant protection:', err.message);
            setError('Failed to delete plant protection. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CultivationOperationContext.Provider value={{ operations, loading, error, fetchCultivationOperationById, fetchCultivationOperationsByCropId, addCultivationOperation, editCultivationOperation, deleteCultivationOperation  }} >
            {children}
        </CultivationOperationContext.Provider>
    );
};