import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";
import type { ViewMode } from "../components/popular/PopularHeader";

export function usePopularView(apiKey: string) {
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    // Table view 상태
    const [tablePage, setTablePage] = useState(1);
    const [tableMovies, setTableMovies] = useState<TmdbMovie[]>([]);
    const [tableTotalPages, setTableTotalPages] = useState(1);
    const [tableLoading, setTableLoading] = useState(false);
    const [tableError, setTableError] = useState<string | null>(null);

    // Infinite view 상태
    const [infiniteMovies, setInfiniteMovies] = useState<TmdbMovie[]>([]);
    const [infinitePage, setInfinitePage] = useState(1);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [infiniteHasMore, setInfiniteHasMore] = useState(true);

    // 공통 UI 상태
    const [showTopButton, setShowTopButton] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<TmdbMovie | null>(null);

    // ===== Table view 데이터 로딩 =====
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

    // ===== Infinite view 데이터 로딩 =====
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

    // ===== 뷰 모드 전환 =====
    const handleChangeView = (mode: ViewMode) => {
        setViewMode(mode);

        if (mode === "table") {
            setTablePage(1);
        } else {
            if (infiniteMovies.length === 0) {
                setInfinitePage(1);
            }
        }
    };

    // ===== Table pagination =====
    const handlePrevTablePage = () => {
        setTablePage((prev) => Math.max(1, prev - 1));
    };

    const handleNextTablePage = () => {
        setTablePage((prev) =>
            tableTotalPages ? Math.min(tableTotalPages, prev + 1) : prev + 1
        );
    };

    // ===== 스크롤 이벤트: 무한스크롤 + Top 버튼 =====
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

    // ===== Top 버튼 핸들러 =====
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ===== 테이블 뷰에서 페이지 전체 스크롤 비활성화 =====
    useEffect(() => {
        if (viewMode === "table") {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [viewMode]);

    // ===== 모달 관련 핸들러 =====
    const openMovie = (movie: TmdbMovie) => setSelectedMovie(movie);
    const closeMovie = () => setSelectedMovie(null);

    return {
        // 뷰 모드
        viewMode,
        handleChangeView,

        // Table view
        tableMovies,
        tableLoading,
        tableError,
        tablePage,
        tableTotalPages,
        handlePrevTablePage,
        handleNextTablePage,

        // Infinite view
        infiniteMovies,
        infiniteLoading,
        infiniteHasMore,

        // Top 버튼
        showTopButton,
        handleScrollTop,

        // 모달
        selectedMovie,
        openMovie,
        closeMovie,
    };
}