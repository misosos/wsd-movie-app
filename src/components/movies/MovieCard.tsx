// src/components/movies/MovieCard.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
    movie: TmdbMovie;
    onClick?: () => void;            // 상세보기 (모달 열기)
    onToggleWishlist?: () => void;   // 위시리스트 토글 (선택사항)
    inWishlist?: boolean;            // 위시에 있는지 여부 (UI 표현용)
}

const MovieCard: React.FC<MovieCardProps> = ({
                                                 movie,
                                                 onClick,
                                                 onToggleWishlist,
                                                 inWishlist = false,
                                             }) => {
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

                {/* 아래쪽 그라데이션 + 제목/액션 버튼 영역 */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 md:p-3">
                    {/* 제목 */}
                    <h3 className="truncate text-xs font-semibold text-white md:text-sm">
                        {title}
                    </h3>

                    {/* 액션 버튼들: 위시리스트 + 상세보기 */}
                    <div className="mt-1 flex items-center justify-between gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        {/* 위시리스트 버튼 (옵션) */}
                        {onToggleWishlist && (
                            <button
                                type="button"
                                className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-slate-100 hover:bg-black/80"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleWishlist();
                                }}
                            >
                                <span
                                    className={
                                        "text-xs " +
                                        (inWishlist ? "text-red-400" : "text-slate-200")
                                    }
                                >
                                    {inWishlist ? "♥" : "♡"}
                                </span>
                                <span className="truncate">
                                    {inWishlist ? "찜 해제" : "찜하기"}
                                </span>
                            </button>
                        )}

                        {/* 상세보기 버튼 */}
                        {onClick && (
                            <button
                                type="button"
                                className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-red-700"
                                onClick={(e) => {
                                    e.stopPropagation(); // 카드 onClick과 이중 호출 방지
                                    onClick();
                                }}
                            >
                                <span className="text-xs">🔍</span>
                                <span className="truncate">상세보기</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default MovieCard;