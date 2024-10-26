import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ReportsContext = createContext();

export const useReportsContext = () => useContext(ReportsContext);

const ReportsProvider = ({ children }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAgrotechnicalActivitiesReport = async (farmId) => {
        setLoading(true);
        try {
            if(!token) {
                throw new Error("No token found");
            }

            const response = await axios.get(`${API_BASE_URL}/Report/html/${farmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setError(null);
            return response.data;
        } catch (err) {
            console.error('Error fetching reports:', err.message);
            setError('Failed to load report. Please try again later');
        } finally {
            setLoading(false);
        }
    };

    const downloadAgrotechnicalActivitiesReportXLS = async (farmId) => {
        setLoading(true);
        try {
            const downloadUrl = `${API_BASE_URL}/Report/excel/${farmId}`;
            const date = new Date();
            const formattedDate = 
                date.getFullYear().toString() +
                String(date.getMonth() + 1).padStart(2, '0') +
                String(date.getDate()).padStart(2, '0') + "_" +
                String(date.getHours()).padStart(2, '0') +
                String(date.getMinutes()).padStart(2, '0');
            const fileUri = FileSystem.documentDirectory + `report_${formattedDate}.xls`;
            const downloadResumable = FileSystem.createDownloadResumable(
                downloadUrl,
                fileUri,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            setError(null);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                alert('Sharing is not available on this platform');
            }
        } catch (err) {
            console.error('Error fetching reports:', err.message);
            setError('Failed to load report. Please try again later');
        } finally {
            setLoading(false);
        }
    };

    const downloadAgrotechnicalActivitiesReportPDF = async (farmId) => {
        setLoading(true);
        try {
            const downloadUrl = `${API_BASE_URL}/Report/pdf/${farmId}`;
            const date = new Date();
            const formattedDate = 
                date.getFullYear().toString() +
                String(date.getMonth() + 1).padStart(2, '0') +
                String(date.getDate()).padStart(2, '0') + "_" +
                String(date.getHours()).padStart(2, '0') +
                String(date.getMinutes()).padStart(2, '0');
            const fileUri = FileSystem.documentDirectory + `report_${formattedDate}.pdf`;
            const downloadResumable = FileSystem.createDownloadResumable(
                downloadUrl,
                fileUri,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/pdf',
                    },
                }
            );
    
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            setError(null);
    
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                alert('Sharing is not available on this platform');
            }
        } catch (err) {
            console.error('Error fetching reports:', err.message);
            setError('Failed to load report. Please try again later');
        } finally {
            setLoading(false);
        }
    };    

    return (
        <ReportsContext.Provider value={{ 
            loading, 
            error, 
            setError, 
            fetchAgrotechnicalActivitiesReport, 
            downloadAgrotechnicalActivitiesReportXLS, 
            downloadAgrotechnicalActivitiesReportPDF 
        }}>
            {children}
        </ReportsContext.Provider>
    )
};

export default ReportsProvider;
