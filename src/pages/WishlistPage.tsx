import MovieCard from "../components/common/MovieCard.tsx";
import MovieDetailModal from "../components/common/MovieDetailModal.tsx";
import ScrollTopButton from "../components/common/ScrollToTopButton.tsx";
import { useWishlistPage } from "../hooks/useWishlistPage";

export default function WishlistPage() {
    const {
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedMovie,
        openMovie,
        closeMovie,
        showTopButton,
        handleScrollTop,
        hasMovies,
    } = useWishlistPage();

    return (
        <div className="min-h-screen">
            {/* 헤더 영역 */}
            <div className="mb-4 md:mb-6">
                <h1 className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
                    <i
                        className="fas fa-heart text-sm text-red-400 md:text-base"
                        aria-hidden="true"
                    />
                    <span>내가 찜한 리스트</span>
                </h1>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                    찜한 영화들을 한 곳에서 모아서 볼 수 있어요.
                </p>
            </div>

            {/* 비어 있을 때 */}
            {!hasMovies && (
                <div className="mt-10 flex flex-col items-center justify-center text-center text-slate-400">
                    <p className="text-sm md:text-base">
                        아직 찜한 영화가 없습니다.
                    </p>
                    <p className="mt-2 text-xs md:text-sm">
                        홈이나 대세 콘텐츠, 찾아보기 페이지에서 마음에 드는 영화를 찜해 보세요.
                    </p>
                </div>
            )}

            {/* 위시리스트 그리드 */}
            {hasMovies && (
                <section className="mt-4">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                        {wishlist.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={() => openMovie(movie)}
                                onToggleWishlist={() => toggleWishlist(movie)}
                                inWishlist={isInWishlist(movie)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 상세보기 모달 */}
            <MovieDetailModal
                isOpen={!!selectedMovie}
                movie={selectedMovie}
                onClose={closeMovie}
            />

            {/* Top 버튼 */}
            <ScrollTopButton visible={showTopButton} onClick={handleScrollTop} />
        </div>
    );
}