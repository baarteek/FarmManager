import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePageInfoContext = createContext();

export const useHomePageInfoContext = () => useContext(HomePageInfoContext);

export const HomePageInfoProvider = ({ children }) => {
    const [homePageInfo, setHomePageInfo] = useState(null);
    const [loading, setLoading] = useState(true);
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

    const fetchHomePageInfo = async () => {
        setLoading(true);
        try {
            const lastCultivationOperation = await loadLastEntry('operations');
            const lastFertilization = await loadLastEntry('fertilizations');
            const lastPlantProtection = await loadLastEntry('plantProtections');

            setHomePageInfo({
                lastCultivationOperation,
                lastFertilization,
                lastPlantProtection
            });

            setError(null);
        } catch (err) {
            console.error('Error fetching homepage info:', err.message);
            setError('Failed to load homepage data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomePageInfo();
    }, []);

    return (
        <HomePageInfoContext.Provider value={{ homePageInfo, loading, error, fetchHomePageInfo }}>
            {children}
        </HomePageInfoContext.Provider>
    );
};