import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (username, email, password) => {
        try {
            const response = await fetch('https://novi.datavortex.nl/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    info: '', // Add any additional info here
                    authorities: [{ authority: 'USER' }],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // Update user state with new user data
                console.log('User created successfully');
            }
        } catch (error) {
            console.error('Failed to create user', error);
        }
    };

    const value = {
        user,
        register,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthContext;