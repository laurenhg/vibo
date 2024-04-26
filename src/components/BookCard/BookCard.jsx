import React from 'react';
import { Link } from 'react-router-dom';
import '../BookCard/BookCard.css'


const BookCard = ({ book }) => {
    if (!book) return null; // Safeguard against null or undefined books

    const bookKey = book.key ? book.key.split('/').pop() : book.cover_edition_key;
    const coverImage = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '/path/to/default.jpg'; // Provide a default cover if none is available

    return (
        <div className="book-card">
            <Link to={`/bookDetails/${bookKey}`}>
                <img src={coverImage} alt={book.title} className="book-cover" />
                <div className="book-title">{book.title}</div>
            </Link>
        </div>
    );
};

export default BookCard;