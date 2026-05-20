type CategoryCardLabelProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showShopNow?: boolean;
};

/** Split title for two-line display (e.g. "Local Foods &" / "Beverages") */
function splitCategoryTitle(name: string): { line1: string; line2: string | null } {
  const text = name.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

  if (text.includes('&')) {
    const idx = text.indexOf('&');
    return {
      line1: text.slice(0, idx + 1).trim(),
      line2: text.slice(idx + 1).trim() || null,
    };
  }

  const words = text.split(' ');
  if (words.length >= 3) {
    const mid = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' '),
    };
  }

  if (words.length === 2) {
    return { line1: words[0], line2: words[1] };
  }

  return { line1: text, line2: null };
}

const sizeClasses = {
  sm: {
    title: 'text-[11px] sm:text-xs leading-[1.25]',
    cta: 'text-[10px] sm:text-xs mt-1',
  },
  md: {
    title: 'text-xs sm:text-sm md:text-base leading-[1.3]',
    cta: 'text-[11px] sm:text-xs md:text-sm mt-1.5',
  },
  lg: {
    title: 'text-sm sm:text-lg md:text-xl leading-[1.35]',
    cta: 'text-xs sm:text-sm md:text-base mt-2',
  },
};

export function CategoryCardLabel({ name, size = 'md', showShopNow = true }: CategoryCardLabelProps) {
  const { line1, line2 } = splitCategoryTitle(name);
  const s = sizeClasses[size];

  return (
    <div className="text-center">
      <h3
        className={`font-body font-bold text-tawang-charcoal tracking-tight ${s.title}`}
      >
        <span className="block">{line1}</span>
        {line2 ? <span className="block">{line2}</span> : null}
      </h3>
      {showShopNow && (
        <p
          className={`font-body font-semibold text-tawang-gold transition-transform duration-200 group-hover:translate-x-0.5 ${s.cta}`}
        >
          Shop Now →
        </p>
      )}
    </div>
  );
}
