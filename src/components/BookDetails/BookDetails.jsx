import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from "../button/Button.jsx";
import { useShelf } from "../../pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";

const BookDetails = () => {
    const { workId } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shelfAction, setShelfAction] = useState(''); // can be 'added', 'removed', or ''
    const { myBookshelf, addToMyBookshelf, removeFromMyBookshelf } = useShelf();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const workResponse = await axios.get(`https://openlibrary.org/works/${workId}.json`);
                const workData = workResponse.data;
                const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
                const editions = editionsResponse.data.entries;
                const firstEditionWithCover = editions.find(edition => edition.covers && edition.covers.length > 0) || editions[0] || {};

                const compiledDetails = {
                    title: workData.title,
                    authors: workData.authors ? workData.authors.map(author => author.name).join(', ') : 'N/A',
                    coverId: firstEditionWithCover.covers ? firstEditionWithCover.covers[0] : undefined,
                    publisher: firstEditionWithCover.publishers ? firstEditionWithCover.publishers.join(', ') : 'N/A',
                    publishDate: firstEditionWithCover.publish_date,
                    pageCount: firstEditionWithCover.number_of_pages,
                    language: firstEditionWithCover.languages ? firstEditionWithCover.languages.map(lang => lang.key.split('/').pop()).join(', ') : 'N/A',
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

    useEffect(() => {
        // Initialize the action based on the book's presence in the shelf
        setShelfAction(myBookshelf.some(book => book.workId === workId) ? 'added' : '');
    }, [myBookshelf, workId]);

    const handleBack = () => {
        navigate(-1);
    };

    const toggleShelf = () => {
        if (myBookshelf.some(book => book.workId === workId)) {
            removeFromMyBookshelf(workId);
            setShelfAction('removed');
        } else {
            if (details) {
                addToMyBookshelf({ ...details, workId });
                setShelfAction('added');
            }
        }
        setTimeout(() => setShelfAction(''), 3000); // Clear the action message after 3 seconds
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
                <Button onClick={toggleShelf}>{shelfAction === 'added' ? 'Remove from Shelf' : 'Add to Shelf'}</Button>
                {shelfAction && <p style={{ color: 'green' }}>{shelfAction === 'added' ? 'Book added!' : 'Book removed!'}</p>}
            </div>
        </div>

    );
};

export default BookDetails;