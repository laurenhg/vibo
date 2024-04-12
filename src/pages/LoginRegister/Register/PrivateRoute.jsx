import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../LoginRegisterContext/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;