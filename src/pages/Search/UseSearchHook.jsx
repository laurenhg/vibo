import { useState, useEffect } from 'react';
import axios from 'axios';

const useBookSearch = () => {
    const [results, setResults] = useState(() => {
        // Attempt to load stored results from session storage on initialization
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Any time results change, update them in session storage
        sessionStorage.setItem('searchResults', JSON.stringify(results));
    }, [results]);

    const fetchBooks = async (searchParams) => {
        setLoading(true);
        setErrorMessage('');
        try {
            let queryParts = [];
            if (searchParams.title) queryParts.push(`title=${encodeURIComponent(searchParams.title)}`);
            if (searchParams.subject) queryParts.push(`subject=${encodeURIComponent(searchParams.subject)}`);
            if (searchParams.keyword) queryParts.push(`keyword=${encodeURIComponent(searchParams.keyword)}`);
            if (searchParams.author) queryParts.push(`author=${encodeURIComponent(searchParams.author)}`);
            if (searchParams.excludeAuthor) queryParts.push(`excludeAuthor=${encodeURIComponent(searchParams.excludeAuthor)}`);
            const query = `https://openlibrary.org/search.json?${queryParts.join('&')}&limit=10`;

            const response = await axios.get(query);
            if (response.data.docs.length === 0) {
                setErrorMessage('No books found. Please try again.');
                setResults([]);
            } else {
                setResults(response.data.docs);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Failed to search. Please check your network and try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, errorMessage, fetchBooks };
};

export default useBookSearch;