import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Button from "../button/Button.jsx";

const BookDetails = () => {
    const { workId } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // For programmatically navigating

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const workResponse = await axios.get(`https://openlibrary.org/works/${workId}.json`);
                const workData = workResponse.data;
                const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
                const editions = editionsResponse.data.entries;
                const firstEdition = editions[0] || {};

                const compiledDetails = {
                    title: workData.title,
                    authors: workData.authors ? workData.authors.map(authorRef => authorRef.name).join(', ') : 'N/A',
                    coverId: firstEdition.covers ? firstEdition.covers[0] : undefined,
                    publisher: firstEdition.publishers ? firstEdition.publishers.join(', ') : 'N/A',
                    publishDate: firstEdition.publish_date,
                    pageCount: firstEdition.number_of_pages,
                    language: firstEdition.languages ? firstEdition.languages.map(lang => lang.key.split('/').pop()).join(', ') : 'N/A',
                    subjects: workData.subjects ? workData.subjects.join(', ') : 'N/A',
                };

                setDetails(compiledDetails);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setDetails(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [workId]);

    const handleBack = () => {
        navigate('/TrendingHome'); // Adjust the route as necessary
    };

    const handleAddToShelf = () => {
        // Placeholder for functionality to add book to shelf
        console.log('Add to shelf:', workId);
    };

    if (loading) return <div>Loading...</div>;
    if (!details) return <div>Book details not found.</div>;

    return (
        <div>
            {details.coverId && (
                <img src={`https://covers.openlibrary.org/b/id/${details.coverId}-M.jpg`} alt={`${details.title} cover`} />
            )}
            <h1>{details.title}</h1>
            <p>Authors: {details.authors}</p>
            <p>Publisher: {details.publisher}</p>
            <p>Publish Date: {details.publishDate}</p>
            <p>Page Count: {details.pageCount}</p>
            <p>Language: {details.language}</p>
            <p>Subjects: {details.subjects}</p>
            <div style={{ marginTop: '20px' }}>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleAddToShelf}>Add to Shelf</Button>
            </div>
        </div>
    );
};

export default BookDetails;