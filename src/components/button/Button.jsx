import React from 'react';
import './Button.css';
import bookIcon from '../../../../untitled/src/assets/icons8-open-book-30.png';

const CustomButton = ({ onClick, children, disabled, className }) => {
    return (
        <button className={`customButton ${className}`} onClick={onClick} disabled={disabled}>
            <div className="buttonIcon">
                <img src={bookIcon} alt="Book Icon"/>
            </div>
            <div className="buttonText">
                {children}
            </div>
        </button>
    );
}

export default CustomButton;