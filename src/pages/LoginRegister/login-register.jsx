import React, {useState} from 'react';
import LoginForm from "./Login/Login.jsx";
import RegistrationForm from "./Register/RegistrationForm.jsx";
import {Link} from "react-router-dom";
import '../../components/Navigation/Navigation.css'
import bookshelf from "../../assets/bookshelf.png"
import {useAuth} from "../../components/Authentication/AuthContext.jsx";
import '../LoginRegister/login-register.css'


function LoginRegister() {
    return (
        <div className="welcome-container">
            <div className="login-container">
                <LoginForm/>
            </div>
            <p className="centered-text">
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
            <div>
                <img src={bookshelf} alt="abstract bookshelf" className="centered-image" />
            </div>
        </div>
    );
}

export default LoginRegister;