import React, { createContext, useContext, useState, useEffect } from "react";
import {useAuth} from "../../../components/Authentication/AuthContext.jsx";

const MyBookshelfContext = createContext({
    myBookshelf: [],
    addToMyBookshelf: () => {},
    removeFromMyBookshelf: () => {}
});

export const useShelf = () => useContext(MyBookshelfContext);

export const MyBookshelfProvider = ({ children }) => {
    const { user } = useAuth();  // Get the user from AuthContext
    const [myBookshelf, setMyBookshelf] = useState([]);

    // Compose a key for localStorage based on the user's identifier
    const localStorageKey = user ? `myBookshelf-${user.sub}` : 'myBookshelf';

    useEffect(() => {
        console.log("User on load:", user);
        console.log("Local Storage Key:", localStorageKey);
        // Load the bookshelf data from localStorage only if a user is logged in
        const loadBookshelf = () => {
            const storedData = localStorage.getItem(localStorageKey);
            if (storedData) {
                console.log("Loading bookshelf from localStorage:", storedData);
                setMyBookshelf(JSON.parse(storedData));
            } else {
                console.log("No bookshelf data found in localStorage.");
                setMyBookshelf([]);
            }
        };
        loadBookshelf();
    }, [user, localStorageKey]);

    useEffect(() => {
        // Save the bookshelf to localStorage whenever it changes, but only if a user is logged in
        if (user) {
            console.log("Saving bookshelf to localStorage for key:", localStorageKey, myBookshelf);
            localStorage.setItem(localStorageKey, JSON.stringify(myBookshelf));
        }
    }, [myBookshelf, user, localStorageKey]);

    const addToMyBookshelf = (book) => {
        if (!myBookshelf.some(b => b.workId === book.workId)) {
            const updatedShelf = [...myBookshelf, book];
            setMyBookshelf(updatedShelf);
            console.log("Added book to bookshelf:", book);
        }
    };

    const removeFromMyBookshelf = (workId) => {
        const updatedShelf = myBookshelf.filter(book => book.workId !== workId);
        setMyBookshelf(updatedShelf);
        console.log("Removed book from bookshelf, workId:", workId);
    };

    return (
        <MyBookshelfContext.Provider value={{ myBookshelf, addToMyBookshelf, removeFromMyBookshelf }}>
            {children}
        </MyBookshelfContext.Provider>
    );
};

export default MyBookshelfContext;