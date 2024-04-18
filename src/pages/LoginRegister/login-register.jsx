import React, {useState} from 'react';
import LoginForm from "./Login.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import {Link} from "react-router-dom";
import '../../components/Navigation/Navigation.css'
import bookshelf from "../../assets/bookshelf.png"
import {useAuth} from "./LoginRegisterContext/AuthContext.jsx";
import './Login-register.css'


function LoginRegister () {
    return (
        <div className="welcome-container">
            <div className="login-container">
                <LoginForm onLogin={(email, password) => console.log (email, password)}/>
            </div>
            <p className="centered-text">
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
            {/*<div className="registration-section">*/}
            {/*    <RegistrationForm onRegister={(email, password) => console.log(email, password)}/>*/}
            {/*</div>*/}
            <div>
                <img src={bookshelf} alt="abstract bookshelf" className="centered-image" />
            </div>
        </div>
    );
}

export default LoginRegister;