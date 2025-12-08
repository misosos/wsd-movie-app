// src/pages/PopularPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { TmdbMovie } from "../types/tmdb";
import { getPopularMovies } from "../api/tmdb";
import PopularHeader from "../components/popular/PopularHeader";
import type { ViewMode } from "../components/popular/PopularHeader";
import PopularTableView from "../components/popular/PopularTableView";
import PopularInfiniteView from "../components/popular/PopularInfiniteView";
import ScrollTopButton from "../components/common/ScrollToTopButton.tsx";
import MovieDetailModal from "../components/movies/MovieDetailModal";
import { useWishlist } from "../context/WishlistContext";

const PopularPage: React.FC = () => {
    const { user } = useAuth();
    const apiKey = user?.password ?? "";
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [viewMode, setViewMode] = useState<ViewMode>("table");

    // Table view state
    const [tablePage, setTablePage] = useState(1);
    const [tableMovies, setTableMovies] = useState<TmdbMovie[]>([]);
    const [tableTotalPages, setTableTotalPages] = useState(1);
    const [tableLoading, setTableLoading] = useState(false);
    const [tableError, setTableError] = useState<string | null>(null);

    // Infinite view state
    const [infiniteMovies, setInfiniteMovies] = useState<TmdbMovie[]>([]);
    const [infinitePage, setInfinitePage] = useState(1);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [infiniteHasMore, setInfiniteHasMore] = useState(true);

    const [showTopButton, setShowTopButton] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<TmdbMovie | null>(null);

    // ===== Table 뷰 데이터 로딩 =====
    useEffect(() => {
        if (!apiKey || viewMode !== "table") return;

        const fetchTable = async () => {
            try {
                setTableLoading(true);
                setTableError(null);
                const res = await getPopularMovies(apiKey, tablePage);
                setTableMovies(res.data.results);
                setTableTotalPages(res.data.total_pages);
            } catch (err) {
                console.error(err);
                setTableError("인기 영화 목록을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setTableLoading(false);
            }
        };

        void fetchTable();
    }, [apiKey, viewMode, tablePage]);

    // ===== Infinite 뷰 데이터 로딩 =====
    useEffect(() => {
        if (!apiKey || viewMode !== "infinite") return;

        const fetchInfinite = async () => {
            try {
                setInfiniteLoading(true);
                const res = await getPopularMovies(apiKey, infinitePage);

                setInfiniteMovies((prev) =>
                    infinitePage === 1 ? res.data.results : [...prev, ...res.data.results]
                );
                setInfiniteHasMore(infinitePage < res.data.total_pages);
            } catch (err) {
                console.error(err);
            } finally {
                setInfiniteLoading(false);
            }
        };

        void fetchInfinite();
    }, [apiKey, viewMode, infinitePage]);

    // 뷰 모드 전환
    const handleChangeView = (mode: ViewMode) => {
        setViewMode(mode);

        if (mode === "table") {
            setTablePage(1);
        } else {
            // infinite 모드
            if (infiniteMovies.length === 0) {
                setInfinitePage(1);
            }
        }
    };

    // Table pagination
    const handlePrevTablePage = () => {
        setTablePage((prev) => Math.max(1, prev - 1));
    };
    const handleNextTablePage = () => {
        setTablePage((prev) =>
            tableTotalPages ? Math.min(tableTotalPages, prev + 1) : prev + 1
        );
    };

    // 스크롤 이벤트: 무한스크롤 + Top 버튼
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                document.documentElement;

            setShowTopButton(scrollTop > 400);

            if (
                viewMode === "infinite" &&
                !infiniteLoading &&
                infiniteHasMore &&
                scrollTop + clientHeight >= scrollHeight - 200
            ) {
                setInfinitePage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [viewMode, infiniteLoading, infiniteHasMore]);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 테이블 뷰에서는 페이지 전체 스크롤 비활성화
    useEffect(() => {
        if (viewMode === "table") {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        // 언마운트 시 또는 다른 페이지로 이동 시 스크롤 상태 복원
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [viewMode]);

    return (
        <div className="min-h-screen">
            <PopularHeader viewMode={viewMode} onChangeView={handleChangeView} />

            {viewMode === "table" && (
                <PopularTableView
                    movies={tableMovies}
                    loading={tableLoading}
                    error={tableError}
                    page={tablePage}
                    totalPages={tableTotalPages}
                    onPrevPage={handlePrevTablePage}
                    onNextPage={handleNextTablePage}
                    onClickMovie={(movie) => setSelectedMovie(movie)}
                    onToggleWishlist={(movie) => toggleWishlist(movie)}
                    isInWishlist={(movie) => isInWishlist(movie)}
                />
            )}

            {viewMode === "infinite" && (
                <PopularInfiniteView
                    movies={infiniteMovies}
                    loading={infiniteLoading}
                    hasMore={infiniteHasMore}
                    onClickMovie={(movie) => setSelectedMovie(movie)}
                />
            )}

            {viewMode === "infinite" && (
                <ScrollTopButton visible={showTopButton} onClick={handleScrollTop} />
            )}

            <MovieDetailModal
                isOpen={!!selectedMovie}
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
};

export default PopularPage;