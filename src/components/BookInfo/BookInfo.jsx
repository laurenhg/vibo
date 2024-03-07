import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Assuming <Link> might be used later for navigation

const BookInfo = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
                setBookDetails(response.data);
            } catch (error) {
                console.error('Error fetching book details', error);
            }
        };

        fetchBookDetails();
    }, [id]); // This ensures useEffect is called when the component mounts or the ID changes.

    if (!bookDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{bookDetails.title}</h1>
            {bookDetails.authors && bookDetails.authors.map((author, index) => (
                <p key={index}>Author: {author.name || 'N/A'}</p>
            ))}
            <p>First Published: {bookDetails.first_publish_year || 'N/A'}</p>
            {bookDetails.subjects && (
                <div>
                    <h3>Subjects:</h3>
                    <ul>
                        {bookDetails.subjects.map((subject, index) => (
                            <li key={index}>{subject|| 'N/A'}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default BookInfo;