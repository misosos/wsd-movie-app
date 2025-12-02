// src/components/layout/Header.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo" onClick={() => navigate("/")}>
                    WSDflix
                </div>

                <nav className="header__nav">
                    <NavLink to="/">홈</NavLink>
                    <NavLink to="/popular">대세 콘텐츠</NavLink>
                    <NavLink to="/search">찾아보기</NavLink>
                    <NavLink to="/wishlist">내가 찜한 리스트</NavLink>
                </nav>

                <div className="header__right">
                    {isLoggedIn ? (
                        <>
                            <span className="header__user">{user?.email}</span>
                            <button onClick={logout}>로그아웃</button>
                        </>
                    ) : (
                        <button onClick={() => navigate("/signin")}>로그인</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;