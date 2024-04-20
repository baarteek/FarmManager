import React, { createContext, useContext } from 'react';
import useLocation from '../hooks/useLocation';

const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
    const { location, errorMsg } = useLocation();

    return (
        <LocationContext.Provider value={{ location, errorMsg }}>
            {children}
        </LocationContext.Provider>
    );
};
