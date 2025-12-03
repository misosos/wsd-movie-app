// src/components/popular/PopularTableView.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";
import Spinner from "../common/Spinner";

interface PopularTableViewProps {
    movies: TmdbMovie[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onClickMovie?: (movie: TmdbMovie) => void; // 카드 클릭 시 상세보기용
    onToggleWishlist?: (movie: TmdbMovie) => void; // 위시리스트 토글 (선택)
    isInWishlist?: (movie: TmdbMovie) => boolean;   // 위시리스트 여부 확인 (선택)
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const PopularTableView: React.FC<PopularTableViewProps> = ({
    movies,
    loading,
    error,
    page,
    totalPages,
    onPrevPage,
    onNextPage,
    onClickMovie,
    onToggleWishlist,
    isInWishlist,
}) => {
    return (
        <section className="mt-6">
            {loading && (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            )}

            {error && !loading && (
                <div className="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {!loading && !error && movies.length === 0 && (
                <div className="px-1 py-4 text-sm text-slate-400">
                    표시할 인기 영화가 없습니다.
                </div>
            )}

            {!loading && !error && movies.length > 0 && (
                <>
                    {/* 넷플릭스 느낌의 어두운 패널 + 카드 그리드 */}
                    <div className="mx-auto max-w-6xl rounded-xl bg-[#141414] px-4 py-6 shadow-lg">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {movies.map((movie, idx) => {
                                const title = movie.title || movie.name || "제목 없음";
                                const posterUrl = movie.poster_path
                                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                                    : undefined;
                                const rating =
                                    typeof movie.vote_average === "number"
                                        ? movie.vote_average.toFixed(1)
                                        : null;
                                const inWishlist = isInWishlist ? isInWishlist(movie) : false;
                                return (
                                    <button
                                        key={movie.id}
                                        type="button"
                                        onClick={() => onClickMovie?.(movie)}
                                        className="group relative flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.03]"
                                    >
                                        {/* 포스터 카드 */}
                                        <div className="relative aspect-[2/3] w-full max-w-[160px] overflow-hidden rounded-md bg-zinc-900">
                                            {posterUrl ? (
                                                <img
                                                    src={posterUrl}
                                                    alt={title}
                                                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                                                    No Image
                                                </div>
                                            )}

                                            {/* 아래쪽 그라데이션 */}
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                                            {/* 페이지 내 순위 뱃지 */}
                                            <div className="absolute left-1.5 top-1.5 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-slate-100 group-hover:bg-[#e50914] group-hover:text-white">
                                                #{(page - 1) * movies.length + idx + 1}
                                            </div>

                                            {/* 포스터 위 액션 버튼 (위시리스트 / 상세보기) */}
                                            {(onToggleWishlist || onClickMovie) && (
                                                <div className="absolute inset-x-1 bottom-1 z-10 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                    {onToggleWishlist && (
                                                        <button
                                                            type="button"
                                                            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] text-slate-100 hover:bg-black/90"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onToggleWishlist(movie);
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

                                                    {onClickMovie && (
                                                        <button
                                                            type="button"
                                                            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[#e50914] px-2 py-1 text-[10px] font-semibold text-white hover:bg-[#b20710]"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onClickMovie(movie);
                                                            }}
                                                        >
                                                            <span className="text-xs">🔍</span>
                                                            <span className="truncate">상세보기</span>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* 제목 + 평점 */}
                                        <div className="mt-2 w-full max-w-[160px] text-xs text-slate-100 md:text-sm">
                                            <p className="truncate font-medium" title={title}>
                                                {title}
                                            </p>

                                            {rating && (
                                                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-zinc-800/80 px-2 py-0.5 text-[11px] text-amber-300 md:text-xs">
                                                    <span className="text-[10px] leading-none">★</span>
                                                    <span className="tabular-nums">{rating}</span>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 넷플릭스 스타일 페이지네이션 */}
                    <div className="mt-6 flex items-center justify-center gap-6 text-xs md:text-sm">
                        <button
                            type="button"
                            onClick={onPrevPage}
                            disabled={page === 1 || loading}
                            className="rounded-full border border-transparent bg-zinc-800 px-4 py-2 font-medium text-slate-100 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
                        >
                            {"< 이전"}
                        </button>

                        <span className="min-w-[80px] text-center text-slate-200">
              {page} / {totalPages || 1}
            </span>

                        <button
                            type="button"
                            onClick={onNextPage}
                            disabled={loading || (totalPages ? page >= totalPages : false)}
                            className="rounded-full border border-transparent bg-[#e50914] px-4 py-2 font-medium text-white transition-colors hover:bg-[#b20710] disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
                        >
                            {"다음 >"}
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default PopularTableView;