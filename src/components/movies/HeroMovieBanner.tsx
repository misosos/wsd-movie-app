// src/components/movies/HeroMovieBanner.tsx
import React from "react";
import type { TmdbMovie } from "../../types/tmdb";

const HERO_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface HeroMovieBannerProps {
    movie: TmdbMovie;
    onClickDetails?: () => void; // 상세 정보 버튼 클릭 시 호출
}

const HeroMovieBanner: React.FC<HeroMovieBannerProps> = ({
                                                             movie,
                                                             onClickDetails,
                                                         }) => {
    const title = movie.title || movie.name || "제목 없음";
    const overview = movie.overview;
    const backdropUrl = movie.backdrop_path
        ? `${HERO_IMAGE_BASE_URL}${movie.backdrop_path}`
        : movie.poster_path
            ? `${HERO_IMAGE_BASE_URL}${movie.poster_path}`
            : undefined;

    return (
        <section className="relative mb-6 overflow-hidden rounded-b-2xl bg-black">
            {/* 배경 이미지 */}
            {backdropUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(${backdropUrl})` }}
                />
            )}

            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

            {/* 내용 */}
            <div className="relative z-10 max-w-6xl px-4 py-10 md:px-8 md:py-20">
                <div className="max-w-xl space-y-3 md:space-y-4">
                    <h2 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl">
                        {title}
                    </h2>

                    {overview && (
                        <p className="text-xs text-slate-200 md:text-sm lg:text-base overflow-hidden text-ellipsis max-h-[4.5rem]">
                            {overview}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                        <button className="flex items-center gap-2 rounded bg-white px-4 py-2 text-xs font-semibold text-black shadow hover:bg-slate-200 md:text-sm">
                            재생
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/30 md:text-sm"
                            onClick={onClickDetails}
                        >
                            상세 정보
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroMovieBanner;