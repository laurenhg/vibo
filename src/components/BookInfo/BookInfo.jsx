import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const [bookDetails, setBookDetails] = useState(null);
    const { id } = useParams(); // This gets the ID from the URL

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Fetching work details
                const workResponse = await axios.get(`https://openlibrary.org/works/${id}.json`);
                const workDetails = workResponse.data;

                const authorDetailsPromises = workDetails.authors.map(author =>
                    axios.get(`https://openlibrary.org/authors/${author.author.key.replace('/authors/', '')}.json`)
                );
                const authorsDetails = await Promise.all(authorDetailsPromises);


                const editionsResponse = await axios.get(`https://openlibrary.org/works/${id}/editions.json`);
                if (editionsResponse.data.entries.length > 0) {
                    const firstEdition = editionsResponse.data.entries[0];

                    setBookDetails({
                        title: workDetails.title,
                        authors: authorsDetails.map(authorRes => authorRes.data.name),
                        cover_id: workDetails.covers ? workDetails.covers[0] : null,
                        publisher: firstEdition.publishers ? firstEdition.publishers[0] : "Publisher information unavailable",
                        publish_date: firstEdition.publish_date,
                        page_count: firstEdition.number_of_pages,
                        language: firstEdition.languages ? firstEdition.languages[0].key.replace('/languages/', '') : "Language information unavailable",
                        subjects: firstEdition.subjects ? firstEdition.subjects.map(subject => subject.name).join(', ') : "Subject information unavailable",
                    });
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!bookDetails) return <div>Loading...</div>;

    return (
        <div>
            <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover_id}-L.jpg`} alt={bookDetails.title} />
            <h2>{bookDetails.title}</h2>
            {bookDetails.authors && bookDetails.authors.map((author, index) => (
                <p key={index}>Author: {author}</p>
            ))}
            <p>Publisher: {bookDetails.publisher}</p>
            <p>Publish Date: {bookDetails.publish_date}</p>
            <p>Page Count: {bookDetails.page_count}</p>
            <p>Language: {bookDetails.language}</p>
            <p>Subjects: {bookDetails.subjects}</p>
        </div>
    );
};

export default BookDetail;