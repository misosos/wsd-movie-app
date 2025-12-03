// src/components/popular/PopularInfiniteView.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";
import Spinner from "../common/Spinner";
import MovieCard from "../movies/MovieCard";
import { useWishlist } from "../../context/WishlistContext";

interface PopularInfiniteViewProps {
    movies: TmdbMovie[];
    loading: boolean;
    hasMore: boolean;
    onClickMovie?: (movie: TmdbMovie) => void;
}

const PopularInfiniteView: React.FC<PopularInfiniteViewProps> = ({
    movies,
    loading,
    hasMore,
    onClickMovie,
}) => {
    const { toggleWishlist, isInWishlist } = useWishlist();

    return (
        <section className="mt-2">
            {movies.length === 0 && loading && (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            )}

            {movies.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => onClickMovie?.(movie)}
                            onToggleWishlist={() => toggleWishlist(movie)}
                            inWishlist={isInWishlist(movie)}
                        />
                    ))}
                </div>
            )}

            {movies.length > 0 && loading && (
                <div className="flex justify-center py-6">
                    <Spinner />
                </div>
            )}

            {!loading && !hasMore && movies.length > 0 && (
                <p className="mt-4 text-center text-xs text-slate-500">
                    마지막 페이지입니다.
                </p>
            )}
        </section>
    );
};

export default PopularInfiniteView;