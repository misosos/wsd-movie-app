import type { ReactNode, FormEvent } from "react";

type Mode = "login" | "register";

interface AuthShellProps {
    mode: Mode;
    error: string | null;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onSwitchMode: (mode: Mode) => void;
    children: ReactNode;
}

export default function AuthShell({
                                      mode,
                                      error,
                                      onSubmit,
                                      onSwitchMode,
                                      children,
                                  }: AuthShellProps) {
    return (
        <div className="auth-page relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black text-slate-100 pt-8">
            {/* 배경 블롭 효과 */}
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
                <form onSubmit={onSubmit} noValidate>
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

                        {/* 폼 내용 (로그인 / 회원가입) */}
                        {children}

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

                        <div className="mt-5 text-center text-xs text-slate-400 md:text-sm">
                            {mode === "login" ? (
                                <span>
                  아직 계정이 없으신가요?{" "}
                                    <button
                                        type="button"
                                        className="font-semibold text-white hover:underline underline-offset-2"
                                        onClick={() => onSwitchMode("register")}
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
                                        onClick={() => onSwitchMode("login")}
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
}