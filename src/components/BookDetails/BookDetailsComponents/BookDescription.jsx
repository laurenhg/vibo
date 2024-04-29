import React from 'react';
const BookDescription = ({ description, styles }) => (
    <div className={styles.bookDetailsSection}>
        <h3><span className={styles.bold}>Description</span></h3>
        <p>{description || 'N/A'}</p>
    </div>
);
export default BookDescription;