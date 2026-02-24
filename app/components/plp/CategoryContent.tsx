import {Image} from '@shopify/hydrogen';

interface CategoryContentProps {
  title: string;
  description: string;
  image?: {
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
}

export function CategoryContent({title, description, image}: CategoryContentProps) {
  return (
    <section className="flex gap-8 py-12 border-t border-[#CACACA]">
      {/* Image */}
      <div className="flex-1">
        {image ? (
          <Image
            data={image}
            className="w-full h-auto object-cover rounded"
            sizes="(min-width: 1024px) 855px, 100vw"
          />
        ) : (
          <div className="w-full aspect-[855/591] bg-gray-200 rounded" />
        )}
      </div>

      {/* Content */}
      <div className="w-[413px] flex-shrink-0">
        <h2 className="text-4xl font-semibold font-rajdhani text-black mb-4">
          {title}
        </h2>
        <p className="text-base font-normal font-bricolage text-black">
          {description}
        </p>
      </div>
    </section>
  );
}
