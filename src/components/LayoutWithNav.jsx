import React from 'react';
import Navigation from "./Navigation.jsx";

const LayoutWithNav = ({children}) => {
    return (
        <>
        <Navigation />
            <div>{children} </div>
            </>
    );
}

export default LayoutWithNav