// src/components/movies/MovieRow.tsx
import React, { useEffect, useState } from "react";
import type { TmdbMovie } from "../../types/tmdb";
import MovieCard from "./MovieCard";
import Spinner from "../common/Spinner";
import { useWishlist } from "../../context/WishlistContext";

interface MovieRowProps {
    title: string;
    iconClass?: string;
    movies: TmdbMovie[];
    loading: boolean;
    error?: string | null;
    onClickMovie?: (movie: TmdbMovie) => void; //  카드 클릭 시 상세보기용
}

const MovieRow: React.FC<MovieRowProps> = ({
                                               title,
                                               iconClass,
                                               movies,
                                               loading,
                                               error,
                                               onClickMovie,
                                           }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();

    const getItemsPerPage = () => {
        if (typeof window === "undefined") return 5;
        const width = window.innerWidth;

        if (width < 640) {
            // 모바일: 한 페이지에 3개
            return 3;
        }
        if (width < 1024) {
            // 태블릿/중간 화면: 한 페이지에 4개
            return 4;
        }
        // 데스크탑 이상: 한 페이지에 7개
        return 7;
    };

    const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());
    const [page, setPage] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage());
            setPage(0);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (movies.length <= itemsPerPage) return;

        const total = Math.max(1, Math.ceil(movies.length / itemsPerPage));

        const interval = setInterval(() => {
            setPage((prev) => (prev + 1) % total);
        }, 5000); // 5초마다 자동 슬라이드

        return () => clearInterval(interval);
    }, [movies.length, itemsPerPage]);


    const totalPages = Math.max(1, Math.ceil(movies.length / itemsPerPage));

    const pageChunks: TmdbMovie[][] = [];
    for (let i = 0; i < movies.length; i += itemsPerPage) {
        pageChunks.push(movies.slice(i, i + itemsPerPage));
    }

    const currentPage = Math.min(page, totalPages - 1);

    const handlePrev = () => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleNext = () => {
        setPage((prev) => (prev + 1) % totalPages);
    };

    return (
        <section className="mb-8 md:mb-10">
            <h2 className="mb-3 md:mb-4 flex items-center gap-2 text-lg md:text-xl font-semibold text-white">
                {iconClass && (
                    <i className={`${iconClass} text-sm md:text-base text-red-500`} />
                )}
                <span>{title}</span>
            </h2>

            {loading && (
                <div className="flex justify-center py-8">
                    <Spinner />
                </div>
            )}

            {error && !loading && (
                <div className="rounded-md bg-red-500/10 text-red-400 text-sm px-4 py-3">
                    {error}
                </div>
            )}

            {!loading && !error && movies.length === 0 && (
                <div className="text-sm text-slate-400 px-1 py-4">
                    표시할 영화가 없습니다.
                </div>
            )}

            {!loading && !error && movies.length > 0 && (
                <div className="relative">
                    {/* 좌우 슬라이드 버튼 (필요할 때만 표시) */}
                    {movies.length > itemsPerPage && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-xs text-white hover:bg-black/70"
                            >
                                <i className="fas fa-chevron-left" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-xs text-white hover:bg-black/70"
                            >
                                <i className="fas fa-chevron-right" />
                            </button>
                        </>
                    )}

                    {/* 한 페이지 분량의 영화 카드들: translateX로 부드럽게 슬라이드 */}
                    <div className="overflow-hidden px-6">
                        <div
                            className="flex gap-3 md:gap-4 lg:gap-7 xl:gap-9 transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentPage * 100}%)` }}
                        >
                            {pageChunks.map((chunk, pageIndex) => (
                                <div
                                    key={pageIndex}
                                    className={
                                        "flex min-w-full gap-3 md:gap-4 lg:gap-7 xl:gap-9 transform-gpu transition-transform duration-500 ease-out " +
                                        (pageIndex === currentPage
                                            ? "scale-100 opacity-100"
                                            : "scale-95 md:scale-90 opacity-70")
                                    }
                                >
                                    {chunk.map((movie, idx) => {
                                        const centerIndex = Math.floor(chunk.length / 2);
                                        const offset = idx - centerIndex;

                                        let depthClass = "scale-95 opacity-70";
                                        if (offset === 0) {
                                            // 페이지 중앙 카드: 가장 앞에 보이도록
                                            depthClass =
                                                "scale-105 opacity-100 z-20 shadow-[0_18px_40px_rgba(0,0,0,0.7)]";
                                        } else if (Math.abs(offset) === 1) {
                                            // 중앙 양옆 카드: 살짝 강조
                                            depthClass =
                                                "scale-100 opacity-90 z-10 shadow-[0_12px_30px_rgba(0,0,0,0.5)]";
                                        }

                                        return (
                                            <div
                                                key={movie.id}
                                                className={
                                                    "transform-gpu transition-transform duration-500 ease-out origin-center " +
                                                    "hover:-translate-y-1 hover:scale-105 " +
                                                    depthClass
                                                }
                                            >
                                                <MovieCard
                                                    movie={movie}
                                                    onClick={onClickMovie ? () => onClickMovie(movie) : undefined}
                                                    onToggleWishlist={() => toggleWishlist(movie)}
                                                    inWishlist={isInWishlist(movie)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 페이지 인디케이터 (●●●) */}
                    {movies.length > itemsPerPage && (
                        <div className="mt-2 flex justify-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <span
                                    key={i}
                                    className={
                                        "h-1.5 w-4 rounded-full " +
                                        (i === currentPage ? "bg-[#e50914]" : "bg-slate-600")
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default MovieRow;