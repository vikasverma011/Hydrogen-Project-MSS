interface ProductRatingProps {
  rating: number;
  count: number;
}

export function ProductRating({rating, count}: ProductRatingProps) {
  return (
    <div className="inline-flex items-center gap-0.5 bg-white px-3 py-1">
      <span className="text-sm font-normal font-bricolage text-black">
        {rating.toFixed(1)}
      </span>
      <div className="w-[18px] h-[18px] flex items-center justify-center">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="#FFC419"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 0L6.12257 3.45492H9.75528L6.81636 5.59017L7.93893 9.04508L5 6.90983L2.06107 9.04508L3.18364 5.59017L0.244718 3.45492H3.87743L5 0Z" />
        </svg>
      </div>
      <span className="text-sm font-light font-bricolage text-[#8A8A8A]">
        ({count})
      </span>
    </div>
  );
}
