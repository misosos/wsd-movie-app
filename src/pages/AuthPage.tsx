// src/pages/AuthPage.tsx
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateTmdbApiKey } from "../api/tmdbAuth";
import toast from "react-hot-toast";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

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

  const handleSwitchMode = (nextMode: Mode) => {
    if (mode === nextMode) return;
    setError(null);
    setMode(nextMode);
  };

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

    const isValidKey = await validateTmdbApiKey(password);
    if (!isValidKey) {
      setError(
        "유효하지 않은 TMDB API 키입니다. TMDB에서 발급받은 키를 비밀번호로 입력해주세요."
      );
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

      toast.success(result.message || "회원가입이 완료되었습니다.");
      setMode("login");
      setPassword("");
      setPasswordCheck("");
      setAgree(false);
      return;
    }

    const result = login(email, password, keepLogin);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    toast.success(result.message || "로그인에 성공했습니다.");
    navigate("/");
  };

  return (
    <div className="auth-page relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black text-slate-100 pt-8">
      {/* 배경 블롭 효과 - 넷플릭스 레드 톤 */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-[-80px] h-80 w-80 rounded-full bg-[#e50914]/35 blur-3xl" />
        <div className="absolute right-[-64px] bottom-[-64px] h-72 w-72 rounded-full bg-red-700/30 blur-3xl" />
      </div>

      {/* mode가 바뀔 때 카드 전체가 새로 애니메이션 되도록 key 사용 */}
      <div
        key={mode}
        className={`
          auth-card auth-card-switch
          w-full max-w-lg mx-4 transform-gpu
        `}
      >
        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`
              rounded-2xl px-8 py-8 md:px-10 md:py-10
              shadow-2xl shadow-black/70 border
              ${
                mode === "login"
                  ? "bg-black/80 border-zinc-800"
                  : "bg-[#050714]/95 border-red-500/40"
              }
            `}
          >
            {/* 타이틀 */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-white">
                {mode === "login" ? "Sign in" : "Sign up"}
              </h1>
            </div>

            {/* mode에 따라 서로 다른 컴포넌트를 독립적으로 렌더링 */}
            {mode === "login" ? (
              <LoginForm
                email={email}
                password={password}
                keepLogin={keepLogin}
                onChangeEmail={setEmail}
                onChangePassword={setPassword}
                onChangeKeepLogin={setKeepLogin}
              />
            ) : (
              <RegisterForm
                email={email}
                password={password}
                passwordCheck={passwordCheck}
                agree={agree}
                onChangeEmail={setEmail}
                onChangePassword={setPassword}
                onChangePasswordCheck={setPasswordCheck}
                onChangeAgree={setAgree}
              />
            )}

            {error && (
              <div className="mt-4 text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#e50914] py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#f6121d] transition-colors"
            >
              {mode === "login" ? "로그인" : "회원가입"}
            </button>

            {/* 모드 전환 안내 문구 */}
            <div className="mt-5 text-center text-xs text-slate-400 md:text-sm">
              {mode === "login" ? (
                <span>
                  아직 계정이 없으신가요?{" "}
                  <button
                    type="button"
                    className="font-semibold text-white hover:underline underline-offset-2"
                    onClick={() => handleSwitchMode("register")}
                  >
                    지금 가입하기
                  </button>
                </span>
              ) : (
                <span>
                  이미 계정이 있으신가요?{" "}
                  <button
                    type="button"
                    className="font-semibold text-white hover:underline underline-offset-2"
                    onClick={() => handleSwitchMode("login")}
                  >
                    로그인하기
                  </button>
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
