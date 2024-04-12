import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from "../../pages/LoginRegister/LoginRegisterContext/AuthContext.jsx";
import './Navigation.css';
import avatarIcon from "../../../../untitled/src/assets/avatarIcon.png";
import logoImage from '../../../../untitled/src/assets/ViBo.png';

function Navigation() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Call the logout method from the auth context
        navigate('/login');  // Redirect to login page after logout
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
                <div className="avatar-container">
                    <img src={avatarIcon} alt="avatar" className="avatar"/>
                    <button className="hamburger-menu">☰</button>
                    <button onClick={handleLogout} className="logout-button">Logout</button>  {/* Add this button */}
                </div>
            </div>
        </nav>
    );
}
export default Navigation;