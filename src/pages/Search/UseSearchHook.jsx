import { useState } from 'react';
import axios from 'axios';

const useBookSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchBooks = async (searchParams) => {
        setLoading(true);
        try {
            let queryParts = [];
            // Construct query parts based on searchParams
            if (searchParams.title) queryParts.push(`title=${encodeURIComponent(searchParams.title)}`);
            if (searchParams.author) queryParts.push(`author=${encodeURIComponent(searchParams.author)}`);
            // Add other conditions similarly...

            const query = `https://openlibrary.org/search.json?${queryParts.join('&')}&limit=10`;
            const response = await axios.get(query);

            if (response.data.docs.length === 0) {
                setErrorMessage('No books found. Please try again.');
                setResults([]);
            } else {
                setResults(response.data.docs); // Filter or process data as needed
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