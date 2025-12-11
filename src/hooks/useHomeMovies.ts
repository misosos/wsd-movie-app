import { useEffect, useState } from "react";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "../api/tmdb";

export function useHomeMovies(apiKey?: string) {
    const [nowPlaying, setNowPlaying] = useState<TmdbMovie[]>([]);
    const [popular, setPopular] = useState<TmdbMovie[]>([]);
    const [topRated, setTopRated] = useState<TmdbMovie[]>([]);
    const [upcoming, setUpcoming] = useState<TmdbMovie[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<TmdbMovie | null>(null);

    const featuredMovie =
        nowPlaying[0] || popular[0] || topRated[0] || upcoming[0];

    useEffect(() => {
        if (!apiKey) {
            return;
        }

        let isMounted = true;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const [nowPlayingRes, popularRes, topRatedRes, upcomingRes] =
                    await Promise.all([
                        getNowPlayingMovies(apiKey, 1),
                        getPopularMovies(apiKey, 1),
                        getTopRatedMovies(apiKey, 1),
                        getUpcomingMovies(apiKey, 1),
                    ]);

                if (!isMounted) return;

                setNowPlaying(nowPlayingRes.data.results);
                setPopular(popularRes.data.results);
                setTopRated(topRatedRes.data.results);
                setUpcoming(upcomingRes.data.results);
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError("영화 목록을 불러오는 중 오류가 발생했습니다.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void fetchMovies();

        return () => {
            isMounted = false;
        };
    }, [apiKey]);

    const openMovie = (movie: TmdbMovie) => setSelectedMovie(movie);
    const closeMovie = () => setSelectedMovie(null);

    return {
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
    };
}