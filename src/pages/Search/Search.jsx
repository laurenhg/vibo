import React from 'react';
import { useForm } from 'react-hook-form';
import BookCard from "../../components/BookCard/BookCard.jsx";
import Button from "../../components/button/Button.jsx";
import styles from './Search.module.css';
import useBookSearch from "./UseSearchHook.jsx";

import bookIcon from '../../assets/open-book.png'
import subjectIcon from '../../assets/shapes.png'
import keywordIcon from '../../assets/unicorn.png'
import includeAuthorIcon from '../../assets/user.png'
import excludeAuthorIcon from '../../assets/userempty.png'

const Search = () => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const { results, loading, errorMessage, fetchBooks } = useBookSearch();

    const iconMap = {
        title: bookIcon,
        subject: subjectIcon,
        keyword: keywordIcon,
        author: includeAuthorIcon,
        excludeAuthor: excludeAuthorIcon,
    };

    const onSubmit = data => {
        fetchBooks(data);
    };

    return (
        <div className={styles.searchContainer}>
            <h2>Search for Books</h2>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
                {Object.keys(iconMap).map(key => (
                    <div className={styles.formControl} key={key}>
                        <div className={styles.inputIcon}>
                            <img src={iconMap[key]} alt={`${key} icon`}/>
                        </div>
                        <input
                            {...register(key)} // Register the input with react-hook-form
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            className={styles['searchFormInput']}
                            disabled={isSubmitting || loading}
                        />
                    </div>
                ))}
                <Button type="submit" disabled={isSubmitting || loading}>
                    {loading ? 'Loading...' : 'Search'}
                </Button>
            </form>
            {results.length > 0 && (
                <div className={styles.resultsHeader}>
                    <h3 className={styles.resultsTitle}>Results</h3>
                    <div className={styles.resultsLine}></div>
                    <div className={styles.searchResults}>
                        {results.map((book, index) => (
                            <BookCard key={index} book={book}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;