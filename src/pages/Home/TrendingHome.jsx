import React from 'react';
import Navigation from "../../components/Navigation/Navigation.jsx";
import FetchRandomNewBooksHome from "./FetchRandomNewBooksHome.jsx";
import bookshelf from '../../assets/bookshelf.png'

function TrendingHome () {
    return (
        <div className="trending-home-container">
            {/*<Navigation/>*/}
            <main className="fetch-random-new-titles">
            <FetchRandomNewBooksHome/>
            </main>
            {/*<Footer>*/}
            {/*    <p>This is a footer</p>*/}
            {/*</Footer>*/}
        </div>
    );
}


export default TrendingHome;