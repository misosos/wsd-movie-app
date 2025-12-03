import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PopularPage from "../pages/PopularPage";
import SearchPage from "../pages/SearchPage";
import WishlistPage from "../pages/WishlistPage";
import AuthPage from "../pages/AuthPage";
import RequireAuth from "./RequireAuth";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                }
            />
            <Route
                path="/popular"
                element={
                    <RequireAuth>
                        <PopularPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/search"
                element={
                    <RequireAuth>
                        <SearchPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/wishlist"
                element={
                    <RequireAuth>
                        <WishlistPage />
                    </RequireAuth>
                }
            />
            {/* 로그인/회원가입은 누구나 접근 가능 */}
            <Route path="/signin" element={<AuthPage />} />
            {/* 그 외 경로는 홈으로 */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;