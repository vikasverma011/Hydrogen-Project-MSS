interface ProductBadgeProps {
  type: 'sale' | 'free-shipping';
  children: React.ReactNode;
}

export function ProductBadge({type, children}: ProductBadgeProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-3 py-1 text-sm font-normal font-bricolage';

  if (type === 'sale') {
    return (
      <span className={`${baseClasses} bg-[#C42424] text-white`}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={`${baseClasses} bg-white text-black border border-black`}
    >
      {children}
    </span>
  );
}
