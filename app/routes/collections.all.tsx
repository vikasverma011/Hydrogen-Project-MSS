import {useState} from 'react';
import type {Route} from './+types/collections.all';
import {useLoaderData} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import type {CollectionItemFragment} from 'storefrontapi.generated';
import {
  ProductCard,
  FilterSidebar,
  SortBar,
  Breadcrumb,
  BackToTop,
} from '~/components/plp';

export const meta: Route.MetaFunction = () => {
  return [{title: `All Products | Mechanic Superstore`}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
  ]);
  return {products};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' | 'newest'>('featured');
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [compareProducts, setCompareProducts] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    liftingCapacity: [],
    driveThruWidth: [],
    widthBetweenColumns: [],
    maxRiseClearance: [],
    liftingHeight: [],
    minHeight: [],
    brand: [],
    overallHeight: [],
  });

  const handleFilterChange = (filterType: string, values: string[]) => {
    setFilters((prev) => ({...prev, [filterType]: values}));
  };

  const handleCompareToggle = (productId: string) => {
    setCompareProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : prev.length < 4
          ? [...prev, productId]
          : prev
    );
  };

  const totalProducts = products.nodes.length;

  return (
    <div className="font-bricolage">
      {/* Container */}
      <div className="max-w-[1296px] mx-auto px-4 lg:px-[72px]">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {label: 'Home', href: '/'},
            {label: 'All Products'},
          ]}
        />

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold font-rajdhani text-black mb-3">
            All Products
          </h1>
          <p className="text-base font-normal font-bricolage text-[#5A5A5A]">
            Browse our complete catalog of automotive equipment and tools.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-5">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort Bar */}
            <SortBar
              totalResults={totalProducts}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              compareEnabled={compareEnabled}
              onCompareToggle={setCompareEnabled}
            />

            {/* Products Grid */}
            <PaginatedResourceSection<CollectionItemFragment>
              connection={products}
              resourcesClassName={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6'
                  : 'flex flex-col gap-4 py-6'
              }
            >
              {({node: product, index}) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showCompare={compareEnabled}
                  isCompareSelected={compareProducts.includes(product.id)}
                  onCompareToggle={handleCompareToggle}
                />
              )}
            </PaginatedResourceSection>

            {/* Back to Top */}
            <div className="flex justify-end py-4">
              <BackToTop />
            </div>
          </div>
        </div>
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: 'all-products',
            handle: 'all',
          },
        }}
      />
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    vendor
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;
