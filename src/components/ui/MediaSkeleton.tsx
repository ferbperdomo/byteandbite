interface MediaSkeletonProps {
  count: number;
}

export default function MediaSkeleton({ count }: MediaSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative aspect-[1/2] md:aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden animate-pulse h-[20vh] md:h-[20vh] w-full"
        >
          {/* Base gradient background */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />

          {/* Image placeholder icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#b65c25]/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b65c25]/10 to-transparent animate-shimmer" />

          {/* Format badge skeleton */}
          <div className="absolute top-2 right-2 bg-[#b65c25]/20 h-6 w-12 rounded animate-pulse" />
        </div>
      ))}
    </>
  );
}
