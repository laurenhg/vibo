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
            const token = localStorage.getItem('token');  // Ensure this line is not inside a block where 'token' isn't accessible
            console.log("Token from storage:", token); // This should directly follow the declaration above

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    console.log("Decoded token data:", decoded); // Log the decoded token data
                    setUser(decoded); // Store only the decoded data in the Context
                    setStatus('done');
                } catch (error) {
                    console.error('Token decoding failed:', error);
                    localStorage.removeItem('token'); // Remove corrupt token
                    setStatus('done');
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

            console.log("login response:", response.data);

            if (response.status !== 201) {
                throw new Error('Registration failed');
            }

            const { token } = response.data;
            console.log("JWT token recieved:", token);
            localStorage.setItem('token', token);
            setUser(jwtDecode(token)); // Update context with user info from the decoded token
            console.log("Decoded user data on login:", decodedUser);
            navigate('/TrendingHome');
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

            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            const { jwt: token } = response.data;
            localStorage.setItem('token', token);
            setUser(jwtDecode(token)); // Update context with user info from the decoded token
            navigate('/TrendingHome');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
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