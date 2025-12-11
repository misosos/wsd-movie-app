import { useAuth } from "../context/AuthContext";
import SearchFilterBar from "../components/search/SearchFilterBar";
import SearchResultsGrid from "../components/search/SearchResultsGrid";
import ScrollTopButton from "../components/common/ScrollToTopButton.tsx";
import MovieDetailModal from "../components/common/MovieDetailModal.tsx";
import {
    useSearchMovies,
    type SortOption,
} from "../hooks/useSearchMovies";

export default function SearchPage() {
    const { user } = useAuth();
    const apiKey = user?.password ?? "";

    const {
        genres,
        genreLoading,
        filteredAndSorted,
        loading,
        error,
        hasMore,
        selectedGenreId,
        setSelectedGenreId,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        language,
        setLanguage,
        handleResetFilters,
        showTopButton,
        handleScrollTop,
        selectedMovie,
        openMovie,
        closeMovie,
        selectedMovieGenreNames,
    } = useSearchMovies(apiKey);

    return (
        <div className="min-h-screen">
            {/* 타이틀 */}
            <div className="mb-4 md:mb-6">
                <h1 className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
                    <i
                        className="fas fa-search text-sm text-red-400 md:text-base"
                        aria-hidden="true"
                    />
                    <span>찾아보기</span>
                </h1>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                    TMDB 인기 영화를 장르, 평점, 언어, 정렬 기준으로 자유롭게 필터링해 보세요.
                </p>
            </div>

            {/* 필터 바 */}
            <SearchFilterBar
                genres={genres}
                genreLoading={genreLoading}
                selectedGenreId={selectedGenreId}
                onChangeGenre={setSelectedGenreId}
                minRating={minRating}
                onChangeMinRating={setMinRating}
                sortBy={sortBy}
                onChangeSortBy={(value) => setSortBy(value as SortOption)}
                language={language}
                onChangeLanguage={setLanguage}
                onResetFilters={handleResetFilters}
            />

            {/* 결과 영역 */}
            <SearchResultsGrid
                loading={loading}
                error={error}
                hasMore={hasMore}
                movies={filteredAndSorted}
                onClickMovie={openMovie}
            />

            {/* 영화 상세 모달 */}
            <MovieDetailModal
                isOpen={!!selectedMovie}
                movie={selectedMovie}
                onClose={closeMovie}
                genreNames={selectedMovieGenreNames}
            />

            {/* Top 버튼 */}
            <ScrollTopButton visible={showTopButton} onClick={handleScrollTop} />
        </div>
    );
}