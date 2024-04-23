import React, { createContext, useContext, useState, useEffect } from "react";
import {useAuth} from "../../LoginRegister/LoginRegisterContext/AuthContext.jsx";

const MyBookshelfContext = createContext({
    myBookshelf: [],
    addToMyBookshelf: () => {},
    removeFromMyBookshelf: () => {}
});

export const useShelf = () => useContext(MyBookshelfContext);

export const MyBookshelfProvider = ({children}) => {
    const { user } = useAuth();  // Get the user from AuthContext
    const [myBookshelf, setMyBookshelf] = useState([]);

    // Compose a key for localStorage based on the user's identifier
    const localStorageKey = user ? `myBookshelf-${user.sub}` : 'myBookshelf';

    useEffect(() => {
        // Load the bookshelf data from localStorage only if a user is logged in
        const loadBookshelf = () => {
            if (user) {
                const storedData = localStorage.getItem(localStorageKey);
                if (storedData) {
                    setMyBookshelf(JSON.parse(storedData));
                }
            }
        };
        loadBookshelf();
    }, [user, localStorageKey]);

    useEffect(() => {
        // Save the bookshelf to localStorage whenever it changes, but only if a user is logged in
        if (user) {
            localStorage.setItem(localStorageKey, JSON.stringify(myBookshelf));
        }
    }, [myBookshelf, user, localStorageKey]);

    const addToMyBookshelf = (book) => {
        if (!myBookshelf.some(b => b.workId === book.workId)) {
            setMyBookshelf(prevShelf => [...prevShelf, book]);
        }
    };

    const removeFromMyBookshelf = (workId) => {
        setMyBookshelf(prevShelf => prevShelf.filter(book => book.workId !== workId));
    };

    return (
        <MyBookshelfContext.Provider value={{ myBookshelf, addToMyBookshelf, removeFromMyBookshelf }}>
            {children}
        </MyBookshelfContext.Provider>
    );
};

export default MyBookshelfContext;