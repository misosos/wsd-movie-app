// src/components/movies/MovieCard.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
    movie: TmdbMovie;
    onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
    const title = movie.title || movie.name || "제목 없음";
    const imageUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : "/placeholder-poster.png";

    return (
        <article
            className="group relative min-w-[140px] max-w-[180px] md:min-w-[180px] md:max-w-[220px] cursor-pointer transition-transform duration-200 ease-out hover:scale-105"
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-md bg-zinc-900">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* 아래쪽 그라데이션 + 제목 영역 */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 md:p-3">
                    <h3 className="truncate text-xs font-semibold text-white md:text-sm">
                        {title}
                    </h3>
                </div>
            </div>
        </article>
    );
};

export default MovieCard;