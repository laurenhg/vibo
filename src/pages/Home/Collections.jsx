// import React, { useState, useEffect } from "react";
// import axios from 'axios';
//
// const Collections = ({ title, query }) => {
//     const [books, setBooks] = useState([]);
//
//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get('https://openlibrary.org/search.json', {
//                     params: query,
//                 });
//                 const filteredBooks = response.data.docs.filter(doc => doc.cover_i && doc.language === 'eng');
//                 setBooks(filteredBooks.slice(0, 25));
//             } catch (error) {
//                 console.error('Error fetching books for collection:', title, error);
//             }
//         };
//
//         fetchBooks();
//     }, [query, title]); // Corrected dependency array syntax
//
//     if (books.length === 0) return <div>Loading {title}...</div>;
//     console.log(response.data.docs);
//
//     return (
//         <div>
//             <h3>{title}</h3>
//             <div className="books">
//                 {books.map((book, index) => (
//                     <div key={index} className="book">
//                         {/* Render book details */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Collections;