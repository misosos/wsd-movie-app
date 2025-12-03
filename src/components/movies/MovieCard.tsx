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
        <article
            className="group relative min-w-[140px] max-w-[180px] md:min-w-[180px] md:max-w-[220px] cursor-pointer transition-transform duration-200 ease-out hover:scale-105"
            onClick={() => onClick && onClick(movie)}
        >
            <div className="relative overflow-hidden rounded-md bg-zinc-900">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* 아래쪽 그라데이션 + 정보 영역 */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 md:p-3">
                    <h3 className="text-xs md:text-sm font-semibold text-white truncate">
                        {title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-[11px] md:text-xs text-slate-200">
                        <span className="text-amber-400 font-medium">★ {rating}</span>
                        {movie.release_date && (
                            <span className="text-slate-300">
                                {movie.release_date.slice(0, 4)}
                            </span>
                        )}
                    </div>
                    {movie.overview && (
                        <p className="mt-1 hidden md:block text-[11px] text-slate-300 overflow-hidden text-ellipsis max-h-[3rem]">
                            {movie.overview}
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
};

export default MovieCard;