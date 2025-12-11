interface LoginFormProps {
    email: string;
    password: string;
    keepLogin: boolean;
    onChangeEmail: (value: string) => void;
    onChangePassword: (value: string) => void;
    onChangeKeepLogin: (value: boolean) => void;
}

export default function LoginForm({
                       email,
                       password,
                       keepLogin,
                       onChangeEmail,
                       onChangePassword,
                       onChangeKeepLogin,
                   }: LoginFormProps) {
    return (
        <>
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
                비밀번호
                <input
                    type="password"
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#e50914] focus:border-transparent"
                />
            </label>

            <div className="auth-options space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300">
                    <input
                        type="checkbox"
                        checked={keepLogin}
                        onChange={(e) => onChangeKeepLogin(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-500 bg-slate-900 text-[#e50914] focus:ring-[#e50914]"
                    />
                    로그인 상태 유지
                </label>
            </div>
        </>
    );
}