import { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";

export function useWishlistPage() {
    const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
    const [selectedMovie, setSelectedMovie] = useState<TmdbMovie | null>(null);
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop } = document.documentElement;
            setShowTopButton(scrollTop > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const openMovie = (movie: TmdbMovie) => setSelectedMovie(movie);
    const closeMovie = () => setSelectedMovie(null);

    const hasMovies = wishlist.length > 0;

    return {
        // 전역 위시리스트
        wishlist,
        toggleWishlist,
        isInWishlist,

        // 모달 상태
        selectedMovie,
        openMovie,
        closeMovie,

        // Top 버튼
        showTopButton,
        handleScrollTop,

        // 파생 상태
        hasMovies,
    };
}