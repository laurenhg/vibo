import React from 'react';
import axios from 'axios';
import useAuthorData from "./AuthorPortalComponents/UseAuthorData.jsx";
import AuthorCard from "../../components/AuthorCard/AuthorCard.jsx";
import styles from '../AuthorPortal/AuthorPortal.module.css'

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
        <div className={styles.authorPortalContainer}>
            <h2>Author Portal</h2>
            <p> Enter an author's name to learn more about them!</p>
            <div className={styles.authorSearchForm}>
                <input
                    type="text"
                    className={styles.authorSearchInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter author name"
                    disabled={loading}
                />
                <button
                    className={styles.authorSearchButton}
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {loading && <p className={styles.loadingMessage}>Loading...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {authorData && <AuthorCard author={authorData} works={works} />}
        </div>
    );
};



export default AuthorPortal;