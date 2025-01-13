import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/apiConfig';

const HomePageInfoContext = createContext();

export const useHomePageInfoContext = () => useContext(HomePageInfoContext);

export const HomePageInfoProvider = ({ children }) => {
    const { token } = useAuth();
    const [homePageInfo, setHomePageInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHomePageInfo = async () => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${API_BASE_URL}/Home/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setHomePageInfo(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching homepage info:', err.message);
            setError('Failed to load homepage data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomePageInfo();
    }, [token]);

    return (
        <HomePageInfoContext.Provider value={{ homePageInfo, loading, error, fetchHomePageInfo }}>
            {children}
        </HomePageInfoContext.Provider>
    );
};