import React from 'react';
import styles from '../button/Button.module.css'
import bookIcon from '../../assets/open-book.png'

const CustomButton = ({ onClick, children, disabled, className }) => {
    return (
        <button className={`${styles.customButton} ${className}`} onClick={onClick} disabled={disabled}>
            <div className={styles.buttonIcon}>
                <img src={bookIcon} alt="Book Icon"/>
            </div>
            <div className={styles.buttonText}>
                {children}
            </div>
        </button>
    );
}

export default CustomButton;