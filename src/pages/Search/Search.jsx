import React from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard/BookCard.jsx";
import {useAuth} from "../../components/Authentication/AuthContext.jsx";
import UseSearchHook from "./UseSearchHook.jsx";
import styles from './Search.module.css'

import bookIcon from '../../assets/open-book.png'
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
        <div className={styles.searchContainer}>
            <h2>Search for Books</h2>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                {Object.entries(searchParams).map(([key, value]) => (
                    <div className={styles.formControl} key={key}>
                        <div className={styles.inputIcon}>
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
                <div className={styles.resultsHeader}>
                    <h3 className={styles.resultsTitle}>Results</h3>
                    <div className={styles.resultsLine}></div>
                    <div className={styles.searchResults}>
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
