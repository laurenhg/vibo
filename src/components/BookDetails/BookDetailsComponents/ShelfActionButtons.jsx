import React from 'react';
import CustomButton from "../../button/Button.jsx";

const ShelfActionButtons = ({ handleBack, toggleShelf, shelfAction }) => (
    <div style={{marginTop: '20px'}}>
        <CustomButton onClick={handleBack} className="button-normal">Back</CustomButton>
        <CustomButton onClick={toggleShelf} className={shelfAction === 'added' ? 'button-added' : 'button-normal'}>
            {shelfAction === 'added' ? 'Remove from Shelf' : 'Add to Shelf'}
        </CustomButton>
        {shelfAction && <p style={{color: 'green'}}>{shelfAction === 'added' ? 'Book added!' : 'Book removed!'}</p>}
    </div>
);

export default ShelfActionButtons;