import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateTmdbApiKey } from "../api/tmdbAuth";
import toast from "react-hot-toast";

export type Mode = "login" | "register";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useAuthForm() {
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    return {
        // 상태
        mode,
        email,
        password,
        passwordCheck,
        keepLogin,
        agree,
        error,

        // setter
        setEmail,
        setPassword,
        setPasswordCheck,
        setKeepLogin,
        setAgree,

        // 핸들러
        handleSubmit,
        handleSwitchMode,
    };
}