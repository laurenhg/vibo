import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRandomNewBooks.css';
import { Link } from 'react-router-dom';

const FetchRandomNewBooks = () => {
    const [loading, setLoading] = useState(false);
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const storedBooksData = sessionStorage.getItem('recentBooksData');
        if (storedBooksData) {
            setBooksData(JSON.parse(storedBooksData));
        } else {
            loadRandomBooks();
        }
    }, []);

    const loadRandomBooks = async () => {
        setLoading(true);
        let accumulatedBooks = [];
        const targetBookCount = 25;
        let attempts = 0;
        const maxAttempts = 5;

        while (accumulatedBooks.length < targetBookCount && attempts < maxAttempts) {
            attempts++;
            try {
                const randomSort = Math.random() < 0.5 ? 'random' : 'random1';
                const response = await axios.get('https://openlibrary.org/search.json', {
                    params: {
                        q: '*',
                        sort: randomSort,
                        limit: 100, // Fetch more books in one go to increase the chance of finding unique books
                        lang: 'en',
                    },
                });

                // Filter books with English language and a cover image
                const newFilteredBooks = response.data.docs.filter(book => book.language && book.language.includes('eng') && book.cover_i);

                // Remove duplicates from the accumulated books
                const uniqueNewFilteredBooks = newFilteredBooks.filter(newBook => !accumulatedBooks.some(accBook => accBook.key === newBook.key));

                // Accumulate unique books
                accumulatedBooks = [...accumulatedBooks, ...uniqueNewFilteredBooks].slice(0, targetBookCount);

                if (newFilteredBooks.length === 0) break;
            } catch (error) {
                console.error('Error fetching recent books:', error);
            }
        }

        // Update the state with the accumulated unique books
        setBooksData(accumulatedBooks);
        sessionStorage.setItem('recentBooksData', JSON.stringify(accumulatedBooks));
        setLoading(false);
    };

    // Render book cards from the unique books data
    const bookCards = booksData.map((book, index) => (
        <div key={`${book.key}-${index}`} className="bookCard">
            <Link to={`/book/${book.key.replace('/works/', '')}`}>
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="bookCover"/>
                <p className="bookTitle">{book.title}</p>
            </Link>
        </div>
    ));

    return (
        <div>
            <button onClick={() => { sessionStorage.removeItem('recentBooksData'); loadRandomBooks(); }} disabled={loading}>
                {loading ? 'Loading...' : 'Show me some titles'}
            </button>
            <div className="bookCardContainer">
                {bookCards}
            </div>
        </div>
    );
};

export default FetchRandomNewBooks;