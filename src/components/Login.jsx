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
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Log-in</legend>
                    <div>
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
                    <div>
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
                    <button type="submit" disabled={loading}> {loading ? "Logging in..." : "Login"}</button>
                </fieldset>
            </form>
        </div>

    );
}

export default LoginForm;