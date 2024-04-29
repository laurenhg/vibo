import React from 'react';
import FetchRandomNewBooksHome from "./FetchRandomNewBooksHome.jsx";
import bookshelf from '../../assets/bookshelf.png'

function TrendingHome () {
    return (
        <div className="trending-home-container">
            {/*<Navigation/>*/}
            <main className="fetch-random-new-titles">
            <FetchRandomNewBooksHome/>
            </main>

        </div>
    );
}


export default TrendingHome;