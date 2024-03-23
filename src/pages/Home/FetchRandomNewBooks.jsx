import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "../../components/button/Button.jsx";
import { fetchAndFilterBooks } from "../../helpers/fetchAndFilterBooks"; // Ensure this path is correct
import './FetchRandomNewBooks.css'; // Assuming this is where your CSS is defined

const FetchRandomNewBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to load random books
    const loadBooks = async () => {
        setLoading(true);
        const newBooks = await fetchAndFilterBooks('fiction', 25);
        setBooks(newBooks);
        setLoading(false);
    };

    // Load books on component mount and when the loadBooks function changes
    useEffect(() => {
        loadBooks();
    }, []);

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

export default FetchRandomNewBooks;