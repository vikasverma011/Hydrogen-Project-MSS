export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="flex items-center gap-1 text-base font-medium font-bricolage text-[#B80B0B] hover:underline"
    >
      Back to Top
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="rotate-[-90deg]"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="#C42424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
