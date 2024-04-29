import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "../../components/button/Button.jsx";
import { fetchAndFilterBooksHome } from "../../helpers/fetchAndFilterBooksHome.js";
import bookCardStyles from '../../components/BookCard/BookCard.module.css'; // Styles for BookCard
import trendingStyles from './TrendingHome.module.css'; // Styles for TrendingHome layout

function TrendingHome() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    const loadBooks = async () => {
        setLoading(true);
        const newBooks = await fetchAndFilterBooksHome('fiction', 25);
        setBooks(newBooks);
        setLoading(false);
        setInitialLoadDone(true);
    };

    useEffect(() => {
        if (books.length === 0 && !initialLoadDone) {
            loadBooks();
        }
    }, [books, initialLoadDone]);

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    return (
        <div className={trendingStyles.trendingHomeContainer}>
            <Button onClick={loadBooks} disabled={loading}>
                {loading ? "Loading..." : "Show me some titles"}
            </Button>
            <div className={trendingStyles.bookCardContainer}>
                {books.map((book, index) => (
                    <div key={index} className={bookCardStyles.bookCard}>
                        <Link to={`/bookDetails/${book.key.split('/').pop()}`}>
                            <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} className={bookCardStyles.bookCover}/>
                            <div className={bookCardStyles.bookTitle}>{book.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingHome;