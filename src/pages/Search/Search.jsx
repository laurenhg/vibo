import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useAuth} from "../LoginRegister/LoginRegisterContext/AuthContext.jsx";
import './Search.css';
import bookIcon from '../../../../untitled/src/assets/icons8-open-book-30.png';

const Search = () => {
    const { user } = useAuth(); // Get user from AuthContext
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
        // Construct a user-specific key for localStorage
        const resultsKey = user ? `searchResults-${user.sub}` : null;
        if (resultsKey) {
            const storedResults = localStorage.getItem(resultsKey);
            if (storedResults) {
                setResults(JSON.parse(storedResults));
            }
        }
    }, [user]);

    const handleChange = (e) => {
        setSearchParams(prevParams => ({...prevParams, [e.target.name]: e.target.value}));
        setErrorMessage(''); // Clear error message on change
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
                setErrorMessage('Sorry, no information found, please try again.');
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

    return (
        <div className="search-container">
            <h2>Search for Books</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="search-form" onSubmit={handleSubmit}>
                {Object.entries(searchParams).map(([key, value]) => (
                    <div className="form-control" key={key}>
                        <div className="input-icon">
                            <img src={bookIcon} alt="Icon" />
                        </div>
                        <input
                            type="text"
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} // Beautifies the field name
                            onChange={handleChange}
                            value={value}
                        />
                    </div>
                ))}
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>
            {results.length > 0 && (
                <div className="results-header">
                    <h3 className="results-title">Results</h3>
                    <div className="results-line"></div>
                    <div className="search-results">
                        {results.map((book, index) => (
                            <div className="book-card" key={index}>
                                <Link to={`/bookDetails/${book.key.split('/').pop()}`}>
                                    <img className="book-cover"
                                         src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '/path/to/placeholder.jpg'}
                                         alt="Book Cover"/>
                                    <p className="book-title">Title: {book.title}</p>
                                    <p className="book-author">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;