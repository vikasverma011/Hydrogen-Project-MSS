import {Image} from '@shopify/hydrogen';

interface CollectionHeroProps {
  title: string;
  description?: string | null;
  image?: {
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
}

export function CollectionHero({title, description, image}: CollectionHeroProps) {
  return (
    <div className="flex gap-5 mb-8">
      {/* Collection Image */}
      <div className="w-[193px] h-[193px] flex-shrink-0 bg-gradient-to-br from-[#5A5A5A] to-[#1A1A1A] flex items-center justify-center">
        {image ? (
          <Image
            data={image}
            className="w-24 h-auto object-contain"
            sizes="96px"
          />
        ) : (
          <div className="w-24 h-32 bg-gray-300" />
        )}
      </div>

      {/* Collection Info */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold font-rajdhani text-black mb-3">
          {title}
        </h1>
        {description && (
          <>
            <p className="text-base font-normal font-bricolage text-[#5A5A5A] line-clamp-4">
              {description}
            </p>
            <button
              type="button"
              className="mt-3 text-base font-medium font-bricolage text-[#C42424] hover:underline"
            >
              Read More
            </button>
          </>
        )}
      </div>
    </div>
  );
}
