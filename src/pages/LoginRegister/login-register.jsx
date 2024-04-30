import React from 'react';
import LoginForm from "./Login/Login.jsx";
import { Link } from "react-router-dom";
import '../../components/Navigation/Navigation.css';
import bookshelf from "../../assets/bookshelf.png";
import styles from '../LoginRegister/Login/Login.module.css';

function LoginRegister() {
    return (
        <>
            <LoginForm />
            <p className={styles.centeredText}>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
            <div>
                <img src={bookshelf} alt="abstract bookshelf" className={styles.centeredImage} />
            </div>
        </>
    );
}

export default LoginRegister;