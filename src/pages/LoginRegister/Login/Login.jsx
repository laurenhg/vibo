import React, { useState } from 'react';
import { useAuth } from '../../../components/Authentication/AuthContext.jsx'
import './Login.css'

const LoginForm = () => {
    const [username, setUsername] = useState('');  // Using username for login
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();  // Destructure the login function from useAuth

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error state on new submission
        try {
            await login(username, password);  // Pass username instead of email
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);  // Displaying the error message
        }
    };

    return (
        <div className="login-section">
            <div className="rectangle">
                <div className="top-half">
                    <h1 className="Vibo"> Vibo </h1>
                    <p className="tagline"> Find and store books, your way </p>
                </div>
                <div className="bottom-half">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login-username">Username:</label>
                            <input type="text" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="login-password">Password:</label>
                            <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}
                                   className="login-input"
                            />
                        </div>
                        <button type="submit" className="login-submit">Login</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;