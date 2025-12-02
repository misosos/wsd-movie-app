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
        <section>
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
                    <div className="overflow-visible rounded-xl border border-slate-800 bg-black/40">
                        <table className="min-w-full text-left text-sm text-slate-100">
                            <thead className="border-b border-slate-700 text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-3 py-3">포스터</th>
                                <th className="px-3 py-3">제목</th>
                                <th className="px-3 py-3">개봉일</th>
                                <th className="px-3 py-3">평점</th>
                                <th className="px-3 py-3">개요</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                            {movies.map((movie) => (
                                <tr key={movie.id} className="align-top">
                                    <td className="px-3 py-3">
                                        {movie.poster_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                                                alt={movie.title || movie.name || "포스터"}
                                                className="h-20 w-auto rounded-md object-cover"
                                            />
                                        )}
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="font-semibold">
                                            {movie.title || movie.name}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-xs text-slate-300">
                                        {movie.release_date || "-"}
                                    </td>
                                    <td className="px-3 py-3 text-xs text-yellow-300">
                                        {movie.vote_average?.toFixed(1)}
                                    </td>
                                    <td className="px-3 py-3 text-xs text-slate-300">
                                        <p className="line-clamp-3">{movie.overview}</p>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs md:text-sm">
                        <button
                            type="button"
                            onClick={onPrevPage}
                            disabled={page === 1 || loading}
                            className="rounded bg-slate-700 px-3 py-1 font-medium text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            이전
                        </button>
                        <span className="text-slate-200">
              {page} / {totalPages || 1}
            </span>
                        <button
                            type="button"
                            onClick={onNextPage}
                            disabled={loading || (totalPages ? page >= totalPages : false)}
                            className="rounded bg-slate-700 px-3 py-1 font-medium text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            다음
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default PopularTableView;