import React from 'react';
import {NavLink} from 'react-router-dom'
import './Navigation.css'
import avatarIcon from "../../assets/avatarIcon.png"

function Navigation () {
    const isActive = true;

    return (
        <nav className="navigation">
        <NavLink to="/Home" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}> Home</NavLink>
        <NavLink to="/Search" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Search</NavLink>
        <NavLink to="/MyBookshelf" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>My Bookshelf</NavLink>
        <NavLink to="/AuthorPortal" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}> Author Portal</NavLink>
    <div className="navigation-right">
            <div className="avatar-container">
        <img src={avatarIcon} alt="avatar" className= "avatar"/>
    </div>
            <div>
        <button className="hamburger-menu"> ☰</button>
    </div>
    </div>
        </nav>
    );
}

export default Navigation