// src/components/movies/MovieRow.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";
import MovieCard from "./MovieCard";
import Spinner from "../common/Spinner";

interface MovieRowProps {
    title: string;
    movies: TmdbMovie[];
    loading: boolean;
    error?: string | null;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, loading, error }) => {
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
                    {/* 가로 스크롤 행 */}
                    <div className="movie-row-scroll flex gap-3 md:gap-4 overflow-x-auto pb-2">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    {/* 좌우 그라데이션 효과 (옵션) */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />
                </div>
            )}
        </section>
    );
};

export default MovieRow;