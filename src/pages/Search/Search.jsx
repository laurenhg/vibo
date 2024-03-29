import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [searchParams, setSearchParams] = useState({
        subject: '',
        keyword: '',
        author: '',
        excludeAuthor: '',
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setSearchParams(prevParams => ({ ...prevParams, [e.target.name]: e.target.value }));
        setErrorMessage('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(searchParams.author.trim().toLowerCase()=== searchParams.excludeAuthor.trim().toLowerCase()&& searchParams.author.trim()) {
            setErrorMessage('Please ensure that the "Author" and "Exclude Author" fields do not contain the same name');
            return;
        }
        setLoading(true);
        let queryParts = [];
        if (searchParams.keyword) queryParts.push(`q=${encodeURIComponent(searchParams.keyword)}`);
        if (searchParams.author) queryParts.push(`author=${encodeURIComponent(searchParams.author)}`);
        if (searchParams.subject) queryParts.push(`subject=${encodeURIComponent(searchParams.subject)}`);
        const query = `https://openlibrary.org/search.json?${queryParts.join('&')}&limit=10`;

        try {
            const { data } = await axios.get(query);
            const filteredResults = searchParams.excludeAuthor.trim() ?
                data.docs.filter(book =>
                    !(book.author_name || []).some(author =>
                        author.toLowerCase().includes(searchParams.excludeAuthor.toLowerCase())
                    )
                ) : data.docs;
            setResults(filteredResults);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="subject" placeholder="Subject" onChange={handleChange} value={searchParams.subject} />
                <input type="text" name="keyword" placeholder="Keyword" onChange={handleChange} value={searchParams.keyword} />
                <input type="text" name="author" placeholder="Author" onChange={handleChange} value={searchParams.author} />
                <input type="text" name="excludeAuthor" placeholder="Exclude Author" onChange={handleChange} value={searchParams.excludeAuthor} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>
            <div>
                {results.map((book, index) => (
                    <div key={index}>
                        <p>Title: {book.title}</p>
                        <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                        <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'path/to/placeholder.jpg'} alt="Book cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;