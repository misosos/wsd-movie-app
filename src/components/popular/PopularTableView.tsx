// src/components/popular/PopularTableView.tsx
import React, { useEffect, useState } from "react";
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
    onClickMovie?: (movie: TmdbMovie) => void;
    onToggleWishlist?: (movie: TmdbMovie) => void;
    isInWishlist?: (movie: TmdbMovie) => boolean;
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
    const [itemsPerPage, setItemsPerPage] = useState<number>(6);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) {
                // 모바일: 한 화면에 6개 정도
                setItemsPerPage(6);
            } else if (width < 1024) {
                // 태블릿: 8개
                setItemsPerPage(8);
            } else {
                // 데스크탑: 10개
                setItemsPerPage(10);
            }
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const visibleMovies = movies.slice(0, itemsPerPage);

    return (
        // 섹션 자체는 overflow 보이도록 + 위 여백 조금 줄이기
        <section className="mt-2 overflow-hidden">
            {loading && (
                <div className="flex justify-center py-8">
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

            {!loading && !error && visibleMovies.length > 0 && (
                <>
                    {/* 카드 패널 전체 높이/패딩을 조금 더 컴팩트하게 */}
                    <div className="mx-auto max-w-4xl rounded-xl bg-[#141414] px-2 py-2 shadow-lg overflow-hidden">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-3 md:grid-cols-4 lg:grid-cols-5">
                            {visibleMovies.map((movie, idx) => {
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
                                    <div
                                        key={movie.id}
                                        onClick={() => onClickMovie?.(movie)}
                                        className="group relative flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.02]"
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                onClickMovie?.(movie);
                                            }
                                        }}
                                    >
                                        {/* 포스터 카드: 폭/높이 살짝 더 줄임 */}
                                        <div className="relative aspect-[2/3] w-full max-w-[72px] sm:max-w-[88px] md:max-w-[110px] overflow-hidden rounded-md bg-zinc-900">
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
                                            <div className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold text-slate-100 group-hover:bg-[#e50914] group-hover:text-white">
                                                #{(page - 1) * itemsPerPage + idx + 1}
                                            </div>

                                            {/* 포스터 위 액션 버튼 */}
                                            {(onToggleWishlist || onClickMovie) && (
                                                <div
                                                    className="
                                                        absolute inset-x-2 top-1/2
                                                        z-10 flex flex-col gap-1
                                                        -translate-y-1/2
                                                        opacity-0
                                                        transition-opacity duration-200
                                                        group-hover:opacity-100
                                                    "
                                                >
                                                    {onToggleWishlist && (
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center justify-center gap-1 rounded-full bg-black/75 px-2 py-1 text-[9px] text-slate-100 hover:bg-black/90"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onToggleWishlist(movie);
                                                            }}
                                                        >
                                                            <span
                                                                className={
                                                                    "text-[11px] leading-none " +
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
                                                            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#e50914] px-2 py-1 text-[9px] font-semibold text-white hover:bg-[#b20710]"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onClickMovie(movie);
                                                            }}
                                                        >
                                                            <span className="inline-flex h-3 w-3 items-center justify-center">
                                                                <span className="flex h-3 w-3 items-center justify-center rounded-full border border-white/70 text-[9px] leading-none">
                                                                    i
                                                                </span>
                                                            </span>
                                                            <span className="truncate">상세정보</span>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* 제목 + 평점: 폰트 사이즈 살짝 축소 */}
                                        <div className="mt-1.5 w-full max-w-[72px] sm:max-w-[88px] md:max-w-[110px] text-[11px] text-slate-100 md:text-[12px]">
                                            <p className="truncate font-medium" title={title}>
                                                {title}
                                            </p>

                                            {rating && (
                                                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-zinc-800/80 px-1.5 py-0.5 text-[11px] text-amber-300 md:text-[12px]">
                                                    <span className="text-[9px] leading-none">★</span>
                                                    <span className="tabular-nums">{rating}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 페이지네이션: 높이 줄이기 */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs md:text-sm">
                        <button
                            type="button"
                            onClick={onPrevPage}
                            disabled={page === 1 || loading}
                            className="rounded-full border border-transparent bg-zinc-800 px-3 py-1.5 font-medium text-slate-100 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
                        >
                            {"< 이전"}
                        </button>

                        <span className="min-w-[72px] text-center text-slate-200">
                            {page} / {totalPages || 1}
                        </span>

                        <button
                            type="button"
                            onClick={onNextPage}
                            disabled={loading || (totalPages ? page >= totalPages : false)}
                            className="rounded-full border border-transparent bg-[#e50914] px-3 py-1.5 font-medium text-white transition-colors hover:bg-[#b20710] disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
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