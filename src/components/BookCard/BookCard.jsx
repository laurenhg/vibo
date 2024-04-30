import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../components/BookCard/BookCard.module.css';



const BookCard = ({ book }) => {
    if (!book) return null;

    const bookKey = book.key ? book.key.split('/').pop() : book.cover_edition_key;
    const coverImage = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '/path/to/default.jpg';

    console.log('Book:', book);

    return (
        <div className={styles.bookCard}>
            <Link to={`/bookDetails/${bookKey}`}>
                <img src={coverImage} alt={book.title} className={styles.bookCover} />
                <div className={styles.bookTitle}>{book.title}</div>
            </Link>
        </div>
    );
};

export default BookCard;