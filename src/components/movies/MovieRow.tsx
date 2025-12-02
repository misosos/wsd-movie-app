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
        <section className="movie-row">
            <h2 className="movie-row__title">{title}</h2>

            {loading && (
                <div className="movie-row__loading">
                    <Spinner />
                </div>
            )}

            {error && !loading && (
                <div className="movie-row__error">{error}</div>
            )}

            {!loading && !error && (
                <div className="movie-row__list">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default MovieRow;