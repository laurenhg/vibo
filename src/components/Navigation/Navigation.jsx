import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../Authentication/AuthContext.jsx";
import './Navigation.css';
import logoImage from '../../../../untitled/src/assets/ViBo.png';
import gearIcon from '../../../src/assets/gear.png';

function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSettings = () => {
        navigate('/profile');
    };

    return (
        <nav className="navigation">
            <div className="navigation-left">
                <img src={logoImage} alt="logo" className="logo"/>
            </div>
            <div className="navigation-links">
                <NavLink to="/TrendingHome" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Home</NavLink>
                <NavLink to="/Search" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Search</NavLink>
                <NavLink to="/MyBookshelf" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>My Bookshelf</NavLink>
                <NavLink to="/AuthorPortal" className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Author Portal</NavLink>
            </div>
            <div className="navigation-right">
                {user && <span className="welcome-message">Welcome, {user.sub}!</span>}
                <button onClick={handleSettings} className="settings-button">
                    <img src={gearIcon} alt="Settings" className="gear-icon"/>
                </button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default Navigation;