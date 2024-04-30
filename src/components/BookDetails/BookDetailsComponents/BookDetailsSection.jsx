import React from 'react';

const BookDetailsSection = ({ details, styles }) => (
    <div className={styles['bookDetailsSection']}>
        <h3>Book Details</h3>
        <ul>
            <li><span className={styles['bold']}>Language:</span> {details.language || 'N/A'}</li>
            <li><span className={styles['bold']}>Subjects:</span> {details.subjects || 'N/A'}</li>
            <li><span className={styles['bold']}>Publisher:</span> {details.publisher || 'N/A'}</li>
        </ul>
    </div>
);

export default BookDetailsSection;