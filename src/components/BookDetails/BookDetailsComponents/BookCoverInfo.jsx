import React from 'react';

const BookCoverInfo = ({ details, styles }) => {
    // console.log("Styles in BookCoverInfo:", styles);
    return (
        <div className={styles['bookCoverInfo']}>
            <div className={styles['bookCoverContainer']}>
                {details.coverId && (
                    <img className={styles['bookCover']} src={`https://covers.openlibrary.org/b/id/${details.coverId}-M.jpg`} alt={`${details.title} cover`} />
                )}
            </div>
            <div className={styles['bookInfo']}>
                <h2 className={styles['bookInfoH2']}>{details.title || 'N/A'}</h2>
                <p className={styles['bookInfoP']}>Authors: {details.authors || 'N/A'}</p>
                <p className={styles['bookInfoP']}>Page Count: {details.pageCount || 'N/A'}</p>
                <p className={styles['bookInfoP']}>Published in: {details.publishDate || 'N/A'}</p>
            </div>
        </div>
    );
};

export default BookCoverInfo;