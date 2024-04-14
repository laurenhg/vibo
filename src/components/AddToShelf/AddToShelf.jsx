import React, { useState } from 'react';
import {useShelf} from "../../pages/MyBookshelf/MyBookShelfContext/MyBookshelfContext.jsx";

const AddShelfForm = () => {
    const [shelfName, setShelfName] = useState('');
    const { addShelf } = useShelf();

    const handleSubmit = (event) => {
        event.preventDefault();
        addShelf(shelfName);
        setShelfName(''); // Reset input after adding
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={shelfName}
                onChange={e => setShelfName(e.target.value)}
                placeholder="New Shelf Name"
            />
            <button type="submit">Add Shelf</button>
        </form>
    );
};

export default AddShelfForm;