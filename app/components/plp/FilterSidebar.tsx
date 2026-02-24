import {FilterGroup} from './FilterGroup';

interface FilterSidebarProps {
  filters: {
    liftingCapacity: string[];
    driveThruWidth: string[];
    widthBetweenColumns: string[];
    maxRiseClearance: string[];
    liftingHeight: string[];
    minHeight: string[];
    brand: string[];
    overallHeight: string[];
  };
  onFilterChange: (filterType: string, values: string[]) => void;
}

const LIFTING_CAPACITY_OPTIONS = [
  {label: '7000 Lbs', value: '7000'},
  {label: '8000 Lbs', value: '8000'},
  {label: '9000 Lbs', value: '9000'},
  {label: '10000 Lbs', value: '10000'},
  {label: '11000 Lbs', value: '11000'},
  {label: '12000 Lbs', value: '12000'},
  {label: '15000 Lbs', value: '15000'},
  {label: '15800 Lbs', value: '15800'},
  {label: '16000 Lbs', value: '16000'},
  {label: '20000 Lbs', value: '20000'},
];

export function FilterSidebar({filters, onFilterChange}: FilterSidebarProps) {
  return (
    <aside className="w-[262px] flex-shrink-0">
      <FilterGroup
        title="Lifting Capacity"
        options={LIFTING_CAPACITY_OPTIONS}
        selectedValues={filters.liftingCapacity}
        onChange={(values) => onFilterChange('liftingCapacity', values)}
        defaultExpanded={true}
      />

      <FilterGroup
        title="Drive-Thru Width"
        options={[]}
        selectedValues={filters.driveThruWidth}
        onChange={(values) => onFilterChange('driveThruWidth', values)}
      />

      <FilterGroup
        title="Width between Columns"
        options={[]}
        selectedValues={filters.widthBetweenColumns}
        onChange={(values) => onFilterChange('widthBetweenColumns', values)}
      />

      <FilterGroup
        title="Max Rise Clearance (Under Arms)"
        options={[]}
        selectedValues={filters.maxRiseClearance}
        onChange={(values) => onFilterChange('maxRiseClearance', values)}
      />

      <FilterGroup
        title="Lifting Height (To Flush Pad on Arm)"
        options={[]}
        selectedValues={filters.liftingHeight}
        onChange={(values) => onFilterChange('liftingHeight', values)}
      />

      <FilterGroup
        title="Min. Height (Lowered Arm Height)"
        options={[]}
        selectedValues={filters.minHeight}
        onChange={(values) => onFilterChange('minHeight', values)}
      />

      <FilterGroup
        title="Brand"
        options={[]}
        selectedValues={filters.brand}
        onChange={(values) => onFilterChange('brand', values)}
      />

      <FilterGroup
        title="Overall Height"
        options={[]}
        selectedValues={filters.overallHeight}
        onChange={(values) => onFilterChange('overallHeight', values)}
      />
    </aside>
  );
}
