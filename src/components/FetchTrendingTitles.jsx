import React from 'react';
import axios from 'axios';

const FetchInput = ({ setSearchResults }) => {
    const fetchTrendingTitles = async () => {
        try {
            const response = await axios.get('https://openlibrary.org/search.json?q=&sort=downloads&limit=25');
            setSearchResults(response.data.docs.map((item) => item.title));
        } catch (error) {
            console.error('Error fetching trending titles:', error);
        }
    };

    return (
        <div>
            <button onClick={fetchTrendingTitles}>Show Me the Trends</button>
        </div>
    );
};

export default FetchInput;