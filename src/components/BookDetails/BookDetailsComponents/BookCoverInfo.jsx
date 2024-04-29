import React from 'react';
const BookCoverInfo = ({ details, styles }) => {
    return (
        <div className={styles.bookCoverInfo}>
            <div className={styles.bookCoverContainer}>
                {details.coverId && (
                    <img className={styles.bookCover} src={`https://covers.openlibrary.org/b/id/${details.coverId}-M.jpg`} alt={`${details.title} cover`} />
                )}
            </div>
            <div className={styles.bookInfo}> {/* Apply CSS module class */}
                <h2>{details.title || 'N/A'}</h2>
                <p>Authors: {details.authors || 'N/A'}</p>
                <p>Page Count: {details.pageCount || 'N/A'}</p>
                <p>Published in: {details.publishDate || 'N/A'}</p>
            </div>
        </div>
    );
};

export default BookCoverInfo;