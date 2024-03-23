import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookInfo = () => {
    const [bookDetails, setBookDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const workResponse = await axios.get(`https://openlibrary.org/works/${id}.json`);
                const workDetails = workResponse.data;


                // Assuming subjects might be better retrieved from the work details
                // directly rather than editions if available
                const subjects = workDetails.subjects ? workDetails.subjects.join(', ') : 'Subjects information unavailable';

                const authorDetailsPromises = workDetails.authors.map(author =>
                    axios.get(`https://openlibrary.org${author.key}.json`) // Fixed the author key
                );
                const authorsDetails = await Promise.all(authorDetailsPromises);

                // You might still want to fetch edition details for other purposes
                const editionsResponse = await axios.get(`https://openlibrary.org/works/${id}/editions.json`);
                const firstEdition = editionsResponse.data.entries?.[0] ?? {};

                setBookDetails({
                    title: workDetails.title,
                    authors: authorsDetails.map(res => res.data.name),
                    cover_id: workDetails.covers?.[0] ?? null,
                    publisher: firstEdition.publishers?.[0] ?? "Publisher information unavailable",
                    publish_date: firstEdition.publish_date ?? "Publish date unavailable",
                    page_count: firstEdition.number_of_pages,
                    language: firstEdition.languages?.[0]?.key.replace('/languages/', '') ?? "Language information unavailable",
                    subjects: subjects, // Use subjects from work details if available
                });
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!bookDetails) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
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
            <button onClick={() => console.log("Book added to shelf")}>Add to Shelf</button>
        </div>
    );
};

export default BookInfo;