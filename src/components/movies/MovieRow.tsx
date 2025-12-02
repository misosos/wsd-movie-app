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
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
            </div>

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
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default MovieRow;