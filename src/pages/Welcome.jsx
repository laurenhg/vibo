import React, {useState} from 'react';
import LoginForm from "../components/Login.jsx";
import RegistrationForm from "../components/RegistrationForm.jsx";
import '../styles/Navigation.css'
import bookshelf from "../assets/bookshelf.png"




function Welcome () {
    return (
        <div className="welcome-container">
            <div className="login-container">
                <LoginForm onLogin={(email, password) => console.log (email, password)}/>
            </div>
            <div className="registration-section">
                <RegistrationForm onRegister={(email, password) => console.log(email, password)}/>
            </div>
            <div>
                <img src={bookshelf} alt="abstract bookshelf" className="image"/>
            </div>
        </div>
    )
}

export default Welcome;