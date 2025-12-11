interface ScrollTopButtonProps {
    visible: boolean;
    onClick: () => void;
}

export default function ScrollTopButton ({visible, onClick,} :ScrollTopButtonProps ){
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