import MovieCard from "../common/MovieCard.tsx";
import Spinner from "../common/Spinner";
import { useWishlist } from "../../context/WishlistContext";

interface SearchResultsGridProps {
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    movies: TmdbMovie[];
    onClickMovie?: (movie: TmdbMovie) => void;
}

export default function SearchResultsGrid({
                                                                 loading,
                                                                 error,
                                                                 hasMore,
                                                                 movies,
                                                                 onClickMovie,
                                                             } : SearchResultsGridProps) {
    const { toggleWishlist, isInWishlist } = useWishlist();

    const uniqueMovies = (() => {
        const seen = new Set<number>();
        return movies.filter((movie) => {
            if (seen.has(movie.id)) return false;
            seen.add(movie.id);
            return true;
        });
    })();

    if (error && !loading) {
        return (
            <div className="mt-6 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
            </div>
        );
    }

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
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() => onClickMovie?.(movie)}
                        onToggleWishlist={() => toggleWishlist(movie)}
                        inWishlist={isInWishlist(movie)}
                    />
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