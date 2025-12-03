// src/components/popular/ScrollTopButton.tsx
import React from "react";

interface ScrollTopButtonProps {
    visible: boolean;
    onClick: () => void;
}

const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({
                                                             visible,
                                                             onClick,
                                                         }) => {
    if (!visible) return null;

    return (
        <button
            type="button"
            onClick={onClick}
            className="fixed bottom-5 right-4 z-30 rounded-full bg-[#e50914] px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#b20710]"
        >
            Top
        </button>
    );
};

export default ScrollTopButton;