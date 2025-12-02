import axios from "axios";
import type { TmdbListResponse, TmdbMovie } from "../types/tmdb";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "ko-KR";

const client = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: LANGUAGE,
    },
});

export const getNowPlayingMovies = (page = 1) =>
    client.get<TmdbListResponse<TmdbMovie>>("/movie/now_playing", {
        params: { page },
    });

export const getPopularMovies = (page = 1) =>
    client.get<TmdbListResponse<TmdbMovie>>("/movie/popular", {
        params: { page },
    });

export const getTopRatedMovies = (page = 1) =>
    client.get<TmdbListResponse<TmdbMovie>>("/movie/top_rated", {
        params: { page },
    });

export const searchMovies = (query: string, page = 1) =>
    client.get<TmdbListResponse<TmdbMovie>>("/search/movie", {
        params: { query, page, include_adult: false },
    });

// 필요하면 discover, genre 등 추가