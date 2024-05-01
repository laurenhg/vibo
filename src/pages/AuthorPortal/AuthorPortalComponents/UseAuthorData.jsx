import { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from "../../../components/Authentication/AuthContext.jsx";

const useAuthorData = () => {
    const { user } = useContext(AuthContext);
    const [authorData, setAuthorData] = useState(null);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAuthorDetails = useCallback(async (authorKey) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
            setAuthorData(response.data);
        } catch (error) {
            console.error('Failed to fetch author details:', error);
            setError('Failed to fetch author details');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWorksByAuthor = useCallback(async (authorKey) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://openlibrary.org/authors/${authorKey}/works.json?limit=25`);
            setWorks(response.data.entries || []);
        } catch (error) {
            console.error('Failed to fetch works by author:', error);
            setError('Failed to fetch works');
        } finally {
            setLoading(false);
        }
    }, []);

    const searchAuthor = useCallback(async (name) => {
        if (!name.trim()) return;
        setError('');
        setLoading(true);
        try {
            const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}`);
            if (response.data.docs.length > 0) {
                const authorDetails = response.data.docs[0];
                const authorKey = authorDetails.key.replace('/authors/', '');
                await fetchAuthorDetails(authorKey);
                await fetchWorksByAuthor(authorKey);
            } else {
                setAuthorData(null);
                setWorks([]);
                setError('No author found with that name.');
            }
        } catch (error) {
            console.error('Failed to search author:', error);
            setError('Failed to search for author. Please try again.');
            setAuthorData(null);
            setWorks([]);
        } finally {
            setLoading(false);
        }
    }, [fetchAuthorDetails, fetchWorksByAuthor]);

    return { authorData, works, loading, error, searchAuthor };
};

export default useAuthorData;