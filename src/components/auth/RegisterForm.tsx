interface RegisterFormProps {
    email: string;
    password: string;
    passwordCheck: string;
    agree: boolean;
    onChangeEmail: (value: string) => void;
    onChangePassword: (value: string) => void;
    onChangePasswordCheck: (value: string) => void;
    onChangeAgree: (value: boolean) => void;
}

export default function RegisterForm({
                                                       email,
                                                       password,
                                                       passwordCheck,
                                                       agree,
                                                       onChangeEmail,
                                                       onChangePassword,
                                                       onChangePasswordCheck,
                                                       onChangeAgree,
                                                   } : RegisterFormProps)  {
    return (
        <div className="space-y-4 rounded-2xl bg-slate-950/85 border border-slate-800 px-4 py-5 shadow-xl backdrop-blur-sm">
            <label className="block text-sm text-slate-200">
                이메일
                <input
                    type="email"
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                />
            </label>

            <label className="block text-sm text-slate-200">
                비밀번호 (TMDB API 키)
                <input
                    type="password"
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                />
            </label>

            <label className="block text-sm text-slate-200">
                비밀번호 확인
                <input
                    type="password"
                    value={passwordCheck}
                    onChange={(e) => onChangePasswordCheck(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                />
            </label>

            <div className="auth-options space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-200">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => onChangeAgree(e.target.checked)}
                        className="h-4 w-4 rounded border-red-500/70 bg-slate-900 text-[#e50914] focus:ring-[#e50914]"
                    />
                    <span>
                        <span className="font-semibold text-red-200">(필수)</span>{" "}
                        서비스 이용 약관에 동의합니다.
                    </span>
                </label>
            </div>

        </div>
    );
};