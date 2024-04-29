import React from 'react';
import CustomButton from "../../button/Button.jsx";

const ShelfActionButtons = ({ handleBack, toggleShelf, shelfAction }) => (
    <div style={{marginTop: '20px'}}>
        <CustomButton onClick={handleBack} className="button-normal">Back</CustomButton>
        <CustomButton onClick={toggleShelf} className={shelfAction === 'added' ? 'button-added' : 'button-normal'}>
            {shelfAction === 'added' ? 'Remove from Shelf' : 'Add to Shelf'}
        </CustomButton>
        {shelfAction === 'added' && <p className="book-added">Book added!</p>}
        {shelfAction === 'removed' && <p className="book-removed">Book removed!</p>}
    </div>
);

export default ShelfActionButtons;