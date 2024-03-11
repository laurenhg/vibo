import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRandomNewBooks.css';
import {Link} from 'react-router-dom'

const FetchRandomNewBooks = () => {
    const [loading, setLoading] = useState(false);
    const [recentBooks, setRecentBooks] = useState([]);

    const loadRandomBooks = async () => {
        setLoading(true);
        let accumulatedBooks = [];
        const targetBookCount = 25;
        let attempts = 0;
        const maxAttempts = 5; // Adjust based on your testing

        while (accumulatedBooks.length < targetBookCount && attempts < maxAttempts) {
            attempts++;
            try {
                const randomSort = Math.random() < 0.5 ? 'random' : 'random1';
                const response = await axios.get('https://openlibrary.org/search.json', {
                    params: {
                        q: '*',
                        sort: randomSort,
                        limit: 100, // Try fetching more books in one go
                        publish_date: '[2020 TO *]',
                        lang: 'en',
                    },
                });

                const newFilteredBooks = response.data.docs.filter(book => book.language && book.language.includes('eng') && book.cover_i);
                accumulatedBooks = [...accumulatedBooks, ...newFilteredBooks].slice(0, targetBookCount);

                // Break the loop if no new books are found in the current attempt
                if (newFilteredBooks.length === 0) break;

            } catch (error) {
                console.error('Error fetching recent books:', error);
                // Optionally implement a more sophisticated retry logic here
            }
        }

        const uniqueBooks = accumulatedBooks.filter((book, index, self) =>
            index === self.findIndex((t) => t.key === book.key)
        );

        const bookCards = uniqueBooks.map((book, index) => (
            <div key={`${book.key}-${index}`} className="bookCard">
                <Link to={`/book/${book.key.replace('/works/', '')}`}>
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="bookCover"/>
                    <p className="bookTitle">{book.title}</p>
                </Link>
            </div>
        ));

        setRecentBooks(bookCards);
        setLoading(false);
    };

    useEffect(() => {
        loadRandomBooks();
    }, []);

    return (
        <div>
            <button onClick={() => loadRandomBooks()} disabled={loading}>
                {loading ? 'Loading...' : 'Show me some titles'}
            </button>
            <div className="bookCardContainer">
                {recentBooks}
            </div>
        </div>
    );
};

export default FetchRandomNewBooks;
