import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from "../../components/button/Button.jsx";
import { fetchAndFilterBooksHome } from "../../helpers/fetchAndFilterBooksHome.js";
import bookCardStyles from '../../components/BookCard/BookCard.module.css';
import trendingStyles from './TrendingHome.module.css';

function TrendingHome() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const newBooks = await fetchAndFilterBooksHome('fiction', 25);
            setBooks(newBooks);
            localStorage.setItem('books', JSON.stringify(newBooks));
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        } else {
            fetchBooks();
        }
    }, [fetchBooks]);

    const memoizedFetchBooks = useMemo(() => fetchBooks, [fetchBooks]);

    const handleRefresh = () => {
        fetchBooks();
    };

    return (
        <div className={trendingStyles.trendingHomeContainer}>
            <Button onClick={handleRefresh} disabled={loading}>
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