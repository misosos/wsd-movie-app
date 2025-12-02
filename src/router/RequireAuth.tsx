// src/router/RequireAuth.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
    children: React.ReactElement;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        // 로그인 안 되어 있으면 /signin으로 이동
        return <Navigate to="/signin" replace state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;