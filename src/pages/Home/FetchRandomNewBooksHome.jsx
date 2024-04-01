import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "../../components/button/Button.jsx";
import { fetchAndFilterBooksHome } from "../../helpers/fetchAndFilterBooksHome.js";
import './FetchRandomNewBooksHome.css';
import { useBooks } from "./HomeContext/BookContext.jsx";

const FetchRandomNewBooksHome = () => {
    const [loading, setLoading] = useState(false);
    const { books, setBooks } = useBooks();
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    // Function to load random books
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
        <div>
            <Button onClick={loadBooks} disabled={loading}>
                {loading ? "Loading..." : "Show me some titles"}
            </Button>
            <div className="bookCardContainer">
                {books.map((book, index) => (
                    <div key={index} className="bookCard">
                        <Link to={`/bookDetails/${book.key.split('/').pop()}`}>
                            <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} className="bookCover"/>
                            <div className="bookTitle">{book.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchRandomNewBooksHome;