import React from 'react';
import Navigation from "../../components/Navigation/Navigation.jsx";
import FetchRandomNewBooks from "./FetchRandomNewBooks.jsx";

function TrendingHome () {
    return (
        <div>
            <FetchRandomNewBooks/>
        </div>
    );
}

export default TrendingHome;