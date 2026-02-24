import {useState} from 'react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  defaultExpanded?: boolean;
}

export function FilterGroup({
  title,
  options,
  selectedValues,
  onChange,
  defaultExpanded = false,
}: FilterGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="border-b border-[#5A5A5A]/30 pb-4">
      <button
        type="button"
        className="flex items-center justify-between w-full py-2"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="text-base font-medium font-bricolage text-black">
          {title}
        </span>
        <span className="w-5 h-5 flex items-center justify-center">
          {isExpanded ? (
            <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
              <rect width="14" height="1.04" fill="black" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect y="6" width="14" height="2" fill="black" />
              <rect x="6" width="2" height="14" fill="black" />
            </svg>
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-2 flex flex-col gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                  className="w-4 h-4 accent-black border-2 border-black"
                />
              </div>
              <span className="text-base font-normal font-bricolage text-black">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
