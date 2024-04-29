import React, { createContext, useContext, useState, useEffect } from "react";
import {useAuth} from "../../../components/Authentication/AuthContext.jsx";

const MyBookshelfContext = createContext();

export const useShelf = () => useContext(MyBookshelfContext);

export const MyBookshelfProvider = ({ children }) => {
    const { user } = useAuth();
    const localStorageKey = user ? `myBookshelf-${user.sub}` : 'myBookshelf';
    const initialBookshelf = () => {
        const storedData = localStorage.getItem(localStorageKey);
        return storedData ? JSON.parse(storedData) : [];
    };
    const [myBookshelf, setMyBookshelf] = useState(initialBookshelf);

    useEffect(() => {
        console.log("Attempting to load bookshelf...");
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            console.log(`Bookshelf data found: ${storedData}`);
            setMyBookshelf(JSON.parse(storedData));
        }
    }, [user, localStorageKey]);

    useEffect(() => {
        console.log(`Saving bookshelf to localStorage for user ${user?.sub}:`, myBookshelf);
        localStorage.setItem(localStorageKey, JSON.stringify(myBookshelf));
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