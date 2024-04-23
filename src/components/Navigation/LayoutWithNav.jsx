import React from 'react';
import Navigation from './Navigation.jsx';
import Footer from "../../pages/Footer/Footer.jsx";

const LayoutWithNav = ({ children }) => {
    return (
        <div className="layout">
            <Navigation />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutWithNav;