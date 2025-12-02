// src/hooks/useAuth.ts
import { useState } from "react";
import type { AuthUser } from "../utils/auth";
import { getCurrentUser, setCurrentUser, signIn, signUp } from "../utils/auth";

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
    const isLoggedIn = !!user;

    const login = (email: string, password: string, keepLogin: boolean) => {
        const result = signIn(email, password);
        if (!result.ok || !result.user) return result;
        setUser(result.user);
        setCurrentUser(result.user, keepLogin);
        return result;
    };

    const register = (email: string, password: string) => {
        const result = signUp(email, password);
        return result;
    };

    const logout = () => {
        setUser(null);
        setCurrentUser(null, false);
    };

    return { user, isLoggedIn, login, register, logout };
}