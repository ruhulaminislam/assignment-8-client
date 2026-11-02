import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

/* Matches the Workspace Specifications cards (icon + two text lines). */
function SpecSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-surface p-4 ring-1 ring-border">
      <Skeleton className="size-10 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

/* Matches the review cards (avatar, name, date, comment). */
function ReviewSkeleton() {
  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="flex-1 bg-canvas px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Breadcrumb */}
        <Skeleton className="h-4 w-56" />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left side */}
          <div className="space-y-8 lg:col-span-2">
            {/* Studio image */}
            <Skeleton className="h-72 w-full rounded-2xl sm:h-96" />

            {/* Studio title and rating */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-9 w-72 max-w-full" />
                <Skeleton className="h-4 w-44" />
              </div>
              <Skeleton className="h-9 w-40 rounded-full" />
            </div>

            {/* Workspace specifications */}
            <section className="space-y-4">
              <Skeleton className="h-6 w-56" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SpecSkeleton />
                <SpecSkeleton />
                <SpecSkeleton />
                <SpecSkeleton />
              </div>
            </section>

            {/* Detailed overview */}
            <section className="space-y-3">
              <Skeleton className="h-6 w-44" />
              <div className="space-y-3 rounded-2xl bg-card p-6 ring-1 ring-border">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </section>

            {/* Amenities */}
            <section className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-border"
                  >
                    <Skeleton className="size-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </section>

            {/* Host details */}
            <section className="space-y-4">
              <Skeleton className="h-6 w-36" />
              <div className="flex items-center gap-4 rounded-2xl bg-card p-6 ring-1 ring-border">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-44" />
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <div className="space-y-4">
                <ReviewSkeleton />
                <ReviewSkeleton />
              </div>
            </section>
          </div>

          {/* Right side: booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4 rounded-2xl bg-card p-6 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-4 w-44" />
              <Separator />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
