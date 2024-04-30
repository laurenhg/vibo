import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useShelf } from "../../pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";
import styles from '../BookDetails/BookDetails.module.css'
import BookCoverInfo from "./BookDetailsComponents/BookCoverInfo.jsx";
import BookDetailsSection from "./BookDetailsComponents/BookDetailsSection.jsx";
import BookDescription from "./BookDetailsComponents/BookDescription.jsx";
import ShelfActionButtons from "./BookDetailsComponents/ShelfActionButtons.jsx";


const BookDetails = () => {
    const { workId } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shelfAction, setShelfAction] = useState('');
    const { myBookshelf, addToMyBookshelf, removeFromMyBookshelf } = useShelf();
    const navigate = useNavigate();

    console.log(styles);

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const workResponse = await axios.get(`https://openlibrary.org/works/${workId}.json`);
                const workData = workResponse.data;

                const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
                const editions = editionsResponse.data.entries;

                const firstEditionWithCover = editions.find(edition => edition.covers && edition.covers.length > 0) || editions[0];

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
                    description: workData.description ? (typeof workData.description === 'string' ? workData.description : workData.description.value) : 'N/A',
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

    const handleBack = () => navigate(-1);

    const toggleShelf = () => {
        const bookIsOnShelf = myBookshelf.some(book => book.workId === workId);
        if (bookIsOnShelf) {
            removeFromMyBookshelf(workId);
            setShelfAction('removed');
        } else {
            if (details) {
                addToMyBookshelf({ ...details, workId });
                setShelfAction('added');
            }
        }

    };

    if (loading) return <div className={styles.bookDetailsContainer}>Loading...</div>;
    if (!details) return <div className={styles.bookDetailsContainer}>Book details not found.</div>;

    return (
        <div className={styles.bookDetailsContainer}>
            <BookCoverInfo details={details} styles={styles}/>
            <hr className={styles.horizontalLine}/>
            <BookDetailsSection details={details} styles={styles}/>
            <BookDescription description={details.description} styles={styles}/>
            <ShelfActionButtons handleBack={handleBack} toggleShelf={toggleShelf} shelfAction={shelfAction}/>
        </div>
    );
};

export default BookDetails;