import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default  function Header(){
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();
    const [showEmail, setShowEmail] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const navLinkClass = ({isActive,}: {
        isActive: boolean;
        isPending: boolean;
    }) =>
        [
            "relative text-sm md:text-base transition-colors pb-0.5 border-b-2 border-transparent px-2 md:px-3",
            isActive
                ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 border-b-[#e50914]"
                : "text-slate-300 hover:text-white hover:border-b-[#e50914]/80",
        ].join(" ");

    const handleNavToggle = () => {
        setIsNavOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setShowEmail(false);
        setIsNavOpen(false);
        logout();
        navigate("/signin");
    };

    return (
        <header className="fixed inset-x-0 top-0 z-30 bg-black/95 md:bg-gradient-to-b md:from-black/90 md:via-black/70 md:to-transparent">
            <div className="flex w-full items-center justify-between px-4 py-3 md:px-8 md:py-4">
                {/* 로고 */}
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsNavOpen(false)}>
                    <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#e50914] text-lg font-extrabold text-white md:h-8 md:w-8">
                        W
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white md:text-1xl">
                        WSD<span className="text-[#e50914]">flix</span>
                    </span>
                </Link>

                {/* 네비게이션 */}
                <nav className="hidden flex-1 items-center justify-center md:flex md:gap-8 lg:gap-12">
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
                <div className="flex items-center gap-2 md:gap-3">
                    {isLoggedIn && user ? (
                        <>
                            {/* 프로필 아바타 아이콘 (이메일 첫 글자, 클릭 시 아이디 토글) */}
                            <button
                                type="button"
                                onClick={() => setShowEmail((prev) => !prev)}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-[11px] font-semibold uppercase text-white md:h-8 md:w-8 md:text-xs focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:ring-offset-2 focus:ring-offset-black"
                                aria-label="프로필"
                                title={user.email}
                            >
                                {user.email?.charAt(0) ?? "U"}
                            </button>
                            {showEmail && (
                                <span className="max-w-[120px] truncate text-[10px] text-slate-200 md:max-w-[160px] md:text-xs">
                                    {user.email}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded bg-[#e50914] px-2.5 py-1 text-[11px] md:px-3 md:py-1.5 md:text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#b20710]"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                setIsNavOpen(false);
                                navigate("/signin");
                            }}
                            className="rounded bg-[#e50914] px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b20710]"
                        >
                            로그인
                        </button>
                    )}

                    {/* 모바일 메뉴 토글 버튼 (md 미만에서만 표시) */}
                    <button
                        type="button"
                        onClick={handleNavToggle}
                        className="flex h-8 w-8 items-center justify-center rounded md:hidden focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="메뉴 열기"
                    >
                        <span className="block h-[2px] w-4 bg-white rounded-sm" />
                        <span className="sr-only">{isNavOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
                    </button>
                </div>
            </div>
            {isNavOpen && (
                <nav className="md:hidden border-t border-white/10 px-4 pt-2 pb-3 text-sm bg-black/95">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <NavLink
                                to="/"
                                className={navLinkClass}
                                onClick={() => setIsNavOpen(false)}
                            >
                                홈
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/popular"
                                className={navLinkClass}
                                onClick={() => setIsNavOpen(false)}
                            >
                                대세 콘텐츠
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/search"
                                className={navLinkClass}
                                onClick={() => setIsNavOpen(false)}
                            >
                                찾아보기
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/wishlist"
                                className={navLinkClass}
                                onClick={() => setIsNavOpen(false)}
                            >
                                내가 찜한 리스트
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};