import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

interface ProductPriceProps {
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}

export function ProductPrice({price, compareAtPrice}: ProductPriceProps) {
  const isOnSale = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold font-bricolage text-black">
        <Money data={price} />
      </span>
      {isOnSale && compareAtPrice && (
        <span className="text-lg font-light font-bricolage text-[#8A8A8A] line-through">
          <Money data={compareAtPrice} />
        </span>
      )}
    </div>
  );
}
