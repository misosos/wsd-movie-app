import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactElement;
}

export default function RequireAuth({ children } : Props ) {
    const { isLoggedIn } = useAuth();  // 컨텍스트에서 로그인 상태 읽기
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace state={{ from: location }} />;
    }

    return children;
};