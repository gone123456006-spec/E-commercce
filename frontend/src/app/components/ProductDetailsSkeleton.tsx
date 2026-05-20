export function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-tawang-cream animate-pulse">
      <div className="h-12 bg-tawang-beige/80 sm:h-14" />
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:py-8">
        <div className="overflow-hidden rounded-xl bg-white shadow-md md:rounded-2xl">
          <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:gap-8 md:p-8">
            <div className="aspect-square w-full rounded-xl bg-tawang-beige" />
            <div className="space-y-4">
              <div className="h-6 w-3/4 rounded bg-tawang-beige" />
              <div className="h-10 w-1/3 rounded bg-tawang-beige" />
              <div className="h-24 rounded-lg bg-tawang-beige" />
              <div className="h-12 rounded-lg bg-tawang-beige" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
