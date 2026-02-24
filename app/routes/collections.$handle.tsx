import {useState} from 'react';
import {redirect, useLoaderData, useLocation} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {
  ProductCard,
  FilterSidebar,
  SortBar,
  CollectionHero,
  Breadcrumb,
  CategoryContent,
  BackToTop,
} from '~/components/plp';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  const location = useLocation();
  
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

  const totalProducts = collection.products.nodes.length;

  return (
    <div className="font-bricolage">
      {/* Container */}
      <div className="max-w-[1296px] mx-auto px-4 lg:px-[72px]">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {label: 'Home', href: '/'},
            {label: 'Car Lifts', href: '/collections'},
            {label: collection.title},
          ]}
        />

        {/* Collection Hero */}
        <CollectionHero
          title={collection.title}
          description={collection.description}
          image={collection.image}
        />

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
            <PaginatedResourceSection<ProductItemFragment>
              connection={collection.products}
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

        {/* Category Content Section */}
        <CategoryContent
          title={collection.title}
          description={collection.description || 'Explore our collection of high-quality products designed to meet your needs.'}
          image={collection.image}
        />
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
