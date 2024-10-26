import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

const ReportsContext = createContext();

export const useReportsContext = () => useContext(ReportsContext);

const ReportsProvider = ({ children }) => {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAgrotechnicalActivitiesReport = async (farmId) => {
        setLoading(true);
        try {
            if(!token) {
                throw new Error("No token found");
            }

            const response = await axios.get(`${API_BASE_URL}//Report/html/${farmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching reports:', err.message);
            setError('Failed to load report. Pleas try again later');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ReportsContext.Provider value={{ data, loading, error, fetchAgrotechnicalActivitiesReport }} >
            {children}
        </ReportsContext.Provider>
    )
};

export default ReportsProvider;