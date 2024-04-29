import React, { useState } from 'react';
import { useAuth } from '../../../components/Authentication/AuthContext.jsx'
import './Login.css'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.status === 401) {
                setError("Incorrect username or password.");
            } else if (error.response && error.response.status === 400) {
                setError("Invalid username or password. Please check your credentials and try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
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
                </div>
            </div>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;