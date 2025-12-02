// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { AuthUser } from "../utils/auth";
import {
    getCurrentUser,
    setCurrentUser,
    signIn,
    signUp,
} from "../utils/auth";

type AuthContextValue = {
    user: AuthUser | null;
    isLoggedIn: boolean;
    login: (email: string, password: string, keepLogin: boolean) => {
        ok: boolean;
        message: string;
    };
    register: (email: string, password: string) => {
        ok: boolean;
        message: string;
    };
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

    const isLoggedIn = !!user;

    const login: AuthContextValue["login"] = (email, password, keepLogin) => {
        const result = signIn(email, password);
        if (!result.ok || !result.user) {
            return result;
        }

        setUser(result.user);
        setCurrentUser(result.user, keepLogin); // Remember me 포함
        return result;
    };

    const register: AuthContextValue["register"] = (email, password) => {
        const result = signUp(email, password);
        return result;
    };

    const logout = () => {
        setUser(null);
        setCurrentUser(null, false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
    }
    return ctx;
};