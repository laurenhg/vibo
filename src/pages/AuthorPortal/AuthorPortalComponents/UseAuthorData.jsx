

import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuthorData = () => {
    const [name, setName] = useState('');
    const [authorData, setAuthorData] = useState(null);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleSearch = async () => {
        if (!name.trim()) return;
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}`);
            if (response.data && response.data.docs.length > 0) {
                const authorDetails = response.data.docs[0];
                const authorKey = authorDetails.key.replace('/authors/', '');
                await fetchAuthorDetails(authorKey);
                await fetchWorksByAuthor(authorKey);
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

    return { name, setName, authorData, works, loading, error, handleSearch };
};

export default useAuthorData;