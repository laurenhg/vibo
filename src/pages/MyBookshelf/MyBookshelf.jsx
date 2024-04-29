import React from 'react';
import { useShelf } from "./MyBookShelfContext/MyBookshelfContext.jsx";
import { useNavigate } from "react-router-dom";
import './MyBookshelf.css';



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
        <div className="bookshelf-container">
            <h2 className="bookshelf-title">My Bookshelf</h2>
            <div className="search-results">
                {myBookshelf.map((book, index) => (
                    <div className="book-card" key={book.workId || index}>
                        {book.coverId && (
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                alt={book.title}
                                onClick={() => handleViewDetails(book.workId)}
                                className="book-cover"
                            />
                        )}
                        <p className="book-title" onClick={() => handleViewDetails(book.workId)}>Title: {book.title}</p>
                        <button className="remove-button" onClick={() => handleRemoveBook(book.workId)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default MyBookshelf;