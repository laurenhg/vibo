import React from 'react';

const BookCoverInfo = ({ details }) => {
    return (
        <div className="book-cover-info">
            <div className="book-cover-container">
                {details.coverId && (
                    <img className="book-cover" src={`https://covers.openlibrary.org/b/id/${details.coverId}-M.jpg`} alt={`${details.title} cover`} />
                )}
            </div>
            <div className="book-info">
                <h2>{details.title || 'N/A'}</h2>
                <p>Authors: {details.authors || 'N/A'}</p>
                <p>Page Count: {details.pageCount || 'N/A'}</p>
                <p>Published in: {details.publishDate || 'N/A'}</p>
            </div>
        </div>
    );
};

export default BookCoverInfo;