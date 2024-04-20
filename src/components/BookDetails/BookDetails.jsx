import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from "../button/Button.jsx";
import CustomButton from "../button/Button.jsx";
import { useShelf } from "../../pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";
import './BookDetails.css';

const BookDetails = () => {
    const { workId } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shelfAction, setShelfAction] = useState('');
    const { myBookshelf, addToMyBookshelf, removeFromMyBookshelf } = useShelf();
    const navigate = useNavigate();

    const formatDescription = description => {
        if (!description) return 'N/A';
        if (typeof description === 'string') return description;
        if (description.value && typeof description.value === 'string') return description.value;
        return 'Description format not supported';
    };

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const workResponse = await axios.get(`https://openlibrary.org/works/${workId}.json`);
                const workData = workResponse.data;

                const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
                const editions = editionsResponse.data.entries;

                const firstEditionWithCover = editions.find(edition => edition.covers && edition.covers.length > 0) || editions[0] || {};

                const fetchAuthorNames = async (authors) => {
                    const promises = authors.map(author =>
                        axios.get(`https://openlibrary.org${author.author.key}.json`)
                    );
                    const authorResponses = await Promise.all(promises);
                    return authorResponses.map(resp => resp.data.name);
                };

                const authorNames = workData.authors ? await fetchAuthorNames(workData.authors) : ['N/A'];

                const compiledDetails = {
                    title: workData.title,
                    authors: authorNames.join(', '),
                    coverId: firstEditionWithCover.covers ? firstEditionWithCover.covers[0] : undefined,
                    publisher: firstEditionWithCover.publishers ? firstEditionWithCover.publishers.join(', ') : 'N/A',
                    publishDate: firstEditionWithCover.publish_date,
                    pageCount: firstEditionWithCover.number_of_pages,
                    language: firstEditionWithCover.languages ? firstEditionWithCover.languages.map(lang => lang.key.split('/').pop()).join(', ') : 'N/A',
                    subjects: workData.subjects ? workData.subjects.join(', ') : 'N/A',
                    description: formatDescription(workData.description),
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
        setTimeout(() => setShelfAction(''), 3000);
    };

    if (loading) return <div>Loading...</div>;
    if (!details) return <div>Book details not found.</div>;

    console.log('Rendering Details:', JSON.stringify(details, null, 2));

    return (
        <div className="book-details-container">
            {details ? (
                <div className="book-details">
                    {details.coverId && (
                        <div className="book-cover-container">
                            <img className="book-cover" src={`https://covers.openlibrary.org/b/id/${details.coverId}-M.jpg`} alt={`${details.title} cover`} />
                        </div>
                    )}
                    <div className="book-info">
                        <h2>{details.title || 'N/A'}</h2>
                        <p>Authors: {details.authors || 'N/A'}</p>
                        <p>Page Count: {details.pageCount || 'N/A'}</p>
                        <p>Published in: {details.publishDate || 'N/A'}</p>
                    </div>
                </div>
            ) : <p>No details available</p>}
            {details && (
                <div>
                    <div className="book-details-section">
                        <h3>Book Details</h3>
                        <ul>
                            <li><span className="bold">Language:</span> {details.language || 'N/A'}</li>
                            <li><span className="bold">Subjects:</span> {details.subjects || 'N/A'}</li>
                            <li><span className="bold">Publisher:</span> {details.publisher || 'N/A'}</li>

                        </ul>
                    </div>
                    <div className="book-details-section">
                        <h3><span className="bold">Description</span></h3>
                        <p>{details.description || 'N/A'}</p>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <CustomButton onClick={handleBack} className="button-normal">Back</CustomButton>
                        <CustomButton onClick={toggleShelf} className={shelfAction === 'added' ? 'button-added' : 'button-normal'}>
                            {shelfAction === 'added' ? 'Remove from Shelf' : 'Add to Shelf'}
                        </CustomButton>
                        {shelfAction && <p style={{color: 'green'}}>{shelfAction === 'added' ? 'Book added!' : 'Book removed!'}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
export default BookDetails;