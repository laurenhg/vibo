import React, { useState } from 'react';
import axios from 'axios';
import './FetchRandomNewBooks.css'

const FetchRandomNewBooks = () => {
    const [loading, setLoading] = useState(false);
    const [recentBooks, setRecentBooks] = useState([]);

    const fetchRandomNewBooks = async () => {
        setLoading(true);
        try {
            // Generate a random value for the sort parameter
            const randomSort = Math.random() < 0.5 ? 'random' : 'random1';
            const response = await axios.get('https://openlibrary.org/search.json', {
                params: {
                    q: '*',
                    sort: randomSort,
                    limit: 25,
                    publish_date: '[2020 TO *]', // This filters books published in 2023 or later
                    lang: 'en' // Filter by English language
                }
            });

            // Filter out titles that are not in English and do not have a cover
            const filteredBooks = response.data.docs.filter(book => book.language && book.language.includes('eng') && book.cover_i);

            // Map each book to a book card component
            const bookCards = filteredBooks.map(book => (
                <div key={book.key} className="bookCard">
                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title}className="bookCover"/>
                    <p className="bookTitle">{book.title}</p>
                </div>
            ));

            setRecentBooks(bookCards);
        } catch (error) {
            console.error('Error fetching recent books:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchRandomNewBooks} disabled={loading}>
                {loading ? 'Loading...' : 'Show me some titles'}
            </button>
            <div className="bookCardContainer">
                {recentBooks}
            </div>
        </div>
    );
};

export default FetchRandomNewBooks;
