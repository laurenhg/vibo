import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/Login.jsx";
import Welcome from "./pages/Welcome.jsx";
import "../src/App.css";
import TrendingHome from "./pages/TrendingHome.jsx";
// import AccountSettings from './'


function App () {
    const handleLogin = async (email, password) => {
        console.log ("Login Attempt with:", email, password);
    //     Here, implement logic for verifying credentials.
    //     This could be a call to backend
    };
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/TrendingHome" element={<TrendingHome/>}/>
            </Routes>
        </Router>
    );

}
//     const handleLogin = (email, password) => {
//         console.log("Login Attempt with:", email, password);
//     //     Here write my logic - such as verifying credentials
//     };
//     return (
//         <>
//             <div>
//         <Router>
//             <Routes>
//                 <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
//             </Routes>
//         </Router>
//
//             </div>
//         </>
//     )
// }

export default App;