import React from 'react';
import { useShelf } from "./MyBookShelfContext/MyBookshelfContext.jsx";
import { useNavigate } from "react-router-dom";
import styles from '../MyBookshelf/MyBookshelf.module.css'
import bookCardStyles from '../../components/BookCard/BookCard.module.css';




const MyBookshelf = () => {
    const { myBookshelf, removeFromMyBookshelf } = useShelf();
    const navigate = useNavigate();

    const handleViewDetails = (workId) => {
        navigate(`/bookDetails/${workId}`);
    };

    const handleRemoveBook = (workId) => {
        removeFromMyBookshelf(workId);
    };

    return (
        <div className={styles.bookshelfContainer}>
            <h2 className={styles.bookshelfTitle}>My Bookshelf</h2>
            <div className={styles.searchResults}>
                {myBookshelf.map((book, index) => (
                    <div className={bookCardStyles.bookCard} key={book.workId || index}>
                        {book.coverId && (
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                alt={book.title}
                                onClick={() => handleViewDetails(book.workId)}
                                className={bookCardStyles.bookCover}
                            />
                        )}
                        <p className={bookCardStyles.bookTitle} onClick={() => handleViewDetails(book.workId)}>Title: {book.title}</p>
                        <button className={styles.removeButton} onClick={() => handleRemoveBook(book.workId)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default MyBookshelf;