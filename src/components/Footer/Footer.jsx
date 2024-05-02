import React from 'react';
import styles from '../Footer/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>

            <div className={styles.footerBottom}>
                &copy; 2024 ViBo | Designed by Lauren Gilbert
            </div>
        </footer>
    );
};

export default Footer;