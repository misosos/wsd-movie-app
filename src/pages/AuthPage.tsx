import { useAuthForm } from "../hooks/useAuthForm";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import AuthShell from "../components/auth/AuthShell";

export default function AuthPage() {
    const {
        mode,
        email,
        password,
        passwordCheck,
        keepLogin,
        agree,
        error,
        setEmail,
        setPassword,
        setPasswordCheck,
        setKeepLogin,
        setAgree,
        handleSubmit,
        handleSwitchMode,
    } = useAuthForm();

    return (
        <AuthShell
            mode={mode}
            error={error}
            onSubmit={handleSubmit}
            onSwitchMode={handleSwitchMode}
        >
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
        </AuthShell>
    );
}