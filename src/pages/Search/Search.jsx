import React from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard/BookCard.jsx";
import {useAuth} from "../../components/Authentication/AuthContext.jsx";
import UseSearchHook from "./UseSearchHook.jsx";
import './Search.css';

import bookIcon from '../../../../untitled/src/assets/icons8-open-book-30.png';
import subjectIcon from '../../assets/shapes.png'
import keywordIcon from '../../assets/unicorn.png'
import includeAuthorIcon from '../../assets/user.png'
import excludeAuthorIcon from '../../assets/userempty.png'

const Search = () => {
    const { user } = useAuth();
    const {
        searchParams,
        handleChange,
        handleSubmit,
        results,
        loading,
        errorMessage
    } = UseSearchHook();

    const iconMap = {
        title: bookIcon,
        subject: subjectIcon,
        keyword: keywordIcon,
        author: includeAuthorIcon,
        excludeAuthor: excludeAuthorIcon,
    };

    return (
        <div className="search-container">
            <h2>Search for Books</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="search-form" onSubmit={handleSubmit}>
                {Object.entries(searchParams).map(([key, value]) => (
                    <div className="form-control" key={key}>
                        <div className="input-icon">
                            <img src={iconMap[key]} alt={`${key} icon`} />
                        </div>
                        <input
                            type="text"
                            name={key}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
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
                            <BookCard key={index} book={book} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
