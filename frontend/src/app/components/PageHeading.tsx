type PageHeadingProps = {
  title: string;
  sticky?: boolean;
  variant?: 'cream' | 'beige';
  /** Tighter spacing below the navbar (category pages). */
  compact?: boolean;
};

export function PageHeading({
  title,
  sticky = true,
  variant = 'cream',
  compact = false,
}: PageHeadingProps) {
  const bgClass = variant === 'beige' ? 'bg-tawang-beige/95' : 'bg-tawang-cream/95';

  return (
    <header
      className={
        sticky
          ? `sticky top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-40 w-full border-b border-tawang-gold/25 ${bgClass} backdrop-blur-sm sm:top-[calc(4rem+env(safe-area-inset-top,0px))]`
          : compact
            ? 'mb-2 w-full sm:mb-3'
            : 'mb-4 w-full sm:mb-6 md:mb-8'
      }
    >
      <div
        className={`mx-auto flex max-w-7xl items-center px-3 sm:px-4 ${
          compact
            ? 'min-h-9 py-1 sm:min-h-10 sm:py-1.5'
            : 'min-h-12 py-3 sm:min-h-[3.25rem] md:py-4'
        }`}
      >
        <h1 className="font-heading line-clamp-2 text-lg leading-snug text-tawang-navy sm:text-xl md:text-2xl lg:text-3xl">
          {title}
        </h1>
      </div>
      <div className="tawang-divider mx-auto max-w-7xl opacity-60" />
    </header>
  );
}
