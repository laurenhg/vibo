import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUser({ ...decoded, token }); // Assuming decoded JWT has user details
                    setStatus('done');
                } catch (error) {
                    console.error('Token decoding failed:', error);
                    localStorage.removeItem('token'); // Remove corrupt token
                }
            } else {
                setStatus('done');
            }
        };

        initializeAuth();
    }, []);

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('https://api.datavortex.nl/vibo/users', {
                username, email, password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'vibo:xz3hJ3IPuNIbPbg4lgce'
                }
            });

            if (response.status !== 201) {
                throw new Error('Registration failed');
            }

            const { token } = response.data;
            localStorage.setItem('token', token);
            setUser({ ...jwtDecode(token), token });
            navigate('/TrendingHome'); // Change this to navigate to the TrendingHome page after registration
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('https://api.datavortex.nl/vibo/users/authenticate', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'vibo:xz3hJ3IPuNIbPbg4lgce'
                }
            });

            console.log("API login response:", response.data);  // Log the API response

            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            const { jwt: token } = response.data;
            if (!token || typeof token !== 'string') {
                throw new Error("Invalid token received from API");
            }

            localStorage.setItem('token', token);
            setUser({ ...jwtDecode(token), token });
            navigate('/TrendingHome');  // Ensure this navigates to the TrendingHome page
        } catch (error) {
            console.error('Login error:', error);
            throw error;  // Rethrow to handle it in the form
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/'); // Redirect to the homepage on logout
    };

    const authContextValue = {
        user,
        isAuthenticated: !!user,
        status,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};