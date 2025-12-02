// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import type { TmdbMovie } from "../types/tmdb";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
} from "../api/tmdb";
import MovieRow from "../components/movies/MovieRow";

const HomePage: React.FC = () => {
    const [nowPlaying, setNowPlaying] = useState<TmdbMovie[]>([]);
    const [popular, setPopular] = useState<TmdbMovie[]>([]);
    const [topRated, setTopRated] = useState<TmdbMovie[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const [nowPlayingRes, popularRes, topRatedRes] = await Promise.all([
                    getNowPlayingMovies(1),
                    getPopularMovies(1),
                    getTopRatedMovies(1),
                ]);

                if (!isMounted) return;

                setNowPlaying(nowPlayingRes.data.results);
                setPopular(popularRes.data.results);
                setTopRated(topRatedRes.data.results);
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

        fetchMovies();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="home-page">
            <MovieRow
                title="현재 상영작"
                movies={nowPlaying}
                loading={loading && nowPlaying.length === 0}
                error={error}
            />
            <MovieRow
                title="인기 영화"
                movies={popular}
                loading={loading && popular.length === 0}
                error={error}
            />
            <MovieRow
                title="최고 평점 영화"
                movies={topRated}
                loading={loading && topRated.length === 0}
                error={error}
            />
        </div>
    );
};

export default HomePage;