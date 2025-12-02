// src/pages/SearchPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { TmdbMovie } from "../types/tmdb";
import { getMovieGenres, getPopularMovies } from "../api/tmdb";
import SearchFilterBar from "../components/search/SearchFilterBar";
import SearchResultsGrid from "../components/search/SearchResultsGrid";
import ScrollTopButton from "../components/popular/ScrollTopButton";

type Genre = {
    id: number;
    name: string;
};

// 데모와 비슷하게 보여줄 대표 장르만 노출하기 위한 화이트리스트 (TMDB 장르 ID 기준)
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

type TmdbMovieWithMeta = TmdbMovie & {
    popularity?: number;
    original_language?: string;
};

type SortOption =
    | "popularity.desc"
    | "vote_average.desc"
    | "release_date.desc"
    | "title.asc";

const SearchPage: React.FC = () => {
    const { user } = useAuth();
    const apiKey = user?.password ?? ""; // TMDB API KEY = 비밀번호

    // 장르
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreLoading, setGenreLoading] = useState(false);

    // 영화 목록 (원본)
    const [results, setResults] = useState<TmdbMovieWithMeta[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 필터 상태
    const [selectedGenreId, setSelectedGenreId] = useState<number | "all">("all");
    const [minRating, setMinRating] = useState<number>(0);
    const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
    const [language, setLanguage] = useState<"all" | "ko" | "en">("all"); // 언어 필터 (기본: 한국어)

    // Top 버튼 표시 여부
    const [showTopButton, setShowTopButton] = useState(false);

    // ===== 장르 로딩 =====
    useEffect(() => {
        if (!apiKey) return;

        const fetchGenres = async () => {
            try {
                setGenreLoading(true);
                const res = await getMovieGenres(apiKey);
                const apiGenres = res.data.genres ?? [];
                // TMDB 장르 전체가 아닌, 데모처럼 대표 장르만 노출 (ID 기준)
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

                setResults((prev) =>
                    page === 1 ? res.data.results : [...prev, ...res.data.results]
                );
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

        // 장르 필터
        if (selectedGenreId !== "all") {
            data = data.filter((movie) =>
                movie.genre_ids?.includes(selectedGenreId as number)
            );
        }

        // 최소 평점 필터
        if (minRating > 0) {
            data = data.filter((movie) => movie.vote_average >= minRating);
        }

        // 언어 필터 (TMDB original_language 기준) - 전체 / ko / en
        if (language !== "all") {
            data = data.filter((movie) => {
                const originalLanguage = (movie.original_language ?? "").toLowerCase();
                return originalLanguage === language;
            });
        }

        const getPopularity = (movie: TmdbMovieWithMeta) =>
            movie.popularity ?? 0;

        // 정렬
        data.sort((a, b) => {
            switch (sortBy) {
                case "popularity.desc":
                    return getPopularity(b) - getPopularity(a);
                case "vote_average.desc":
                    return (b.vote_average || 0) - (a.vote_average || 0);
                case "release_date.desc":
                    return (b.release_date || "").localeCompare(a.release_date || "");
                case "title.asc":
                    return (a.title || a.name || "").localeCompare(
                        b.title || b.name || ""
                    );
                default:
                    return 0;
            }
        });

        return data;
    }, [results, selectedGenreId, minRating, language, sortBy]);

    // ===== 핸들러 =====
    const handleResetFilters = () => {
        setSelectedGenreId("all");
        setMinRating(0);
        setSortBy("popularity.desc");
        setLanguage("all");
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen">
            {/* 타이틀 */}
            <div className="mb-4 md:mb-6">
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                    찾아보기
                </h1>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                    TMDB 인기 영화를 장르, 평점, 언어, 정렬 기준으로 자유롭게 필터링해 보세요.
                </p>
            </div>

            {/* 필터 바 */}
            <SearchFilterBar
                genres={genres}
                genreLoading={genreLoading}
                selectedGenreId={selectedGenreId}
                onChangeGenre={setSelectedGenreId}
                minRating={minRating}
                onChangeMinRating={setMinRating}
                sortBy={sortBy}
                onChangeSortBy={(value) => setSortBy(value as SortOption)}
                language={language}
                onChangeLanguage={setLanguage}
                onResetFilters={handleResetFilters}
            />

            {/* 결과 영역 */}
            <SearchResultsGrid
                loading={loading}
                error={error}
                hasMore={hasMore}
                movies={filteredAndSorted}
            />

            {/* Top 버튼 */}
            <ScrollTopButton visible={showTopButton} onClick={handleScrollTop} />
        </div>
    );
};

export default SearchPage;