import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate(); // Correctly placed useNavigate inside the component
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== confirmEmail) {
            setError('Email addresses do not match');
            setSuccess(false);
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setSuccess(false);
            return;
        }
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/vibo/users',
                { username, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'vibo:xz3hJ3IPuNIbPbg4lgce'
                    }
                }
            );
            if (response.status === 201 || response.status === 200) {  // Assuming 200 might also be a success status
                navigate('/login');  // Make sure this route is correctly configured in your router
                setSuccess(true);
                setError(null);
            } else {
                setError(`Registration failed. Unexpected status code: ${response.status}`);
                setSuccess(false);
            }
        } catch (error) {
            console.log("Full error response:", error.response);
            const errorMsg = error.response?.data?.message || 'An unknown error occurred';
            setError(`${errorMsg} (Status code: ${error.response?.status})`);
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="registration-username">Username:</label>
                    <input type="text" id="registration-username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="registration-email">Email:</label>
                    <input type="email" id="registration-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="confirm-email">Confirm Email:</label>
                    <input type="email" id="confirm-email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="registration-password">Password:</label>
                    <input type="password" id="registration-password" placeholder="Choose a password of at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Registration successful! Redirecting...</p>}
        </div>
    );
};

export default RegistrationForm;