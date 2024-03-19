import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css';
import avatarIcon from "../../assets/avatarIcon.png";
import logoImage from '../../assets/ViBo.png';

function Navigation () {
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
                </div>
            </div>
        </nav>
    );
}
export default Navigation