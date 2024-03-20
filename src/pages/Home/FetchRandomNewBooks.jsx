import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRandomNewBooks.css';
import { Link } from 'react-router-dom';
import CustomButton from "../../components/button/Button.jsx";
import {fetchAndFilterBooks} from "../../helpers/fetchAndFilterBooks.js";

const FetchRandomNewBooks = () => {
    const [loading, setLoading] = useState(false);
    const [booksData, setBooksData] = useState([]);
    const [buttonText, setButtonText] = useState('Show me some titles');

    const loadRandomBooks = async () => {
        // Here, we call the helper function directly
        const booksToShow = await fetchAndFilterBooks(25, setLoading, setButtonText);
        setBooksData(booksToShow);
        sessionStorage.setItem('recentBooksData', JSON.stringify(booksToShow));
        setLoading(false); // Ensure loading is set to false after fetching
        setButtonText('Show me some titles'); // Reset button text
    };

    useEffect(() => {
        const storedBooksData = sessionStorage.getItem('recentBooksData');
        if (!storedBooksData) {
            loadRandomBooks();
        } else {
            setBooksData(JSON.parse(storedBooksData));
        }
    }, []);

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
            <CustomButton onClick={() => { sessionStorage.removeItem('recentBooksData'); loadRandomBooks(); }} disabled={loading}>
                {buttonText}
            </CustomButton>
            <div className="bookCardContainer">
                {bookCards}
            </div>
        </div>
    );
};

export default FetchRandomNewBooks;