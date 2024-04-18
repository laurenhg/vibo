import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import {AuthContext} from "../LoginRegister/LoginRegisterContext/AuthContext.jsx";


const ProfileSettings = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        username: user.username || '', // Initialize with the current username if available
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const updatePassword = async () => {
        if (userData.newPassword !== userData.confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        try {
            await axios.put(`https://api.datavortex.nl/vibo/users/${userData.username}`, {
                password: userData.newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                    'X-Api-Key': 'vibo:xz3hJ3IPuNIbPbg4lgce'
                }
            });

            alert('Password updated successfully!');
            navigate('/TrendingHome'); // Redirect after successful update
        } catch (error) {
            console.error('Failed to update password:', error);
            alert('Failed to update password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Profile Settings</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Current Password:</label>
                <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={userData.currentPassword}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={userData.newPassword}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={updatePassword}>Update Password</button>
        </div>
    );
};

export default ProfileSettings;