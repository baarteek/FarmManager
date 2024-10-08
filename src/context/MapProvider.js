import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
    const { token } = useAuth();
    const [mapData, setMapData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMapDataByUser = async () => {
        setLoading(true);
        try {
            if(!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${API_BASE_URL}/MapData/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMapData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching map data:', err.message);
            setError('Failed to load map data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    const fetchMapDataByFarmId = async (farmId) => {
        setLoading(true);
        try {
            if(!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${API_BASE_URL}/MapData/${farmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMapData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching map data:', err.message);
            setError('Failed to load map data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
            <MapContext.Provider value={{ mapData, loading, error, fetchMapDataByUser, fetchMapDataByFarmId }}>
                {children}
            </MapContext.Provider>
        );
};