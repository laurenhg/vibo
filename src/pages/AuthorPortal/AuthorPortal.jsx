import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthorData from "./AuthorPortalComponents/UseAuthorData.jsx";
import AuthorCard from "../../components/AuthorCard/AuthorCard.jsx";
import './AuthorPortal.css'; // Make sure the path is correct

const AuthorPortal = () => {
    const {
        name, setName, authorData, works, loading, error, handleSearch
    } = useAuthorData();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="author-portal-container">
            <h2>Author Portal</h2>
            <p> Enter an author's name to learn more about them!</p>
            <div className="author-search-form">
                <input
                    type="text"
                    className="author-search-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter author name"
                    disabled={loading}
                />
                <button
                    className="author-search-button"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {authorData && <AuthorCard author={authorData} works={works} />}
        </div>
    );
};



export default AuthorPortal;