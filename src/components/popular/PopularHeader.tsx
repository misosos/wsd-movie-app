// src/components/popular/PopularHeader.tsx
import React from "react";

export type ViewMode = "table" | "infinite";

interface PopularHeaderProps {
    viewMode: ViewMode;
    onChangeView: (mode: ViewMode) => void;
}

const PopularHeader: React.FC<PopularHeaderProps> = ({
                                                         viewMode,
                                                         onChangeView,
                                                     }) => {
    return (
        <div className="mb-4 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:items-center">
            <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                    대세 콘텐츠
                </h1>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                    TMDB 인기 영화 리스트를 Table/Paging 또는 무한 스크롤로 확인해보세요.
                </p>
            </div>

            <div className="inline-flex rounded-full bg-slate-800/80 p-1 text-xs md:text-sm">
                <button
                    type="button"
                    onClick={() => onChangeView("table")}
                    className={
                        "rounded-full px-3 py-1.5 md:px-4 " +
                        (viewMode === "table"
                            ? "bg-[#e50914] text-white shadow"
                            : "text-slate-300 hover:text-white")
                    }
                >
                    Table View
                </button>
                <button
                    type="button"
                    onClick={() => onChangeView("infinite")}
                    className={
                        "rounded-full px-3 py-1.5 md:px-4 " +
                        (viewMode === "infinite"
                            ? "bg-[#e50914] text-white shadow"
                            : "text-slate-300 hover:text-white")
                    }
                >
                    무한 스크롤
                </button>
            </div>
        </div>
    );
};

export default PopularHeader;