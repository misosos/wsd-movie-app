// src/components/layout/Header.tsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();
    const [showEmail, setShowEmail] = useState(false);

    const navLinkClass = ({
                              isActive,
                          }: {
        isActive: boolean;
        isPending: boolean;
    }) =>
        [
            "text-sm md:text-base transition-colors",
            isActive ? "text-white" : "text-slate-300 hover:text-white",
        ].join(" ");

    const handleLogout = () => {
        setShowEmail(false);
        logout();
        navigate("/signin");
    };

    return (
        <header className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-black/90 via-black/70 to-transparent">
            <div className="flex w-full items-center justify-between px-4 py-3 md:px-8 md:py-4">
                {/* 로고 / 서비스명 */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#e50914] text-lg font-extrabold text-white md:h-8 md:w-8">
                        W
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white md:text-2xl">
                        WSD<span className="text-[#e50914]">flix</span>
                    </span>
                </Link>

                {/* 네비게이션 */}
                <nav className="ml-4 hidden items-center gap-4 md:flex">
                    <NavLink to="/" className={navLinkClass}>
                        홈
                    </NavLink>
                    <NavLink to="/popular" className={navLinkClass}>
                        대세 콘텐츠
                    </NavLink>
                    <NavLink to="/search" className={navLinkClass}>
                        찾아보기
                    </NavLink>
                    <NavLink to="/wishlist" className={navLinkClass}>
                        내가 찜한 리스트
                    </NavLink>
                </nav>

                {/* 우측: 로그인 / 유저 정보 */}
                <div className="flex items-center gap-3">
                    {isLoggedIn && user ? (
                        <>
                            {/* 프로필 아바타 아이콘 (이메일 첫 글자, 클릭 시 아이디 토글) */}
                            <button
                                type="button"
                                onClick={() => setShowEmail((prev) => !prev)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold uppercase text-white md:h-9 md:w-9 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:ring-offset-2 focus:ring-offset-black"
                                aria-label="프로필"
                                title={user.email}
                            >
                                {user.email?.charAt(0) ?? "U"}
                            </button>
                            {showEmail && (
                                <span className="hidden max-w-[160px] truncate text-xs text-slate-200 md:inline md:text-sm">
                                    {user.email}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded bg-[#e50914] px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b20710]"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate("/signin")}
                            className="rounded bg-[#e50914] px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b20710]"
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