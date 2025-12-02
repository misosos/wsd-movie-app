// src/components/search/SearchResultsGrid.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";
import MovieCard from "../movies/MovieCard";
import Spinner from "../common/Spinner";

interface SearchResultsGridProps {
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    movies: TmdbMovie[];
}

const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({
    loading,
    error,
    hasMore,
    movies,
}) => {
    // 같은 영화가 여러 번 넘어오는 경우를 대비해 id 기준으로 한 번 더 중복 제거
    const uniqueMovies = (() => {
        const seen = new Set<number>();
        return movies.filter((movie) => {
            if (seen.has(movie.id)) return false;
            seen.add(movie.id);
            return true;
        });
    })();

    // 에러
    if (error && !loading) {
        return (
            <div className="mt-6 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
            </div>
        );
    }

    // 결과 없음
    if (!loading && uniqueMovies.length === 0) {
        return (
            <p className="mt-6 text-center text-sm text-slate-400">
                조건에 해당하는 영화가 없습니다.
            </p>
        );
    }

    return (
        <section className="mt-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {uniqueMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {loading && (
                <div className="flex justify-center py-6">
                    <Spinner />
                </div>
            )}

            {!loading && !hasMore && uniqueMovies.length > 0 && (
                <p className="mt-4 text-center text-xs text-slate-500">
                    마지막 페이지입니다.
                </p>
            )}
        </section>
    );
};

export default SearchResultsGrid;