// src/components/search/SearchFilterBar.tsx
import React from "react";

interface Genre {
    id: number;
    name: string;
}

type LanguageFilter = "all" | "ko" | "en";

interface SearchFilterBarProps {
    genres: Genre[];
    genreLoading: boolean;
    selectedGenreId: number | "all";
    onChangeGenre: (value: number | "all") => void;

    minRating: number;
    onChangeMinRating: (value: number) => void;

    sortBy: string;
    onChangeSortBy: (value: string) => void;

    language: LanguageFilter;
    onChangeLanguage: (value: LanguageFilter) => void;

    onResetFilters: () => void;
}

const LANGUAGE_OPTIONS: { value: LanguageFilter; label: string }[] = [
    { value: "all", label: "언어 (전체)" },
    { value: "ko", label: "한국어" },
    { value: "en", label: "영어" },
];

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    genres,
    genreLoading,
    selectedGenreId,
    onChangeGenre,
    minRating,
    onChangeMinRating,
    sortBy,
    onChangeSortBy,
    language,
    onChangeLanguage,
    onResetFilters,
}) => {
    return (
        <div className="mb-6 space-y-4">
            {/* 데모 스타일 필터 바 */}
            <div className="rounded-xl bg-[#141414] px-4 py-5 shadow-lg">
                <p className="mb-3 text-center text-xs text-slate-300 md:text-sm">
                    선호하는 설정을 선택하세요
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    {/* 장르 */}
                    <select
                        value={selectedGenreId === "all" ? "all" : String(selectedGenreId)}
                        onChange={(e) =>
                            onChangeGenre(
                                e.target.value === "all" ? "all" : Number(e.target.value)
                            )
                        }
                        className="min-w-[110px] cursor-pointer rounded border border-zinc-700 bg-[#181818] px-4 py-2 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                    >
                        <option value="all">장르 (전체)</option>
                        {genreLoading && <option>장르 불러오는 중...</option>}
                        {!genreLoading &&
                            genres.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                    </select>

                    {/* 평점 */}
                    <select
                        value={minRating}
                        onChange={(e) => onChangeMinRating(Number(e.target.value))}
                        className="min-w-[110px] cursor-pointer rounded border border-zinc-700 bg-[#181818] px-4 py-2 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                    >
                        <option value={0}>평점 (전체)</option>
                        <option value={6}>평점 6.0 이상</option>
                        <option value={7}>평점 7.0 이상</option>
                        <option value={8}>평점 8.0 이상</option>
                    </select>

                    {/* 언어 */}
                    <select
                        value={language}
                        onChange={(e) => onChangeLanguage(e.target.value as LanguageFilter)}
                        className="min-w-[110px] cursor-pointer rounded border border-zinc-700 bg-[#181818] px-4 py-2 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                    >
                        {LANGUAGE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    {/* 정렬 기준 */}
                    <select
                        value={sortBy}
                        onChange={(e) => onChangeSortBy(e.target.value)}
                        className="min-w-[130px] cursor-pointer rounded border border-zinc-700 bg-[#181818] px-4 py-2 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                    >
                        <option value="popularity.desc">정렬 (인기순)</option>
                        <option value="vote_average.desc">정렬 (평점순)</option>
                        <option value="release_date.desc">정렬 (최신 개봉순)</option>
                    </select>

                    {/* 초기화 버튼 */}
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="min-w-[90px] cursor-pointer rounded border border-zinc-700 bg-[#181818] px-4 py-2 text-xs font-medium text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;