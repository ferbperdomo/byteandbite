interface MediaSkeletonProps {
  count: number;
}

export default function MediaSkeleton({ count }: MediaSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative aspect-[4/3] md:aspect-[3/2] bg-gray-800 rounded-lg overflow-hidden animate-pulse"
        >
          {/* Base gradient background */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />

          {/* Image placeholder icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer" />

          {/* Format badge skeleton */}
          <div className="absolute top-2 right-2 bg-gray-700 h-6 w-12 rounded animate-pulse" />
        </div>
      ))}
    </>
  );
}
