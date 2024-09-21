import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../../context/auth/AuthContext';



const ProtectedRoute = ({ children }) => {
    const { logout } = useAuth();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            logout();
            return <Navigate to="/" />;
        }
        
    } catch (error) {
        logout();
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
