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

                <div className="header__right">
                    {isLoggedIn ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem("wsd_user");
                                navigate("/signin");
                            }}
                        >
                            로그아웃
                        </button>
                    ) : (
                        <button onClick={() => navigate("/signin")}>로그인</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;