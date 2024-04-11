// import React, { useState } from 'react';
// import {useNavigate} from "react-router-dom";
// import {useAuth} from "../LoginRegisterContext/AuthContext.jsx";
//
//
// function RegistrationPage() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [confirmEmail, setConfirmEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const { register } = useAuth();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (email !== confirmEmail) {
//             alert("Emails don't match!");
//             return;
//         }
//         if (password !== confirmPassword) {
//             alert("Passwords don't match!");
//             return;
//         }
//
//         const registrationSuccess = await register(username, email, password);
//         if(registrationSuccess) {
//             navigate('/login');
//         }else {
//             alert("Registration failed! Please try again");
//         }
//
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Name" required />
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//             <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder="Confirm Email" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
//
// export default RegistrationPage;