import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./components/Authentication/AuthContext.jsx";
import { BookProvider } from "./pages/Home/HomeContext/BookContext.jsx";
import LoginRegister from "./pages/LoginRegister/login-register.jsx";
import TrendingHome from "./pages/Home/TrendingHome.jsx";
import LayoutWithNav from "./components/Navigation/LayoutWithNav.jsx";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import MyBookshelf from "./pages/MyBookshelf/MyBookshelf.jsx";
import Search from "./pages/Search/Search.jsx";
import AuthorPortal from "./pages/AuthorPortal/AuthorPortal.jsx";
import RegistrationForm from "./pages/LoginRegister/Register/RegistrationForm.jsx";
import PrivateRoute from "./components/Authentication/PrivateRoute.jsx";
import { MyBookshelfProvider} from "./pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";
import AuthorCard from "./components/AuthorCard/AuthorCard.jsx";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings.jsx";
function App() {
    return (
        <AuthProvider>
            <BookProvider>
                <MyBookshelfProvider>
                    <Routes>
                        <Route path="/" element={<LoginRegister />} />
                        <Route path="/login" element={<LoginRegister />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/TrendingHome" element={<PrivateRoute children={<LayoutWithNav><TrendingHome /></LayoutWithNav>} />} />
                        <Route path="/search" element={<PrivateRoute children={<LayoutWithNav><Search /></LayoutWithNav>} />} />
                        <Route path="/MyBookshelf" element={<PrivateRoute children={<LayoutWithNav><MyBookshelf /></LayoutWithNav>} />} />
                        <Route path="/AuthorPortal" element={<PrivateRoute children={<LayoutWithNav><AuthorPortal /></LayoutWithNav>} />} />
                        <Route path="/authors/:authorId" element={<LayoutWithNav><AuthorCard /></LayoutWithNav>} />
                        <Route path="/new-books" element={<PrivateRoute children={<LayoutWithNav><TrendingHome /></LayoutWithNav>} />} />
                        <Route path="/bookDetails/:workId" element={<PrivateRoute children={<LayoutWithNav><BookDetails /></LayoutWithNav>} />} />
                        <Route path="/book/:id" element={<PrivateRoute children={<LayoutWithNav><BookDetails /></LayoutWithNav>} />} />
                        <Route path="/profile" element={<PrivateRoute children={<LayoutWithNav><ProfileSettings /></LayoutWithNav>} />} />
                    </Routes>
                </MyBookshelfProvider>
            </BookProvider>
        </AuthProvider>
    );
}

export default App;