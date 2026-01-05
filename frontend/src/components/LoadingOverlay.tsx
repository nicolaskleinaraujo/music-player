const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
            <div className="w-35 h-35 border-4 border-[#1db954] border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default LoadingOverlay
