import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PopularPage from "../pages/PopularPage";
import SearchPage from "../pages/SearchPage";
import WishlistPage from "../pages/WishlistPage";
import AuthPage from "../pages/AuthPage";

const AppRouter: React.FC = () => {
    // 나중에 여기서 로그인 여부 체크해서 보호 라우트도 만들 수 있음
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/signin" element={<AuthPage />} />
            {/* 잘못된 주소 => 홈으로 */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;