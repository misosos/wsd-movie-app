import Spinner from "../common/Spinner";
import MovieCard from "../common/MovieCard.tsx";
import { useWishlist } from "../../context/WishlistContext";

interface PopularInfiniteViewProps {
    movies: TmdbMovie[];
    loading: boolean;
    hasMore: boolean;
    onClickMovie?: (movie: TmdbMovie) => void;
}

export default function PopularInfiniteView({
                                                                     movies,
                                                                     loading,
                                                                     hasMore,
                                                                     onClickMovie,
                                                                 } : PopularInfiniteViewProps){
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
                    {movies.map((movie, index) => {
                        const title = movie.title || movie.name || "제목 없음";
                        const rating = movie.vote_average.toFixed(1);
                        const rank = index + 1;

                        return (
                            <div key={movie.id} className="relative flex flex-col">
                                {/* 순번 배지 */}
                                <span className="pointer-events-none absolute left-1 top-1 z-20 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-slate-100 md:text-xs">
                                    {`#${rank}`}
                                </span>

                                <MovieCard
                                    movie={movie}
                                    onClick={() => onClickMovie?.(movie)}
                                    onToggleWishlist={() => toggleWishlist(movie)}
                                    inWishlist={isInWishlist(movie)}
                                />
                                <div className="mt-1 flex flex-col gap-0.5 px-0.5 text-[11px] text-slate-200 md:text-xs">
                                    <p className="font-medium truncate">{title}</p>
                                    {movie.vote_average > 0 && (
                                        <div className="flex items-center gap-1 text-[10px] text-amber-300 md:text-[11px]">
                                            <span aria-hidden="true">★</span>
                                            <span>{rating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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