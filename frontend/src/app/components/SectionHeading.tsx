type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  as?: 'h2' | 'h3' | 'h4';
};

/** Four-dot floral / cross ornament (matches original design) */
function OrnamentFloral() {
  const dot = 'absolute h-[3px] w-[3px] sm:h-1 sm:w-1 rounded-full bg-tawang-gold';
  return (
    <span className="relative h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" aria-hidden>
      <span className={`${dot} left-1/2 top-0 -translate-x-1/2`} />
      <span className={`${dot} bottom-0 left-1/2 -translate-x-1/2`} />
      <span className={`${dot} left-0 top-1/2 -translate-y-1/2`} />
      <span className={`${dot} right-0 top-1/2 -translate-y-1/2`} />
    </span>
  );
}

function OrnamentSide({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';

  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 ${
        isLeft ? 'justify-end pr-2 sm:pr-3' : 'justify-start pl-2 sm:pl-3'
      }`}
      aria-hidden
    >
      {isLeft ? (
        <>
          <span className="h-2 w-px shrink-0 bg-tawang-gold" />
          <span className="h-px min-w-[3rem] flex-1 max-w-[6rem] bg-tawang-gold sm:min-w-[4rem] sm:max-w-[7.5rem] md:max-w-[9rem]" />
          <OrnamentFloral />
        </>
      ) : (
        <>
          <OrnamentFloral />
          <span className="h-px min-w-[3rem] flex-1 max-w-[6rem] bg-tawang-gold sm:min-w-[4rem] sm:max-w-[7.5rem] md:max-w-[9rem]" />
          <span className="h-2 w-px shrink-0 bg-tawang-gold" />
        </>
      )}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={`w-full max-w-full overflow-hidden ${className}`.trim()}>
      <div className="mx-auto flex w-full max-w-3xl min-w-0 items-center justify-center px-1">
        <OrnamentSide side="left" />
        <Tag
          className={`shrink-0 px-2 text-center font-heading text-sm uppercase leading-tight tracking-[0.12em] text-tawang-navy sm:px-3 sm:text-base sm:tracking-[0.14em] md:text-lg lg:text-xl ${titleClassName}`.trim()}
        >
          {title}
        </Tag>
        <OrnamentSide side="right" />
      </div>
      {subtitle ? (
        <p className="mt-2 px-2 text-center font-body text-sm normal-case tracking-normal text-tawang-charcoal/70 sm:mt-3 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
