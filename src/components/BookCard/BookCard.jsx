import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookCard = ({ book }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org${book.key}.json`);
                setBookDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [book.key]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bookDetails) {
        return <div>No book details available.</div>;
    }

    return (
        <div>
            <h2>{bookDetails.title}</h2>

        </div>
    );
};

export default BookCard;