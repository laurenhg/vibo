import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../LoginRegister/Register/RegistrationForm.css'
import bookshelf from '../../assets/bookshelf.png'

const RegistrationForm = () => {
    const navigate = useNavigate();
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
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
            if (response.status === 201 || response.status === 200) {
                navigate('/login');
                setSuccess(true);
            } else {
                setError(`Registration failed. Status code: ${response.status}`);
            }
        } catch (error) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div className="registration-form-container">
            <img src={bookshelf} alt="Register Banner" className="banner-image" />
            <h2>Register for a Vibo Account</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="registration-username">Username:</label>
                    <input type="text" id="registration-username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="registration-email">Email:</label>
                    <input type="email" id="registration-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-email">Confirm Email:</label>
                    <input type="email" id="confirm-email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="registration-password">Password:</label>
                    <input type="password" id="registration-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="button-common">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Registration successful!</p>}
        </div>
    );
};

export default RegistrationForm;