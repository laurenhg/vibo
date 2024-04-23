import React from 'react';
const BookDescription = ({ description }) => (
    <div className="book-details-section">
        <h3><span className="bold">Description</span></h3>
        <p>{description || 'N/A'}</p>
    </div>
);

export default BookDescription;