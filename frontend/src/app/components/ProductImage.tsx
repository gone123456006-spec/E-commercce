type ProductImageSize = 'xs' | 'md' | 'search' | 'thumb' | 'category' | 'detail' | 'related';

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  /** xs = compact cards; md = shop/flash rows; category = grid cards */
  size?: ProductImageSize;
  /** Load immediately (hero, product detail) instead of lazy */
  priority?: boolean;
};

const sizeClasses: Record<ProductImageSize, string> = {
  xs: 'h-24 sm:h-28 w-full',
  md: 'h-28 sm:h-32 w-full',
  search: 'h-48 md:h-64 w-full',
  thumb: 'h-20 w-20 md:h-32 md:w-32',
  category: 'aspect-square sm:aspect-[4/3] w-full',
  detail: 'h-52 sm:h-64 md:h-72 w-full',
  related: 'h-28 sm:h-32 w-full',
};

/** Image fits inside the card slot (object-contain) without changing card layout */
export function ProductImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  size = 'md',
  priority = false,
}: ProductImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-white flex items-center justify-center ${sizeClasses[size]} ${containerClassName}`.trim()}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        className={`w-full h-full object-contain object-center ${className}`.trim()}
      />
    </div>
  );
}
