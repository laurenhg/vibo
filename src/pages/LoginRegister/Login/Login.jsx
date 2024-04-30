import React, { useState } from 'react';
import { useAuth } from '../../../components/Authentication/AuthContext.jsx';
import styles from './Login.module.css';

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
        <div className={styles.loginSection}>
            <div className={styles.rectangle}>
                <div className={styles.topHalf}>
                    <h1 className={styles.vibo}> Vibo </h1>
                    <p className={styles.tagline}> Find and store books, your way </p>
                </div>
                <div className={styles.bottomHalf}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login-username">Username:</label>
                            <input type="text" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.loginInput} />
                        </div>
                        <div>
                            <label htmlFor="login-password">Password:</label>
                            <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.loginInput} />
                        </div>
                        <button type="submit" className={styles.loginSubmit}>Login</button>
                    </form>
                </div>
            </div>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default LoginForm;