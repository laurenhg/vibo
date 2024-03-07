import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../pages/LoginRegister/Login-register.css'

function RegistrationForm ({onRegister}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Whoops! Your passwords don't match");
            return;
        }
        onRegister(email, password);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        alert("Thanks for registering. Please check your email to confirm your account and then log-in!")

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label htmlFor="registerEmail">Email:</label>
                <input type="email"
                       id="registerEmail"
                       name="email"
                       value={email} onChange={(e) => setEmail(e.target.value)}
                       required
                       placeholder="Enter your email"
                       autoComplete="email"
                />
            </div>
            <div>
                <label htmlFor="registerPassword">Password:</label>
                <input type="password"
                       id="registerPassword"
                       name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       placeholder="Create your password"
                       autoComplete="new-password"

                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password"
                       id="confirmPassword"
                       name="confirmPassword"
                       value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                       required
                       placeholder="re-type your password"
                       autoComplete="new-password"

                />
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit">Sign-Up</button>
        </form>
    );
}

    export default RegistrationForm;