import React, { createContext, useContext, useState, useEffect} from "react";


const MyBookshelfContext = createContext({
    myBookshelf: [],
    addToMyBookshelf: () => {},
    removeFromMyBookshelf: () => {}
});

export const useShelf = () => useContext(MyBookshelfContext);

export const MyBookshelfProvider = ({children}) => {
    const [myBookshelf, setMyBookshelf] = useState(() => {
        // Retrieve the shelf from local storage initially
        const localData = localStorage.getItem('myBookshelf');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        // Persist the shelf to local storage whenever it changes
        localStorage.setItem('myBookshelf', JSON.stringify(myBookshelf));
    }, [myBookshelf]);


    const addToMyBookshelf = (book) => {
        console.log("Before adding:", myBookshelf);
        if (!myBookshelf.find(b => b.workId === book.workId)) {
            setMyBookshelf([...myBookshelf, book]);
            console.log("After adding:", [...myBookshelf, book])
        }
    };

    const removeFromMyBookshelf = (workId) => {
        setMyBookshelf(myBookshelf.filter(book => book.workId !== workId));
    };

    return (
        <MyBookshelfContext.Provider value ={{myBookshelf, addToMyBookshelf, removeFromMyBookshelf}}>
            {children}
        </MyBookshelfContext.Provider>

    );
};

export default MyBookshelfContext;