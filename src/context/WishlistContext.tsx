/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

const WISHLIST_STORAGE_KEY = "wsd_movie_wishlist";

type WishlistContextValue = {
    wishlist: TmdbMovie[];
    isInWishlist: (movieOrId: TmdbMovie | number) => boolean;
    toggleWishlist: (movie: TmdbMovie) => void;
    clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
    undefined
);

const loadWishlistFromStorage = (): TmdbMovie[] => {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
};

const saveWishlistToStorage = (wishlist: TmdbMovie[]) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
        // ignore
    }
};

interface WishlistProviderProps {
    children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
    const [wishlist, setWishlist] = useState<TmdbMovie[]>(() => loadWishlistFromStorage());

    // 변경 시 localStorage에 반영
    useEffect(() => {
        saveWishlistToStorage(wishlist);
    }, [wishlist]);

    const isInWishlist = useCallback(
        (movieOrId: TmdbMovie | number) => {
            const id =
                typeof movieOrId === "number" ? movieOrId : (movieOrId.id as number);
            return wishlist.some((m) => m.id === id);
        },
        [wishlist]
    );

    const toggleWishlist = useCallback((movie: TmdbMovie) => {
        setWishlist((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            if (exists) {
                return prev.filter((m) => m.id !== movie.id);
            }
            // 새로 추가할 때는 너무 큰 객체는 아니니까 그대로 저장
            return [...prev, movie];
        });
    }, []);

    const clearWishlist = useCallback(() => {
        setWishlist([]);
    }, []);

    const value: WishlistContextValue = {
        wishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = (): WishlistContextValue => {
    const ctx = useContext(WishlistContext);
    if (!ctx) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return ctx;
};