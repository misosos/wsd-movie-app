// src/components/movies/MovieRow.tsx
import React, { useState } from "react";
import type { TmdbMovie } from "../../types/tmdb";
import MovieCard from "./MovieCard";
import Spinner from "../common/Spinner";

interface MovieRowProps {
    title: string;
    movies: TmdbMovie[];
    loading: boolean;
    error?: string | null;
    onClickMovie?: (movie: TmdbMovie) => void; //  카드 클릭 시 상세보기용
}

const MovieRow: React.FC<MovieRowProps> = ({
                                               title,
                                               movies,
                                               loading,
                                               error,
                                               onClickMovie,
                                           }) => {
    const ITEMS_PER_PAGE = 6;

    const [page, setPage] = useState(0);


    const totalPages = Math.max(1, Math.ceil(movies.length / ITEMS_PER_PAGE));

    const pageChunks: TmdbMovie[][] = [];
    for (let i = 0; i < movies.length; i += ITEMS_PER_PAGE) {
        pageChunks.push(movies.slice(i, i + ITEMS_PER_PAGE));
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
            <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-white">
                {title}
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
                    {movies.length > ITEMS_PER_PAGE && (
                        <>
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-xs text-white hover:bg-black/70"
                            >
                                {"<"}
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-xs text-white hover:bg-black/70"
                            >
                                {">"}
                            </button>
                        </>
                    )}

                    {/* 한 페이지 분량의 영화 카드들: translateX로 부드럽게 슬라이드 */}
                    <div className="overflow-hidden px-6">
                        <div
                            className="flex gap-3 md:gap-4 transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentPage * 100}%)` }}
                        >
                            {pageChunks.map((chunk, pageIndex) => (
                                <div
                                    key={pageIndex}
                                    className="flex gap-3 md:gap-4 min-w-full"
                                >
                                    {chunk.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                            onClick={onClickMovie ? () => onClickMovie(movie) : undefined}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 페이지 인디케이터 (●●●) */}
                    {movies.length > ITEMS_PER_PAGE && (
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