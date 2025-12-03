// src/router/RequireAuth.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

interface Props {
    children: React.ReactElement;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const user = getCurrentUser();
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;