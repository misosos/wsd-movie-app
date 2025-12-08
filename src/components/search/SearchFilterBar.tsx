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

                <div className="flex flex-wrap items-stretch justify-center gap-3">
                    {/* 장르 */}
                    <div className="flex min-w-[140px] max-w-[180px] flex-col gap-1 rounded-lg border border-zinc-700/70 bg-[#181818]/80 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 md:text-xs">
                            <i
                                className="fas fa-film text-[#e50914]"
                                aria-hidden="true"
                            />
                            <span>장르</span>
                        </div>
                        <select
                            aria-label="장르 필터"
                            value={selectedGenreId === "all" ? "all" : String(selectedGenreId)}
                            onChange={(e) =>
                                onChangeGenre(
                                    e.target.value === "all" ? "all" : Number(e.target.value)
                                )
                            }
                            className="mt-1 w-full cursor-pointer rounded border border-zinc-700 bg-[#181818] px-3 py-1.5 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                        >
                            <option value="all">전체</option>
                            {genreLoading && <option>장르 불러오는 중...</option>}
                            {!genreLoading &&
                                genres.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* 평점 */}
                    <div className="flex min-w-[140px] max-w-[180px] flex-col gap-1 rounded-lg border border-zinc-700/70 bg-[#181818]/80 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 md:text-xs">
                            <i
                                className="fas fa-star text-[#e50914]"
                                aria-hidden="true"
                            />
                            <span>평점</span>
                        </div>
                        <select
                            aria-label="평점 필터"
                            value={minRating}
                            onChange={(e) => onChangeMinRating(Number(e.target.value))}
                            className="mt-1 w-full cursor-pointer rounded border border-zinc-700 bg-[#181818] px-3 py-1.5 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                        >
                            <option value={0}>전체</option>
                            <option value={6}>6.0 이상</option>
                            <option value={7}>7.0 이상</option>
                            <option value={8}>8.0 이상</option>
                        </select>
                    </div>

                    {/* 언어 */}
                    <div className="flex min-w-[140px] max-w-[180px] flex-col gap-1 rounded-lg border border-zinc-700/70 bg-[#181818]/80 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 md:text-xs">
                            <i
                                className="fas fa-language text-[#e50914]"
                                aria-hidden="true"
                            />
                            <span>언어</span>
                        </div>
                        <select
                            aria-label="언어 필터"
                            value={language}
                            onChange={(e) => onChangeLanguage(e.target.value as LanguageFilter)}
                            className="mt-1 w-full cursor-pointer rounded border border-zinc-700 bg-[#181818] px-3 py-1.5 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                        >
                            {LANGUAGE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 정렬 기준 */}
                    <div className="flex min-w-[160px] max-w-[200px] flex-col gap-1 rounded-lg border border-zinc-700/70 bg-[#181818]/80 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 md:text-xs">
                            <i
                                className="fas fa-sort-amount-down text-[#e50914]"
                                aria-hidden="true"
                            />
                            <span>정렬</span>
                        </div>
                        <select
                            aria-label="정렬 기준"
                            value={sortBy}
                            onChange={(e) => onChangeSortBy(e.target.value)}
                            className="mt-1 w-full cursor-pointer rounded border border-zinc-700 bg-[#181818] px-3 py-1.5 text-xs text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                        >
                            <option value="popularity.desc">인기순</option>
                            <option value="vote_average.desc">평점순</option>
                            <option value="release_date.desc">최신 개봉순</option>
                        </select>
                    </div>

                    {/* 초기화 버튼 */}
                    <div className="flex min-w-[140px] max-w-[180px] flex-col gap-1 rounded-lg border border-zinc-700/70 bg-[#181818]/80 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 md:text-xs">
                            <i
                                className="fas fa-undo text-[#e50914]"
                                aria-hidden="true"
                            />
                            <span>필터 초기화</span>
                        </div>
                        <button
                            type="button"
                            onClick={onResetFilters}
                            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded border border-zinc-700 bg-[#181818] px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm hover:bg-zinc-900 focus:border-[#e50914] focus:outline-none md:text-sm"
                        >
                            <span>초기화</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;