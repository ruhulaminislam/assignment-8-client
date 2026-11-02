import { Skeleton } from "@/components/ui/skeleton";

/* Matches StudioCard: image, title, location, price, and action button. */
function StudioCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section className="min-h-screen bg-canvas py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search bar */}
        <div className="mx-auto mb-10 w-full max-w-3xl">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        {/* Browse by category */}
        <div className="mt-2 mb-2 space-y-3">
          <Skeleton className="h-4 w-36" />
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-28 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Available Studios heading + sorting */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-40 rounded-lg" />
        </div>

        {/* Studio cards grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <StudioCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
