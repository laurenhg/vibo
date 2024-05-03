import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useShelf } from "../../pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";
import BookCoverInfo from "./BookDetailsComponents/BookCoverInfo.jsx";
import BookDetailsSection from "./BookDetailsComponents/BookDetailsSection.jsx";
import BookDescription from "./BookDetailsComponents/BookDescription.jsx";
import ShelfActionButtons from "./BookDetailsComponents/ShelfActionButtons.jsx";
import styles from '../BookDetails/BookDetails.module.css';
import { useQuery } from 'react-query';

const BookDetails = () => {
    const { workId } = useParams();
    const { myBookshelf, addToMyBookshelf, removeFromMyBookshelf } = useShelf();
    const navigate = useNavigate();

    const fetchBookDetails = async () => {
        try {
            const workResponse = await axios.get(`https://openlibrary.org/works/${workId}.json`);
            const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
            const editions = editionsResponse.data.entries;
            const firstEditionWithCover = editions.find(edition => edition.covers && edition.covers.length > 0) || editions[0];

            // Fetch author names using the Authors API
            const authorNames = await Promise.all(
                (workResponse.data.authors || []).map(async (author) => {
                    if (!author.author.key) return 'N/A'; // Guard clause in case the key is missing
                    const authorResponse = await axios.get(`https://openlibrary.org${author.author.key}.json`);
                    return authorResponse.data.name; // Assume the response structure includes a 'name' field
                })
            );

            return {
                title: workResponse.data.title,
                authors: authorNames.join(', ') || 'N/A',
                coverId: firstEditionWithCover.covers ? firstEditionWithCover.covers[0] : undefined,
                publisher: firstEditionWithCover.publishers ? firstEditionWithCover.publishers.join(', ') : 'N/A',
                publishDate: firstEditionWithCover.publish_date,
                pageCount: firstEditionWithCover.number_of_pages,
                language: firstEditionWithCover.languages ? firstEditionWithCover.languages.map(lang => lang.key.split('/').pop()).join(', ') : 'N/A',
                subjects: workResponse.data.subjects ? workResponse.data.subjects.join(', ') : 'N/A',
                description: workResponse.data.description ? (typeof workResponse.data.description === 'string' ? workResponse.data.description : workResponse.data.description.value) : 'N/A',
            };
        } catch (error) {
            console.error('Error fetching book details:', error);
            throw error; // rethrow the error to be handled by useQuery onError
        }
    };

    const {
        data: details,
        error,
        isLoading
    } = useQuery(['bookDetails', workId], fetchBookDetails, {
        staleTime: 6000000,
        cacheTime: 900000,
        retry: false, // To manage retry behavior
        onError: (err) => {
            console.error('Error fetching book details:', err);
        }
    });

    const handleBack = () => navigate(-1);

    const toggleShelf = () => {
        const bookIsOnShelf = myBookshelf.some(book => book.workId === workId);
        if (bookIsOnShelf) {
            removeFromMyBookshelf(workId);
        } else {
            addToMyBookshelf({ ...details, workId });
        }
    };

    if (isLoading) return <div className={styles.bookDetailsContainer}>Loading...</div>;
    if (error) return <div className={styles.bookDetailsContainer}>Error fetching book details.</div>;
    if (!details) return <div className={styles.bookDetailsContainer}>Book details not found.</div>;

    return (
        <div className={styles.bookDetailsContainer}>
            <BookCoverInfo details={details} styles={styles}/>
            <hr className={styles.horizontalLine}/>
            <BookDetailsSection details={details} styles={styles}/>
            <BookDescription description={details.description} styles={styles}/>
            <ShelfActionButtons handleBack={handleBack} toggleShelf={toggleShelf} shelfAction={myBookshelf.some(book => book.workId === workId) ? 'added' : 'notAdded'}/>
        </div>
    );
};

export default BookDetails;