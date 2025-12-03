// src/components/popular/PopularHeader.tsx
import type React from "react";

export type ViewMode = "table" | "infinite";

interface PopularHeaderProps {
    viewMode: ViewMode;
    onChangeView: (mode: ViewMode) => void;
}

const PopularHeader: React.FC<PopularHeaderProps> = ({
                                                         viewMode,
                                                         onChangeView,
                                                     }) => {
    const isTable = viewMode === "table";
    const isInfinite = viewMode === "infinite";

    return (
        <header className="mb-4 flex flex-col items-start justify-between gap-3 md:mb-6 md:flex-row md:items-center">
            <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                    대세 콘텐츠
                </h1>
                <p className="mt-1 text-xs text-slate-400 md:text-sm">
                    인기 영화들을 테이블 또는 무한 스크롤 방식으로 살펴볼 수 있습니다.
                </p>
            </div>

            {/* 뷰 모드 토글 (아이콘 버튼) */}
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/80 px-2 py-1 text-xs text-slate-200 shadow-md shadow-black/40 md:text-sm">
                {/* 테이블 뷰 아이콘 버튼 */}
                <button
                    type="button"
                    onClick={() => onChangeView("table")}
                    className={
                        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium transition-colors " +
                        (isTable
                            ? "bg-red-600 text-white"
                            : "text-slate-300 hover:bg-zinc-800 hover:text-white")
                    }
                    aria-label="테이블 뷰"
                >
                    <i
                        className={
                            "fas fa-table text-base md:text-lg " +
                            (isTable ? "text-white" : "text-slate-300")
                        }
                        aria-hidden="true"
                    />
                    <span className="hidden text-xs md:inline">
                    </span>
                </button>

                {/* 무한 스크롤 뷰 아이콘 버튼 */}
                <button
                    type="button"
                    onClick={() => onChangeView("infinite")}
                    className={
                        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium transition-colors " +
                        (isInfinite
                            ? "bg-red-600 text-white"
                            : "text-slate-300 hover:bg-zinc-800 hover:text-white")
                    }
                    aria-label="무한 스크롤 뷰"
                >
                    <i
                        className={
                            "fas fa-stream text-base md:text-lg " +
                            (isInfinite ? "text-white" : "text-slate-300")
                        }
                        aria-hidden="true"
                    />
                    <span className="hidden text-xs md:inline">
                    </span>
                </button>
            </div>
        </header>
    );
};

export default PopularHeader;