import {Link} from 'react-router';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({items}: BreadcrumbProps) {
  return (
    <nav className="py-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-xs font-light font-bricolage">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {item.href ? (
              <Link to={item.href} className="text-black hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-black/50">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="text-black">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
