// src/components/movies/MovieDetailModal.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";
import { useWishlist } from "../../context/WishlistContext";

type MovieDetailModalProps = {
    isOpen: boolean;
    movie: TmdbMovie | null;
    genreNames?: string[];
    onClose: () => void;
};

const IMG_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
                                                               isOpen,
                                                               movie,
                                                               genreNames = [],
                                                               onClose,
                                                           }) => {
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!isOpen || !movie) return null;

    const inWishlist = isInWishlist(movie);

    const backdropUrl = movie.backdrop_path
        ? `${IMG_BASE}${movie.backdrop_path}`
        : movie.poster_path
            ? `${POSTER_BASE}${movie.poster_path}`
            : "";

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
    const rating = movie.vote_average?.toFixed(1) ?? "0.0";

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
            onClick={onClose}
        >
            <div
                className="relative h-[80vh] w-[90vw] max-w-5xl overflow-hidden rounded-lg bg-zinc-900 text-white shadow-2xl"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
            >
                {/* 상단 배경 이미지 */}
                {backdropUrl && (
                    <div className="relative h-1/2 w-full">
                        <img
                            src={backdropUrl}
                            alt={movie.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/40 to-transparent" />
                    </div>
                )}

                {/* 내용 영역 */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-slate-200 hover:bg-black/80"
                        aria-label="닫기"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col gap-4 md:flex-row">
                        {/* 포스터 */}
                        {movie.poster_path && (
                            <div className="hidden w-40 shrink-0 md:block">
                                <img
                                    src={`${POSTER_BASE}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full rounded-md shadow-lg"
                                />
                            </div>
                        )}

                        {/* 텍스트 정보 */}
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-bold md:text-3xl">
                                {movie.title || movie.name}
                            </h2>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs md:text-sm">
                                {year && <span className="text-slate-300">{year}</span>}
                                <span className="rounded border border-zinc-600 px-2 py-0.5 text-[11px] uppercase text-slate-300">
                  TMDB {rating}
                </span>
                                {genreNames.length > 0 && (
                                    <span className="text-slate-300">
                    {genreNames.join(" · ")}
                  </span>
                                )}
                            </div>

                            {/* 찜 버튼 */}
                            <div className="mt-3">
                                <button
                                    type="button"
                                    onClick={() => toggleWishlist(movie)}
                                    className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-700 md:text-sm"
                                >
                                    <span className={inWishlist ? "text-red-100" : "text-red-100"}>
                                        {inWishlist ? "♥" : "♡"}
                                    </span>
                                    <span>{inWishlist ? "찜 해제" : "찜하기"}</span>
                                </button>
                            </div>

                            {movie.overview && (
                                <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-slate-200 md:text-base">
                                    {movie.overview}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailModal;