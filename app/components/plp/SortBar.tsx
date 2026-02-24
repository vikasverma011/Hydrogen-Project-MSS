import {useState} from 'react';

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc' | 'newest';

interface SortBarProps {
  totalResults: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  compareEnabled: boolean;
  onCompareToggle: (enabled: boolean) => void;
  onFilterToggle?: () => void;
}

const SORT_OPTIONS: {label: string; value: SortOption}[] = [
  {label: 'Featured', value: 'featured'},
  {label: 'Price: Low to High', value: 'price-asc'},
  {label: 'Price: High to Low', value: 'price-desc'},
  {label: 'Alphabetically: A-Z', value: 'title-asc'},
  {label: 'Alphabetically: Z-A', value: 'title-desc'},
  {label: 'Newest', value: 'newest'},
];

export function SortBar({
  totalResults,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  compareEnabled,
  onCompareToggle,
  onFilterToggle,
}: SortBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex items-center justify-between py-4 border-b border-[#CACACA]">
      {/* Left side - Filter toggle and results count */}
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onFilterToggle}
          className="flex items-center gap-2 text-base font-medium font-bricolage text-black lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M5 10H15M7 15H13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filter by
        </button>
        <span className="text-base font-normal font-bricolage text-[#5A5A5A]">
          {totalResults} Results Found...
        </span>
      </div>

      {/* Right side - Sort, Compare, View toggle */}
      <div className="flex items-center gap-4">
        {/* Sort dropdown */}
        <div className="relative flex items-center gap-2">
          <span className="text-base font-medium font-bricolage text-black">
            Sort by:
          </span>
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-base font-medium font-bricolage text-[#B80B0B]"
          >
            {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
            >
              <path d="M1 1L6 6L11 1" stroke="#B80B0B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {isSortOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-[#CACACA] shadow-lg z-20 min-w-[200px]">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-base font-bricolage hover:bg-[#F7F7F7] ${
                    sortBy === option.value
                      ? 'text-[#B80B0B] font-medium'
                      : 'text-black font-normal'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#CACACA]" />

        {/* Compare toggle */}
        <div className="flex items-center gap-2">
          <span className="text-base font-medium font-bricolage text-black">
            Compare
          </span>
          <button
            type="button"
            onClick={() => onCompareToggle(!compareEnabled)}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              compareEnabled ? 'bg-black' : 'bg-[#CACACA]'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                compareEnabled ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#CACACA]" />

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
            aria-label="Grid view"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="1" width="7" height="7" stroke="black" strokeWidth="2"/>
              <rect x="12" y="1" width="7" height="7" stroke="black" strokeWidth="2"/>
              <rect x="1" y="12" width="7" height="7" stroke="black" strokeWidth="2"/>
              <rect x="12" y="12" width="7" height="7" stroke="black" strokeWidth="2"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-2 ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
            aria-label="List view"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="2" width="18" height="4" stroke="black" strokeWidth="2"/>
              <rect x="1" y="8" width="18" height="4" stroke="black" strokeWidth="2"/>
              <rect x="1" y="14" width="18" height="4" stroke="black" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
