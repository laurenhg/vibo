import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./pages/LoginRegister/LoginRegisterContext/AuthContext.jsx";
import { BookProvider } from "./pages/Home/HomeContext/BookContext.jsx";
import LoginRegister from "./pages/LoginRegister/login-register.jsx";
import TrendingHome from "./pages/Home/TrendingHome.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import LayoutWithNav from "./components/Navigation/LayoutWithNav.jsx";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import FetchRandomNewBooksHome from "./pages/Home/FetchRandomNewBooksHome.jsx";
import MyBookshelf from "./pages/MyBookshelf/MyBookshelf.jsx";
import Search from "./pages/Search/Search.jsx";
import AuthorPortal from "./pages/AuthorPortal/AuthorPortal.jsx";
import BookCard from "./components/BookCard/BookCard.jsx";
import RegistrationForm from "./pages/LoginRegister/RegistrationForm.jsx";

function App() {
    const handleLogin = async (email, password) => {
        console.log("Login Attempt with:", email, password);
        // Here, implement logic for verifying credentials.
        // This could be a call to backend
    };

    return (
        <AuthProvider>
            <BookProvider>
                <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/register" element={<RegistrationForm/>} />
                    <Route path="/TrendingHome" element={<LayoutWithNav><TrendingHome /></LayoutWithNav>} />
                    <Route path="/search" element={<LayoutWithNav><Search /></LayoutWithNav>} />
                    <Route path="/MyBookshelf" element={<LayoutWithNav><MyBookshelf /></LayoutWithNav>} />
                    <Route path="/AuthorPortal" element={<LayoutWithNav><AuthorPortal /></LayoutWithNav>} />
                    <Route path="/new-books" element={<LayoutWithNav><FetchRandomNewBooksHome /></LayoutWithNav>} />
                    <Route path="/bookDetails/:workId" element={<BookDetails />} />
                    <Route path="/book/:id" element={<LayoutWithNav><BookDetails /></LayoutWithNav>} />
                </Routes>
            </BookProvider>
        </AuthProvider>
    );
}

export default App;