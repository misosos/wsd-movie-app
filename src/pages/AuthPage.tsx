// src/pages/AuthPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Mode = "login" | "register";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<Mode>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [keepLogin, setKeepLogin] = useState(false);
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!emailRegex.test(email)) {
            setError("이메일 형식이 올바르지 않습니다.");
            return;
        }

        if (mode === "register") {
            if (!agree) {
                setError("약관에 동의해야 합니다.");
                return;
            }
            if (password.length < 6) {
                setError("비밀번호는 6자 이상이어야 합니다.");
                return;
            }
            if (password !== passwordCheck) {
                setError("비밀번호가 일치하지 않습니다.");
                return;
            }
            const result = register(email, password);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            alert(result.message);
            // 회원가입 후 로그인 모드로 전환
            setMode("login");
            setPassword("");
            setPasswordCheck("");
            return;
        }

        // 로그인
        const result = login(email, password, keepLogin);
        if (!result.ok) {
            setError(result.message);
            return;
        }
        alert(result.message);
        navigate("/");
    };

    return (
        <div className="auth-page">
            <div className={`auth-card auth-card--${mode}`}>
                <div className="auth-tabs">
                    <button
                        type="button"
                        className={mode === "login" ? "active" : ""}
                        onClick={() => setMode("login")}
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        className={mode === "register" ? "active" : ""}
                        onClick={() => setMode("register")}
                    >
                        회원가입
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        이메일
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@domain.com"
                            required
                        />
                    </label>

                    <label>
                        비밀번호
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {mode === "register" && (
                        <label>
                            비밀번호 확인
                            <input
                                type="password"
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                                required
                            />
                        </label>
                    )}

                    <div className="auth-options">
                        <label>
                            <input
                                type="checkbox"
                                checked={keepLogin}
                                onChange={(e) => setKeepLogin(e.target.checked)}
                            />
                            로그인 상태 유지
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            (필수) 서비스 이용 약관에 동의합니다.
                        </label>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="auth-submit">
                        {mode === "login" ? "로그인" : "회원가입"}
                    </button>

                    <button
                        type="button"
                        className="auth-toggle"
                        onClick={() =>
                            setMode((prev) => (prev === "login" ? "register" : "login"))
                        }
                    >
                        {mode === "login"
                            ? "아직 계정이 없다면? 회원가입 하기"
                            : "이미 계정이 있다면? 로그인 하기"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;