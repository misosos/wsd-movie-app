// src/utils/auth.ts
export interface AuthUser {
    email: string;
    password: string;
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
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
}

export function setCurrentUser(user: AuthUser | null, keepLogin: boolean) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        localStorage.setItem(KEEP_LOGIN_KEY, JSON.stringify(keepLogin));
    } else {
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
    return { ok: true, message: "회원가입이 완료되었습니다." };
}

export function signIn(
    email: string,
    password: string
): { ok: boolean; message: string; user?: AuthUser } {
    const users = loadUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
        return { ok: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }
    return { ok: true, message: "로그인 성공", user: found };
}