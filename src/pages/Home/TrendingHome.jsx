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

// import React from 'react';
// import Collections from "./Collections.jsx";
// import topicCollections from "./collectionsConfig.js";
//
// const TrendingHome = () => {
//     return (
//         <div>
//             {topicCollections.map((collection) => (
//                 <Collections key={collection.title} title={collection.title} query={collection.query}/>
//             ))}
//         </div>
//     );
// };
export default TrendingHome;