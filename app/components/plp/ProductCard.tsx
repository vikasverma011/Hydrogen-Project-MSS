import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {ProductBadge} from './ProductBadge';
import {ProductRating} from './ProductRating';
import {ProductPrice} from './ProductPrice';

interface ProductCardProps {
  product: ProductItemFragment;
  showCompare?: boolean;
  isCompareSelected?: boolean;
  onCompareToggle?: (productId: string) => void;
}

export function ProductCard({
  product,
  showCompare = false,
  isCompareSelected = false,
  onCompareToggle,
}: ProductCardProps) {
  const {handle, title, featuredImage, priceRange, compareAtPriceRange, vendor} =
    product;

  const price = priceRange.minVariantPrice;
  const compareAtPrice = compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <div className="group relative flex flex-col">
      {/* Image Container */}
      <Link
        to={`/products/${handle}`}
        className="relative bg-[#F7F7F7] aspect-square flex items-center justify-center overflow-hidden"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {isOnSale && <ProductBadge type="sale">Sale</ProductBadge>}
        </div>

        {/* Compare Checkbox */}
        {showCompare && (
          <div className="absolute top-3 right-3 z-10">
            <label className="flex items-center gap-2 bg-white rounded-full p-1 cursor-pointer">
              <input
                type="checkbox"
                checked={isCompareSelected}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCompareToggle?.(product.id);
                }}
                className="w-5 h-5 accent-[#C42424]"
              />
            </label>
          </div>
        )}

        {/* Product Image */}
        {featuredImage && (
          <Image
            data={featuredImage}
            aspectRatio="1/1"
            sizes="(min-width: 1024px) 241px, (min-width: 768px) 33vw, 50vw"
            className="object-contain w-[162px] h-[162px] transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Rating - positioned at bottom of image */}
        <div className="absolute bottom-3 left-3">
          <ProductRating rating={4.3} count={283} />
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-1">
        {/* Vendor/Brand */}
        {vendor && (
          <span className="text-sm font-medium font-bricolage text-[#C42424] uppercase">
            {vendor}
          </span>
        )}

        {/* Title */}
        <Link
          to={`/products/${handle}`}
          className="text-base font-normal font-bricolage text-black hover:underline line-clamp-2"
        >
          {title}
        </Link>

        {/* Price */}
        <ProductPrice price={price} compareAtPrice={compareAtPrice} />
      </div>
    </div>
  );
}
