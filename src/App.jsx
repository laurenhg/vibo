import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from "./pages/LoginRegister/login-register.jsx";
import "../src/App.css";
import Home from "./pages/Home/Home.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import LayoutWithNav from "./components/Navigation/LayoutWithNav.jsx";


// import AccountSettings from './'


function App () {
    const handleLogin = async (email, password) => {
        console.log ("Login Attempt with:", email, password);
    //     Here, implement logic for verifying credentials.
    //     This could be a call to backend
    };
    return (

            <Routes>
                <Route path="/" element={<LoginRegister/>}/>
                <Route path="/Home" element={<LayoutWithNav><Home /></LayoutWithNav>}/>
                <Route path="/search" element={<LayoutWithNav><SearchInput/></LayoutWithNav>} />
            </Routes>

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