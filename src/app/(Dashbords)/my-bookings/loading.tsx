import { Skeleton } from "@/components/ui/skeleton";

/* Matches BookingCard: studio image, details, status tracker, action button. */
function BookingCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-14 w-20 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6">
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="size-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-9 w-56 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Summary */}
        <div className="inline-flex items-center gap-4 rounded-2xl bg-card p-5 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
          <Skeleton className="size-11 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-8" />
          </div>
        </div>
      </div>

      {/* Booking cards grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BookingCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
