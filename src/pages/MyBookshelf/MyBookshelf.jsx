import React from 'react';
import { useShelf } from "./MyBookShelfContext/MyBookshelfContext.jsx";
import { useNavigate } from "react-router-dom";



const MyBookshelf = () => {
    const { myBookshelf, removeFromMyBookshelf } = useShelf(); // Ensure this matches the exported context
    const navigate = useNavigate();

    const handleViewDetails = (workId) => {
        navigate(`/bookDetails/${workId}`);
    };

    const handleRemoveBook = (wordId) => {
        removeFromMyBookshelf(wordId);
    };

    return (
        <div>
            <h2>My Bookshelf</h2>
            {myBookshelf.map(book => (
                <div key={book.workId}>
                    {book.coverId && (
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                            alt={book.title}
                            onClick={() => handleViewDetails(book.workId)}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyBookshelf;