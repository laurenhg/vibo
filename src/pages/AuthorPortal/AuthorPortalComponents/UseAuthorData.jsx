

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from "../../../components/Authentication/AuthContext.jsx";

const useAuthorData = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [authorData, setAuthorData] = useState(null);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Generate unique keys based on the user's identifier
    const authorNameKey = user ? `authorName-${user.sub}` : 'authorName-guest';
    const authorDataKey = user ? `authorData-${user.sub}` : 'authorData-guest';
    const worksDataKey = user ? `worksData-${user.sub}` : 'worksData-guest';

    useEffect(() => {
        const storedName = sessionStorage.getItem(authorNameKey);
        const storedAuthorData = sessionStorage.getItem(authorDataKey);
        const storedWorks = sessionStorage.getItem(worksDataKey);

        if (storedName && storedAuthorData && storedWorks) {
            setName(storedName);
            setAuthorData(JSON.parse(storedAuthorData));
            setWorks(JSON.parse(storedWorks));
        }
    }, [authorNameKey, authorDataKey, worksDataKey]);

    const fetchAuthorDetails = async (authorKey) => {
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
            setAuthorData(response.data);
            sessionStorage.setItem(authorDataKey, JSON.stringify(response.data));
        } catch (error) {
            console.error('Failed to fetch author details:', error);
            setError('Failed to fetch author details');
        }
    };

    const fetchWorksByAuthor = async (authorKey) => {
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}/works.json?limit=25`);
            setWorks(response.data.entries || []);
            sessionStorage.setItem(worksDataKey, JSON.stringify(response.data.entries || []));
        } catch (error) {
            console.error('Failed to fetch works by author:', error);
            setError('Failed to fetch works');
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
                sessionStorage.setItem(authorNameKey, name);
            } else {
                setAuthorData(null);
                setWorks([]);
                setError('No author found with that name.');
                sessionStorage.removeItem(authorDataKey);
                sessionStorage.removeItem(worksDataKey);
            }
        } catch (error) {
            console.error('Failed to search author:', error);
            setError('Failed to search for author. Please try again.');
            setAuthorData(null);
            setWorks([]);
            sessionStorage.removeItem(authorDataKey);
            sessionStorage.removeItem(worksDataKey);
        }
        setLoading(false);
    };

    return { name, setName, authorData, works, loading, error, handleSearch };
};

export default useAuthorData;
