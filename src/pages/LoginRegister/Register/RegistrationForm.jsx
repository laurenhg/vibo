import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css'
import bookshelf from '../../../assets/bookshelf.png'


const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username.trim()) formErrors.username = 'Username is required';
        if (!formData.email.trim()) formErrors.email = 'Email is required';
        if (!formData.confirmEmail.trim()) formErrors.confirmEmail = 'Confirm email is required';
        if (formData.email !== formData.confirmEmail) formErrors.confirmEmail = 'Email addresses do not match';
        if (!formData.password) formErrors.password = 'Password is required';
        if (!formData.confirmPassword) formErrors.confirmPassword = 'Confirm password is required';
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('https://api.datavortex.nl/vibo/users', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'vibo:xz3hJ3IPuNIbPbg4lgce'
                }
            });
            if (response.status === 201 || response.status === 200) {
                navigate('/login');
            } else {
                setErrors({ form: `Registration failed. Status code: ${response.status}` });
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrors({ form: 'An account with this username already exists' });
            } else {
                setErrors({ form: 'Failed to register. Please try again.' });
            }
        }
    };

    return (
        <div className="registration-form-container">
            <h1> ViBo </h1>
            <img src={bookshelf} alt="Register Banner" className="banner-image"/>
            <h2>Register for a Vibo Account</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="registration-username">Username:</label>
                    <input type="text" id="registration-username" name="username" value={formData.username}
                           onChange={handleChange} placeholder="please enter a username"/>
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="registration-email">Email:</label>
                    <input type="email" id="registration-email" name="email" value={formData.email}
                           onChange={handleChange} placeholder="please enter a valid email address"/>
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-email">Confirm Email:</label>
                    <input type="email" id="confirm-email" name="confirmEmail" value={formData.confirmEmail}
                           onChange={handleChange} placeholder="re-enter email address"/>
                    {errors.confirmEmail && <p className="error-message">{errors.confirmEmail}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="registration-password">Password:</label>
                    <input type="password" id="registration-password" name="password" value={formData.password}
                           onChange={handleChange} placeholder="enter a password of at least 8 characters"/>
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword}
                           onChange={handleChange} placeholder="re-enter your password"/>
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="button-common">Register</button>
                {errors.form && <p className="error-message">{errors.form}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;