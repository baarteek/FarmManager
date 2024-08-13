import axios from "axios";
import { createContext, useContext, useState } from "react";
import API_BASE_URL from "../config/apiConfig";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/Auth/login`, {
                email,
                password
            });

            if(response.status === 200) {
                setToken(response.data.token);
                setIsAuthenticated(true);
                return true;
            } else {
                console.error('Login failed with status: ', response.status);
                return false;
            }
        } catch(error) {
            console.error('Login failed with error: ', error.response?.data || error.message);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    );
};