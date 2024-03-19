import React, { useState } from 'react';
import axios from 'axios';
import FetchInput from "./FetchTrendingTitles.jsx";

const SearchInput = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        console.log('handleSearch function called')
        try {
            const response = await axios.get(`https://openlibrary.org/search.json?limit=25`);
            setSearchResults(response.data.docs.map((item) => item.title));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="input-container">
            <button onClick={handleSearch}>Show Top 25</button>
            <div>
                <h2>Top 25 Most Searched Books:</h2>
                <ul>
                    {searchResults.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchInput;