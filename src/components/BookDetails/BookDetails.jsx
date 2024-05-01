import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useShelf } from "../../pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";
import styles from '../BookDetails/BookDetails.module.css';
import BookCoverInfo from "./BookDetailsComponents/BookCoverInfo.jsx";
import BookDetailsSection from "./BookDetailsComponents/BookDetailsSection.jsx";
import BookDescription from "./BookDetailsComponents/BookDescription.jsx";
import ShelfActionButtons from "./BookDetailsComponents/ShelfActionButtons.jsx";

const BookDetails = () => {
    const { workId } = useParams();
    const [workData, setWorkData] = useState(null);
    const [editions, setEditions] = useState(null);
    const [loading, setLoading] = useState(true);
    const { myBookshelf, addToMyBookshelf, removeFromMyBookshelf } = useShelf();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const workResponse = await axios.get(`https://openlibrary.org/works/${workId}.json`);
                setWorkData(workResponse.data);
                const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
                setEditions(editionsResponse.data.entries);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [workId]);

    // Memoizing the computation of compiledDetails
    const compiledDetails = useMemo(() => {
        if (!workData || !editions) return null;

        const firstEditionWithCover = editions.find(edition => edition.covers && edition.covers.length > 0) || editions[0];
        return {
            title: workData.title,
            authors: workData.authors ? workData.authors.map(author => author.name).join(', ') : 'N/A', // assuming authors array has name property
            coverId: firstEditionWithCover.covers ? firstEditionWithCover.covers[0] : undefined,
            publisher: firstEditionWithCover.publishers ? firstEditionWithCover.publishers.join(', ') : 'N/A',
            publishDate: firstEditionWithCover.publish_date,
            pageCount: firstEditionWithCover.number_of_pages,
            language: firstEditionWithCover.languages ? firstEditionWithCover.languages.map(lang => lang.key.split('/').pop()).join(', ') : 'N/A',
            subjects: workData.subjects ? workData.subjects.join(', ') : 'N/A',
            description: workData.description ? (typeof workData.description === 'string' ? workData.description : workData.description.value) : 'N/A',
        };
    }, [workData, editions]);

    if (loading) return <div className={styles.bookDetailsContainer}>Loading...</div>;
    if (!compiledDetails) return <div className={styles.bookDetailsContainer}>Book details not found.</div>;

    return (
        <div className={styles.bookDetailsContainer}>
            <BookCoverInfo details={compiledDetails} styles={styles}/>
            <hr className={styles.horizontalLine}/>
            <BookDetailsSection details={compiledDetails} styles={styles}/>
            <BookDescription description={compiledDetails.description} styles={styles}/>
            <ShelfActionButtons handleBack={() => navigate(-1)} shelfAction={myBookshelf.some(book => book.workId === workId) ? 'added' : 'notAdded'}/>
        </div>
    );
};

export default BookDetails;
