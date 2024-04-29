import React from 'react';
const BookDetailsSection = ({ details }) => (
    <div className="book-details-section">
        <h3>Book Details</h3>
        <ul>
            <li><span className="bold">Language:</span> {details.language || 'N/A'}</li>
            <li><span className="bold">Subjects:</span> {details.subjects || 'N/A'}</li>
            <li><span className="bold">Publisher:</span> {details.publisher || 'N/A'}</li>
        </ul>
    </div>
);

export default BookDetailsSection;