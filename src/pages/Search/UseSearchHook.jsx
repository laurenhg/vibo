import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../components/Authentication/AuthContext.jsx";

const useSearch = () => {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useState({
        title: '',
        subject: '',
        keyword: '',
        author: '',
        excludeAuthor: '',
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Load search results from local storage when the component mounts
        const savedResults = localStorage.getItem(`searchResults-${user ? user.sub : 'guest'}`);
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        }
    }, [user]);

    const handleChange = (e) => {
        setSearchParams(prevParams => ({...prevParams, [e.target.name]: e.target.value}));
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchParams.author.trim().toLowerCase() === searchParams.excludeAuthor.trim().toLowerCase() && searchParams.author.trim()) {
            setErrorMessage('Please ensure that the "Author" and "Exclude Author" fields do not contain the same name');
            return;
        }
        setLoading(true);
        let queryParts = [];
        if (searchParams.title) queryParts.push(`title=${encodeURIComponent(searchParams.title)}`);
        if (searchParams.keyword) queryParts.push(`q=${encodeURIComponent(searchParams.keyword)}`);
        if (searchParams.author) queryParts.push(`author=${encodeURIComponent(searchParams.author)}`);
        if (searchParams.subject) queryParts.push(`subject=${encodeURIComponent(searchParams.subject)}`);
        const query = `https://openlibrary.org/search.json?${queryParts.join('&')}&limit=10`;

        try {
            const {data} = await axios.get(query);
            if (data.docs.length === 0) {
                setErrorMessage('Oops! No books were found. Please try again.');
                setResults([]);
                localStorage.removeItem(`searchResults-${user ? user.sub : 'guest'}`);
            } else {
                const filteredResults = searchParams.excludeAuthor.trim() ?
                    data.docs.filter(book =>
                        !(book.author_name || []).some(author =>
                            author.toLowerCase().includes(searchParams.excludeAuthor.toLowerCase())
                        )
                    ) : data.docs;
                setResults(filteredResults);
                localStorage.setItem(`searchResults-${user ? user.sub : 'guest'}`, JSON.stringify(filteredResults));
                setErrorMessage('');
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setErrorMessage('Failed to search. Please check your network and try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return {
        searchParams,
        handleChange,
        handleSubmit,
        results,
        loading,
        errorMessage
    };
};

export default useSearch;