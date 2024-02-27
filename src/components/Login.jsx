import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


function LoginForm({onLogin}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isLoginSuccessful = true;
        if (isLoginSuccessful) {
            navigate('/TrendingHome');
        } else {

        }

       setError ('');
       setLoading (true);

       if (!validateEmail(email)){
           setError('Please enter a valid email address');
           setLoading(false);
           return;
       }

       try {
           await onLogin(email, password);

       } catch (error) {
           setError('Oops! Looks like login failed. Please check your email and password')
       } finally {
           setLoading(false);
       }
    };


    return (
        <>
        <div>
            <h1 className="logo"> ViBo </h1>
            <p className="byline">Discover and Organize Books: Your Way</p>
            <form onSubmit={handleSubmit}>
                <div className="login-section">
                    <h2>Log-in</h2>
                    <label htmlFor="loginEmail">Email:</label>
                    <input
                        type="email"
                        id="loginEmail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email"
                        autoComplete="email"
                    />
                </div>
                <div className="login-section">
                    <label htmlFor="loginPassword">Password:</label>
                    <input
                        type="password"
                        id="loginPassword"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button className="login-section" type="submit" disabled={loading}> {loading ? "Logging in..." : "Login"}</button>

            </form>
        </div>
        </>
    );
}

export default LoginForm;