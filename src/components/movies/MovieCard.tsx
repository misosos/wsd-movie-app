// src/components/movies/MovieCard.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
    movie: TmdbMovie;
    onClick?: (movie: TmdbMovie) => void; // 나중에 위시리스트 토글용
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
    const title = movie.title || movie.name || "제목 없음";
    const imageUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "/placeholder-poster.png"; // 없으면 추후 기본 이미지
    const rating =
        typeof movie.vote_average === "number"
            ? movie.vote_average.toFixed(1)
            : "N/A";

    return (
        <div
            className="movie-card"
            onClick={() => onClick && onClick(movie)}
        >
            <div className="movie-card__image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className="movie-card__image"
                />
            </div>
            <div className="movie-card__info">
                <h3 className="movie-card__title">{title}</h3>
                <div className="movie-card__meta">
                    <span className="movie-card__rating">⭐ {rating}</span>
                    {movie.release_date && (
                        <span className="movie-card__release-date">
                            · 개봉일: {movie.release_date}
                        </span>
                    )}
                </div>
                {movie.overview && (
                    <p className="movie-card__overview">
                        {movie.overview}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MovieCard;