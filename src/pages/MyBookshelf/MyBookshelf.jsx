import React from 'react';
import { useShelf } from "./MyBookShelfContext/MyBookshelfContext.jsx";
import { useNavigate } from "react-router-dom";
import './MyBookshelf.css';



const MyBookshelf = () => {
    const { myBookshelf, removeFromMyBookshelf } = useShelf(); // Ensure this matches the exported context
    const navigate = useNavigate();

    const handleViewDetails = (workId) => {
        navigate(`/bookDetails/${workId}`);
    };

    const handleRemoveBook = (workId) => {
        removeFromMyBookshelf(workId);
    };

    return (
        <div className="bookshelf-container"> {/* Apply container class */}
            <h2 className="bookshelf-title">My Bookshelf</h2> {/* Apply title class */}
            <div className="search-results"> {/* Apply search-results class */}
                {myBookshelf.map((book, index) => (
                    <div className="book-card" key={book.workId || index}> {/* Apply book-card class */}
                        {book.coverId && (
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                alt={book.title}
                                onClick={() => handleViewDetails(book.workId)}
                                className="book-cover" // Apply book-cover class
                            />
                        )}
                        <p className="book-title" onClick={() => handleViewDetails(book.workId)}>Title: {book.title}</p> {/* Apply book-title class */}
                        <button className="remove-button" onClick={() => handleRemoveBook(book.workId)}>Remove</button> {/* Apply remove-button class */}
                    </div>
                ))}
            </div>
        </div>


    );
};

export default MyBookshelf;