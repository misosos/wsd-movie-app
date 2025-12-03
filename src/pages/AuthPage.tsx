// src/pages/AuthPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateTmdbApiKey } from "../api/tmdbAuth";
import toast from "react-hot-toast";

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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!emailRegex.test(email)) {
            setError("이메일 형식이 올바르지 않습니다.");
            return;
        }

        if (!password) {
            setError("비밀번호(TMDB API 키)를 입력해주세요.");
            return;
        }

        // 비밀번호는 TMDB에서 발급받은 API 키이고,
        // 해당 키로 실제 TMDB API를 호출하여 유효성을 검증한다.
        const isValidKey = await validateTmdbApiKey(password);
        if (!isValidKey) {
            setError("유효하지 않은 TMDB API 키입니다. TMDB에서 발급받은 키를 비밀번호로 입력해주세요.");
            return;
        }

        if (mode === "register") {
            if (!agree) {
                setError("약관에 동의해야 합니다.");
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
            // 회원가입 성공 토스트
            toast.success(result.message || "회원가입이 완료되었습니다.");
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
        // 로그인 성공 토스트
        toast.success(result.message || "로그인에 성공했습니다.");
        navigate("/");
    };

    return (
        <div className="auth-page min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-slate-100 pt-16">
            <div
                className={`
                    auth-card auth-card--${mode}
                    w-full max-w-md mx-4
                    bg-black/80 border border-zinc-800 backdrop-blur
                    rounded-2xl shadow-2xl
                    p-8
                    transition-transform duration-300
                `}
            >
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        WSD<span className="text-[#e50914]">flix</span>
                    </h1>
                    <p className="mt-1 text-xs text-slate-400">
                        TMDB 키로 로그인하고 나만의 무비 리스트를 즐겨보세요.
                    </p>
                </div>
                <div className="auth-tabs flex mb-6 rounded-full bg-slate-700 p-1">
                    <button
                        type="button"
                        className={
                            "flex-1 py-2 text-sm font-medium rounded-full transition " +
                            (mode === "login"
                                ? "bg-[#e50914] text-white shadow-lg"
                                : "text-slate-300 hover:text-white")
                        }
                        onClick={() => setMode("login")}
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        className={
                            "flex-1 py-2 text-sm font-medium rounded-full transition " +
                            (mode === "register"
                                ? "bg-[#e50914] text-white shadow-lg"
                                : "text-slate-300 hover:text-white")
                        }
                        onClick={() => setMode("register")}
                    >
                        회원가입
                    </button>
                </div>

                <form className="auth-form space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-sm text-slate-200">
                        이메일
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@domain.com"
                            required
                            className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                        />
                    </label>

                    <label className="block text-sm text-slate-200">
                        비밀번호
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                        />
                    </label>

                    {mode === "register" && (
                        <label className="block text-sm text-slate-200">
                            비밀번호 확인
                            <input
                                type="password"
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                            />
                        </label>
                    )}

                    <div className="auth-options space-y-2 pt-2">
                        {mode === "login" && (
                            <label className="flex items-center gap-2 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={keepLogin}
                                    onChange={(e) => setKeepLogin(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-500 bg-slate-900 text-[#e50914] focus:ring-[#e50914]"
                                />
                                로그인 상태 유지
                            </label>
                        )}

                        {mode === "register" && (
                            <label className="flex items-center gap-2 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-500 bg-slate-900 text-[#e50914] focus:ring-[#e50914]"
                                />
                                (필수) 서비스 이용 약관에 동의합니다.
                            </label>
                        )}
                    </div>

                    {error && (
                        <div className="auth-error text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit w-full mt-2 rounded-lg bg-[#e50914] py-2.5 text-sm font-semibold text-white hover:bg-[#b20710] transition shadow-md"
                    >
                        {mode === "login" ? "로그인" : "회원가입"}
                    </button>

                    <button
                        type="button"
                        className="auth-toggle w-full text-xs text-slate-400 mt-3 hover:text-white"
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
