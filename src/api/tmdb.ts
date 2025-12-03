// src/api/tmdb.ts
import axios from "axios";
import type { TmdbListResponse, TmdbMovie } from "../types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "ko-KR";

// 공용 axios 인스턴스 대신, 호출할 때마다 apiKey를 넘겨받는 형태로 구현
export const getNowPlayingMovies = (apiKey: string, page = 1) =>
    axios.get<TmdbListResponse<TmdbMovie>>(`${BASE_URL}/movie/now_playing`, {
        params: {
            api_key: apiKey,      // ✅ 로그인한 유저의 TMDB 키
            language: LANGUAGE,
            page,
        },
    });

export const getPopularMovies = (apiKey: string, page = 1) =>
    axios.get<TmdbListResponse<TmdbMovie>>(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: apiKey,
            language: LANGUAGE,
            page,
        },
    });

export const getTopRatedMovies = (apiKey: string, page = 1) =>
    axios.get<TmdbListResponse<TmdbMovie>>(`${BASE_URL}/movie/top_rated`, {
        params: {
            api_key: apiKey,
            language: LANGUAGE,
            page,
        },
    });

export const searchMovies = (apiKey: string, query: string, page = 1) =>
    axios.get<TmdbListResponse<TmdbMovie>>(`${BASE_URL}/search/movie`, {
        params: {
            api_key: apiKey,
            language: LANGUAGE,
            query,
            page,
            include_adult: false,
        },
    });

export const getUpcomingMovies = (apiKey: string, page = 1) =>
    axios.get<TmdbListResponse<TmdbMovie>>(`${BASE_URL}/movie/upcoming`, {
        params: {
            api_key: apiKey,
            language: LANGUAGE,
            page,
        },
    });

// 장르 리스트 API (검색 필터용)
export const getMovieGenres = (apiKey: string) =>
    axios.get<{ genres: { id: number; name: string }[] }>(
        `${BASE_URL}/genre/movie/list`,
        {
            params: {
                api_key: apiKey,
                language: LANGUAGE,
            },
        }
    );
