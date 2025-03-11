import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ReportsContext = createContext();

export const useReportsContext = () => useContext(ReportsContext);

const ReportsProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadLastEntry = async (key) => {
        try {
            const storedData = await AsyncStorage.getItem(key);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                return parsedData.length > 0 ? parsedData[parsedData.length - 1] : null;
            }
            return null;
        } catch (err) {
            console.error(`Error loading ${key} from storage:`, err.message);
            return null;
        }
    };

    const fetchAgrotechnicalActivitiesReport = async () => {
        setLoading(true);
        try {
            const lastCultivationOperation = await loadLastEntry("operations");
            const lastFertilization = await loadLastEntry("fertilizations");
            const lastPlantProtection = await loadLastEntry("plantProtections");

            const reportData = {
                lastCultivationOperation,
                lastFertilization,
                lastPlantProtection
            };

            setError(null);
            return reportData;
        } catch (err) {
            console.error("Error fetching report data:", err.message);
            setError("Failed to load report.");
        } finally {
            setLoading(false);
        }
    };

    const generateReportHtml = (reportData) => {
        const { lastCultivationOperation, lastFertilization, lastPlantProtection } = reportData;

        return `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Agrotechnical Report</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid black; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Agrotechnical Activities Report</h1>
                <table>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                        <th>Area</th>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Comments</th>
                    </tr>
                    ${lastCultivationOperation ? `
                    <tr>
                        <td>${lastCultivationOperation.name}</td>
                        <td>${lastCultivationOperation.date}</td>
                        <td>${lastCultivationOperation.area}</td>
                        <td>Cultivation</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${lastCultivationOperation.description || "None"}</td>
                    </tr>` : ""}
                    
                    ${lastFertilization ? `
                    <tr>
                        <td>${lastFertilization.name}</td>
                        <td>${lastFertilization.date}</td>
                        <td>${lastFertilization.area}</td>
                        <td>Fertilization</td>
                        <td>${lastFertilization.nameOfProduct}</td>
                        <td>${lastFertilization.quantity} t/ha</td>
                        <td>${lastFertilization.description || "None"}</td>
                    </tr>` : ""}
                    
                    ${lastPlantProtection ? `
                    <tr>
                        <td>${lastPlantProtection.name}</td>
                        <td>${lastPlantProtection.date}</td>
                        <td>${lastPlantProtection.area}</td>
                        <td>Plant Protection</td>
                        <td>${lastPlantProtection.nameOfProduct}</td>
                        <td>${lastPlantProtection.quantity} l/ha</td>
                        <td>${lastPlantProtection.description || "None"}</td>
                    </tr>` : ""}
                </table>
            </body>
            </html>
        `;
    };

    const saveReportToFile = async (content, extension) => {
        try {
            const date = new Date();
            const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}_${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}`;
            const fileUri = FileSystem.documentDirectory + `report_${formattedDate}.${extension}`;
            
            await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                alert("Sharing is not available on this platform");
            }

            return fileUri;
        } catch (err) {
            console.error("Error saving report file:", err.message);
            setError("Failed to save report.");
        }
    };

    const downloadAgrotechnicalActivitiesReportHTML = async () => {
        setLoading(true);
        try {
            const reportData = await fetchAgrotechnicalActivitiesReport();
            const reportHtml = generateReportHtml(reportData);
            await saveReportToFile(reportHtml, "html");
        } catch (err) {
            console.error("Error generating HTML report:", err.message);
            setError("Failed to generate HTML report.");
        } finally {
            setLoading(false);
        }
    };

    const downloadAgrotechnicalActivitiesReportPDF = async () => {
        setLoading(true);
        try {
            const reportData = await fetchAgrotechnicalActivitiesReport();
            const reportHtml = generateReportHtml(reportData);
            const pdfUri = await saveReportToFile(reportHtml, "pdf");
            console.log("PDF Report saved at:", pdfUri);
        } catch (err) {
            console.error("Error generating PDF report:", err.message);
            setError("Failed to generate PDF report.");
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
            downloadAgrotechnicalActivitiesReportHTML, 
            downloadAgrotechnicalActivitiesReportPDF
        }}>
            {children}
        </ReportsContext.Provider>
    );
};

export default ReportsProvider;