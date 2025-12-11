import { useAuth } from "../context/AuthContext";
import MovieRow from "../components/home/MovieRow";
import HeroMovieBanner from "../components/home/HeroMovieBanner";
import MovieDetailModal from "../components/common/MovieDetailModal.tsx";
import { useHomeMovies } from "../hooks/useHomeMovies";

export default function HomePage() {
    const { user } = useAuth();
    const apiKey = user?.password; // TMDB API Key

    const {
        nowPlaying,
        popular,
        topRated,
        upcoming,
        loading,
        error,
        featuredMovie,
        selectedMovie,
        openMovie,
        closeMovie,
    } = useHomeMovies(apiKey);

    return (
        <div className="home-page space-y-8">
            {/* 메인 히어로 배너 */}
            {featuredMovie && (
                <HeroMovieBanner
                    movie={featuredMovie}
                    onClickDetails={() => openMovie(featuredMovie)}
                />
            )}

            {/* 영화 리스트 섹션들 */}
            <MovieRow
                title="현재 상영작"
                iconClass="fas fa-film"
                movies={nowPlaying}
                loading={loading && nowPlaying.length === 0}
                error={error}
                onClickMovie={openMovie}
            />
            <MovieRow
                title="인기 영화"
                iconClass="fas fa-fire"
                movies={popular}
                loading={loading && popular.length === 0}
                error={error}
                onClickMovie={openMovie}
            />
            <MovieRow
                title="최고 평점 영화"
                iconClass="fas fa-star"
                movies={topRated}
                loading={loading && topRated.length === 0}
                error={error}
                onClickMovie={openMovie}
            />
            <MovieRow
                title="개봉 예정작"
                iconClass="fas fa-calendar-alt"
                movies={upcoming}
                loading={loading && upcoming.length === 0}
                error={error}
                onClickMovie={openMovie}
            />

            <MovieDetailModal
                isOpen={!!selectedMovie}
                movie={selectedMovie}
                onClose={closeMovie}
            />
        </div>
    );
}