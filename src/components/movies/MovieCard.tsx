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
                <p className="movie-card__rating">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
        </div>
    );
};

export default MovieCard;