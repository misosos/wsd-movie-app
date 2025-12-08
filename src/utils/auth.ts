// src/utils/auth.ts
// 비밀번호는 TMDB에서 발급받은 v3 API Key를 의미하며,
// 해당 키를 로컬 계정의 패스워드처럼 사용한다.
export interface AuthUser {
    email: string;
    password: string; // TMDB API Key
}

const USERS_KEY = "wsd_users";
const CURRENT_USER_KEY = "wsd_current_user";
const KEEP_LOGIN_KEY = "wsd_keep_login";

function loadUsers(): AuthUser[] {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as AuthUser[]) : [];
}

function saveUsers(users: AuthUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): AuthUser | null {
    // "로그인 상태 유지"가 설정된 경우에만 자동 로그인 허용
    const keep = localStorage.getItem(KEEP_LOGIN_KEY);
    if (keep !== "true") {
        return null;
    }

    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
}

export function setCurrentUser(user: AuthUser | null, keepLogin: boolean) {
    if (user && keepLogin) {
        // ✅ 로그인 성공 + "로그인 상태 유지" 체크된 경우에만 현재 유저를 저장
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        localStorage.setItem(KEEP_LOGIN_KEY, "true");
    } else {
        // 로그아웃하거나, 로그인 유지 옵션을 끄고 로그인한 경우
        // 새로고침 시 자동 로그인되지 않도록 저장값을 지움
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(KEEP_LOGIN_KEY);
    }
}

export function signUp(email: string, password: string): { ok: boolean; message: string } {
    const users = loadUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) {
        return { ok: false, message: "이미 가입된 이메일입니다." };
    }
    const newUser: AuthUser = { email, password };
    saveUsers([...users, newUser]);
    return {
        ok: true,
        message: "회원가입이 완료되었습니다. 발급받은 TMDB API 키로 로그인할 수 있습니다.",
    };
}

export function signIn(
    email: string,
    password: string
): { ok: boolean; message: string; user?: AuthUser } {
    const users = loadUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
        return {
            ok: false,
            message: "이메일 또는 TMDB API 키가 올바르지 않습니다.",
        };
    }
    return { ok: true, message: "로그인 성공", user: found };

}