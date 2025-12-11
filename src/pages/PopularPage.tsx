import { useAuth } from "../context/AuthContext";
import PopularHeader from "../components/popular/PopularHeader";
import PopularTableView from "../components/popular/PopularTableView";
import PopularInfiniteView from "../components/popular/PopularInfiniteView";
import ScrollTopButton from "../components/common/ScrollToTopButton.tsx";
import MovieDetailModal from "../components/common/MovieDetailModal.tsx";
import { useWishlist } from "../context/WishlistContext";
import { usePopularView } from "../hooks/usePopularView";

export default function PopularPage() {
    const { user } = useAuth();
    const apiKey = user?.password ?? "";
    const { toggleWishlist, isInWishlist } = useWishlist();

    const {
        viewMode,
        handleChangeView,
        tableMovies,
        tableLoading,
        tableError,
        tablePage,
        tableTotalPages,
        handlePrevTablePage,
        handleNextTablePage,
        infiniteMovies,
        infiniteLoading,
        infiniteHasMore,
        showTopButton,
        handleScrollTop,
        selectedMovie,
        openMovie,
        closeMovie,
    } = usePopularView(apiKey);

    return (
        <div className="min-h-screen">
            <PopularHeader viewMode={viewMode} onChangeView={handleChangeView} />

            {viewMode === "table" && (
                <PopularTableView
                    movies={tableMovies}
                    loading={tableLoading}
                    error={tableError}
                    page={tablePage}
                    totalPages={tableTotalPages}
                    onPrevPage={handlePrevTablePage}
                    onNextPage={handleNextTablePage}
                    onClickMovie={openMovie}
                    onToggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                />
            )}

            {viewMode === "infinite" && (
                <PopularInfiniteView
                    movies={infiniteMovies}
                    loading={infiniteLoading}
                    hasMore={infiniteHasMore}
                    onClickMovie={openMovie}
                />
            )}

            {viewMode === "infinite" && (
                <ScrollTopButton visible={showTopButton} onClick={handleScrollTop} />
            )}

            <MovieDetailModal
                isOpen={!!selectedMovie}
                movie={selectedMovie}
                onClose={closeMovie}
            />
        </div>
    );
}