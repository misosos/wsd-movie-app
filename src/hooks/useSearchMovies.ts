import { useEffect, useMemo, useState } from "react";
import { getMovieGenres, getPopularMovies } from "../api/tmdb";

export type Genre = {
    id: number;
    name: string;
};

const DISPLAY_GENRE_IDS = [
    28, // Action
    12, // Adventure
    16, // Animation
    35, // Comedy
    80, // Crime
    10751, // Family
    14, // Fantasy
    27, // Horror
    10749, // Romance
    878, // Science Fiction
];

export type SortOption = "popularity.desc" | "vote_average.desc" | "release_date.desc";
export type LanguageFilter = "all" | "ko" | "en";

export type TmdbMovieWithMeta = TmdbMovie & {
    popularity?: number;
    original_language?: string;
};

export function useSearchMovies(apiKey: string) {
    // 장르
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreLoading, setGenreLoading] = useState(false);

    // 영화 목록 (원본)
    const [results, setResults] = useState<TmdbMovieWithMeta[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 필터
    const [selectedGenreId, setSelectedGenreId] = useState<number | "all">("all");
    const [minRating, setMinRating] = useState<number>(0);
    const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
    const [language, setLanguage] = useState<LanguageFilter>("all");

    // Top 버튼 & 모달
    const [showTopButton, setShowTopButton] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<TmdbMovieWithMeta | null>(null);

    // ===== 장르 로딩 =====
    useEffect(() => {
        if (!apiKey) return;

        const fetchGenres = async () => {
            try {
                setGenreLoading(true);
                const res = await getMovieGenres(apiKey);
                const apiGenres = res.data.genres ?? [];
                const filteredGenres = apiGenres.filter((g: Genre) =>
                    DISPLAY_GENRE_IDS.includes(g.id)
                );
                setGenres(filteredGenres);
            } catch (err) {
                console.error(err);
            } finally {
                setGenreLoading(false);
            }
        };

        void fetchGenres();
    }, [apiKey]);

    // ===== 영화 목록 로딩 (인기 영화 + 무한 스크롤) =====
    useEffect(() => {
        if (!apiKey) return;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await getPopularMovies(apiKey, page);

                setResults((prev) => {
                    const merged =
                        page === 1 ? res.data.results : [...prev, ...res.data.results];

                    const seen = new Set<number>();
                    return merged.filter((movie) => {
                        if (seen.has(movie.id)) return false;
                        seen.add(movie.id);
                        return true;
                    });
                });

                setHasMore(page < res.data.total_pages);
            } catch (err) {
                console.error(err);
                setError("영화 목록을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        void fetchMovies();
    }, [apiKey, page]);

    // ===== 스크롤 이벤트 (무한 스크롤 + Top 버튼) =====
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                document.documentElement;

            setShowTopButton(scrollTop > 400);

            if (
                !loading &&
                hasMore &&
                scrollTop + clientHeight >= scrollHeight - 200
            ) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    // ===== 필터 & 정렬 (클라이언트 사이드) =====
    const filteredAndSorted = useMemo(() => {
        let data = [...results];

        if (selectedGenreId !== "all") {
            data = data.filter((movie) =>
                movie.genre_ids?.includes(selectedGenreId as number)
            );
        }

        if (minRating > 0) {
            data = data.filter((movie) => movie.vote_average >= minRating);
        }

        if (language !== "all") {
            data = data.filter((movie) => {
                const originalLanguage = (movie.original_language ?? "").toLowerCase();
                return originalLanguage === language;
            });
        }

        const getPopularity = (movie: TmdbMovieWithMeta) => movie.popularity ?? 0;

        data.sort((a, b) => {
            switch (sortBy) {
                case "popularity.desc":
                    return getPopularity(b) - getPopularity(a);
                case "vote_average.desc":
                    return (b.vote_average || 0) - (a.vote_average || 0);
                case "release_date.desc":
                    return (b.release_date || "").localeCompare(a.release_date || "");
                default:
                    return 0;
            }
        });

        return data;
    }, [results, selectedGenreId, minRating, language, sortBy]);

    const handleResetFilters = () => {
        setSelectedGenreId("all");
        setMinRating(0);
        setSortBy("popularity.desc");
        setLanguage("all");
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const openMovie = (movie: TmdbMovieWithMeta) => setSelectedMovie(movie);
    const closeMovie = () => setSelectedMovie(null);

    const selectedMovieGenreNames =
        selectedMovie && selectedMovie.genre_ids
            ? genres
                .filter((g) => selectedMovie.genre_ids?.includes(g.id))
                .map((g) => g.name)
            : [];

    return {
        // 데이터
        genres,
        genreLoading,
        filteredAndSorted,
        loading,
        error,
        hasMore,

        // 필터 상태
        selectedGenreId,
        setSelectedGenreId,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        language,
        setLanguage,
        handleResetFilters,

        // 모달 / 스크롤
        showTopButton,
        handleScrollTop,
        selectedMovie,
        openMovie,
        closeMovie,
        selectedMovieGenreNames,
    };
}