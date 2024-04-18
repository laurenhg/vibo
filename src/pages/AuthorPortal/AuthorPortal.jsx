import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorCard from "../../components/AuthorCard/AuthorCard.jsx";
import './AuthorPortal.css'; // Make sure the path is correct

const AuthorPortal = () => {
    const [name, setName] = useState('');
    const [authorData, setAuthorData] = useState(null);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');  // State to handle error or no data message

    useEffect(() => {
        const storedName = sessionStorage.getItem('authorName');
        const storedAuthorData = sessionStorage.getItem('authorData');
        const storedWorks = sessionStorage.getItem('worksData');

        if (storedName && storedAuthorData && storedWorks) {
            setName(storedName);
            setAuthorData(JSON.parse(storedAuthorData));
            setWorks(JSON.parse(storedWorks));
        }
    }, []);

    const fetchAuthorDetails = async (authorKey) => {
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
            setAuthorData(response.data);
            sessionStorage.setItem('authorData', JSON.stringify(response.data));
        } catch (error) {
            console.error('Failed to fetch author details:', error);
        }
    };

    const fetchWorksByAuthor = async (authorKey) => {
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}/works.json?limit=25`);
            setWorks(response.data.entries || []);
            sessionStorage.setItem('worksData', JSON.stringify(response.data.entries || []));
        } catch (error) {
            console.error('Failed to fetch works by author:', error);
        }
    };

    const searchAuthor = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}`);
            if (response.data && response.data.docs.length > 0) {
                const authorDetails = response.data.docs[0];
                const authorKey = authorDetails.key.replace('/authors/', '');
                fetchAuthorDetails(authorKey);
                fetchWorksByAuthor(authorKey);
                sessionStorage.setItem('authorName', name);
            } else {
                setAuthorData(null);
                setWorks([]);
                setError('No author found with that name.');
                sessionStorage.removeItem('authorData');
                sessionStorage.removeItem('worksData');
            }
        } catch (error) {
            console.error('Failed to search author:', error);
            setError('Failed to search for author. Please try again.');
            setAuthorData(null);
            setWorks([]);
            sessionStorage.removeItem('authorData');
            sessionStorage.removeItem('worksData');
        }
        setLoading(false);
    };

    const handleSearch = () => {
        if (name.trim() !== '') {
            searchAuthor();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="author-portal-container">
            <h2>Author Portal</h2>
            <div className="author-search-form">
                <input
                    type="text"
                    className="author-search-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter author name"
                />
                <button className="author-search-button" onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {authorData && <AuthorCard author={authorData} works={works} />}
        </div>
    );
}

export default AuthorPortal;