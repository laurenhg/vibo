import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorCard from "../../components/AuthorCard/AuthorCard.jsx";

const AuthorPortal = () => {
    const [name, setName] = useState('');
    const [authorData, setAuthorData] = useState(null);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null); // New state to track typing timeout

    const fetchAuthorDetails = async (authorKey) => {
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
            console.log("Author details response:", response.data);  // Log the author data
            setAuthorData(response.data);
        } catch (error) {
            console.error('Failed to fetch author details:', error);
        }
    };

    const fetchWorksByAuthor = async (authorKey) => {
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}/works.json?limit=25`);
            console.log("Works fetch response:", response.data);  // Log the works data
            setWorks(response.data.entries || []);
        } catch (error) {
            console.error('Failed to fetch works by author:', error);
        }
    };

    const searchAuthor = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}`);
            if (response.data && response.data.docs.length > 0) {
                const authorDetails = response.data.docs[0];
                fetchAuthorDetails(authorDetails.key.replace('/authors/', ''));
                fetchWorksByAuthor(authorDetails.key.replace('/authors/', ''));
            } else {
                setAuthorData(null);
                setWorks([]);
            }
        } catch (error) {
            console.error('Failed to search author:', error);
            setAuthorData(null);
            setWorks([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout); // Clear the previous timeout if exists
        }
        // Set a new timeout to trigger search after 500ms of inactivity
        const timeout = setTimeout(() => {
            if (name.trim() !== '') { // Ensure the input is not empty
                searchAuthor();
            }
        }, 500);
        setTypingTimeout(timeout); // Save the timeout ID in state
    }, [name]); // Trigger useEffect when name changes

    return (
        <div>
            <h2>Author Portal</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter author name"
            />
            <button onClick={searchAuthor} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            {authorData && <AuthorCard author={authorData} works={works} />}
        </div>
    );
}

export default AuthorPortal;