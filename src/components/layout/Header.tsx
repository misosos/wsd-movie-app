// src/components/layout/Header.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <header className="header h-16 bg-slate-900/80 backdrop-blur sticky top-0 z-20 border-b border-slate-800">
            <div className="header__inner mx-auto flex h-full max-w-5xl items-center justify-between px-4">
                <div
                    className="header__logo text-xl font-bold text-emerald-400 cursor-pointer select-none"
                    onClick={() => navigate("/")}
                >
                    WSD<span className="text-slate-100">flix</span>
                </div>

                <nav className="header__nav flex items-center gap-4 text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            "transition hover:text-white " +
                            (isActive ? "text-emerald-400" : "text-slate-300")
                        }
                    >
                        홈
                    </NavLink>
                    <NavLink
                        to="/popular"
                        className={({ isActive }) =>
                            "transition hover:text-white " +
                            (isActive ? "text-emerald-400" : "text-slate-300")
                        }
                    >
                        대세 콘텐츠
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            "transition hover:text-white " +
                            (isActive ? "text-emerald-400" : "text-slate-300")
                        }
                    >
                        찾아보기
                    </NavLink>
                    <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>
                            "transition hover:text-white " +
                            (isActive ? "text-emerald-400" : "text-slate-300")
                        }
                    >
=======
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("wsd_user"); // 나중에 useAuth로 교체

    return (
        <header className="header">
            <div className="header__inner">
                <div
                    className="header__logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    WSDflix
                </div>

                <nav className="header__nav">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                        홈
                    </NavLink>
                    <NavLink to="/popular" className={({ isActive }) => (isActive ? "active" : "")}>
                        대세 콘텐츠
                    </NavLink>
                    <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
                        찾아보기
                    </NavLink>
                    <NavLink to="/wishlist" className={({ isActive }) => (isActive ? "active" : "")}>
                        내가 찜한 리스트
                    </NavLink>
                </nav>

                <div className="header__right flex items-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <span className="header__user max-w-[160px] truncate text-xs text-slate-300">
                                {user?.email}
                            </span>
                            <button
                                onClick={() => {
                                    logout();           // 상태/로컬스토리지 초기화
                                    navigate("/signin"); // 즉시 로그인 페이지로 이동
                                }}
                                className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-100 hover:bg-slate-800 transition"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate("/signin")}
                            className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-emerald-400 transition shadow"
                        >
                            로그인
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;