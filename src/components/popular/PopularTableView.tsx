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
                                                           }) => {
    return (
        <section className="mt-4">
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
                    {/* 데모처럼: 한 페이지 안에 보이는 카드 그리드 (내부 스크롤 X) */}
                    <div className="mx-auto max-w-6xl rounded-xl bg-[#141414] px-4 py-6">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5">
                            {movies.map((movie) => {
                                const title = movie.title || movie.name || "제목 없음";
                                const posterUrl = movie.poster_path
                                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                                    : undefined;

                                return (
                                    <div
                                        key={movie.id}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <div className="mb-2 h-44 w-28 overflow-hidden rounded-md bg-slate-800 md:h-56 md:w-36">
                                            {posterUrl ? (
                                                <img
                                                    src={posterUrl}
                                                    alt={title}
                                                    className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full text-xs text-slate-100 md:text-sm">
                                            <p className="truncate" title={title}>
                                                {title}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 페이지네이션 (화면 맨 아래 중앙) */}
                    <div className="mt-6 flex items-center justify-center gap-6 text-xs md:text-sm">
                        <button
                            type="button"
                            onClick={onPrevPage}
                            disabled={page === 1 || loading}
                            className="rounded bg-slate-700 px-4 py-2 font-medium text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {"< 이전"}
                        </button>

                        <span className="text-slate-200">
              {page} / {totalPages || 1}
            </span>

                        <button
                            type="button"
                            onClick={onNextPage}
                            disabled={loading || (totalPages ? page >= totalPages : false)}
                            className="rounded bg-slate-700 px-4 py-2 font-medium text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
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