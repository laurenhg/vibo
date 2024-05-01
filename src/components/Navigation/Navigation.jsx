import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../Authentication/AuthContext.jsx";
import styles from './Navigation.module.css'
import logoImage from '../../assets/ViBo.png'
import gearIcon from '../../assets/gear.png'

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
        <nav className={styles.navigation}>
            <div className={styles.navigationLeft}>
                <img src={logoImage} alt="logo" className={styles.logo}/>
            </div>
            <div className={styles.navigationLinks}>
                <NavLink to="/TrendingHome"
                         className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}>Home</NavLink>
                <NavLink to="/Search"
                         className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}>Search</NavLink>
                <NavLink to="/MyBookshelf"
                         className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}>My
                    Bookshelf</NavLink>
                <NavLink to="/AuthorPortal"
                         className={({isActive}) => isActive ? styles.activeLink : styles.defaultLink}>Author
                    Portal</NavLink>
            </div>
            <div className={styles.navigationRight}>
                {user && <span className={styles.welcomeMessage}>Welcome, {user.sub}!</span>}
                <button onClick={handleSettings} className={styles.settingsButton}>
                    <img src={gearIcon} alt="Settings" className={styles.gearIcon}/>
                </button>
                <button onClick={handleLogout} className={styles.logoutButton}>"logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default Navigation;