export interface TmdbMovie {
    id: number;
    title?: string;
    name?: string; // TV show
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
}

export interface TmdbListResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}