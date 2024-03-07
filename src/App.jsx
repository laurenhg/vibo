import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from "./pages/LoginRegister/login-register.jsx";
import "../src/App.css";
import TrendingHome from "./pages/Home/TrendingHome.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import LayoutWithNav from "./components/LayoutWithNav.jsx";
import SearchInput from "./components/SearchInput.jsx";
import BookInfo from "./components/BookInfo/BookInfo.jsx";
import FetchRandomNewBooks from "./pages/Home/FetchRandomNewBooks.jsx";

function App () {
    const handleLogin = async (email, password) => {
        console.log ("Login Attempt with:", email, password);
    //     Here, implement logic for verifying credentials.
    //     This could be a call to backend
    };
    return (

            <Routes>
                <Route path="/" element={<LoginRegister/>}/>
                <Route path="/TrendingHome" element={<LayoutWithNav><TrendingHome /></LayoutWithNav>}/>
                <Route path="/search" element={<LayoutWithNav><SearchInput/></LayoutWithNav>} />
                <Route path="new-books" element={<LayoutWithNav><FetchRandomNewBooks /></LayoutWithNav>} />

                <Route path="/login" element={<LoginRegister/>}/>
                <Route path="/book/:id" element={<BookInfo/>} />
             </Routes>

    );

}
//     const handleLogin = (email, password) => {
//         console.log("Login Attempt with:", email, password);
//     //     Here write my logic - such as verifying credentials
//     };
//     return (
//         <>
//             <div>
//         <Router>
//             <Routes>
//                 <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
//             </Routes>
//         </Router>
//
//             </div>
//         </>
//     )
// }

export default App;