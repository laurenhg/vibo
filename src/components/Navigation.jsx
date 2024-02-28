import React from 'react';
import {Link} from 'react-router-dom'
// import '../styles/Navigation.css'
import avatarIcon from "../assets/avatarIcon.png"

const Navigation = () => {
    return (
        <nav className="navigation">
        <Link to="/TrendingHome" className="nav-link"> Trending</Link>
        <Link to="/Discover" className="nav-link">Discover</Link>
        <Link to="/MyBookshelf" className="nav-link">My Bookshelf</Link>
        <Link to="/AuthorPortal" className="nav-link"> Author Portal</Link>
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