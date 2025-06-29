import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (isAuthenticated && user?.role === 'admin') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;