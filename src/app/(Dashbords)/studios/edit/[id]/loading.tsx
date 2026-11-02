import { Skeleton } from "@/components/ui/skeleton";

/* Matches a labeled form field from the update form. */
function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default function Loading() {
  return (
    <main className="flex-1 bg-canvas px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Page heading */}
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="size-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-9 w-56 max-w-full" />
            <Skeleton className="h-4 w-96 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Form card */}
        <div className="mt-8 space-y-8 rounded-2xl bg-card p-6 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border sm:p-8">
          <section className="space-y-5">
            <Skeleton className="h-5 w-40" />
            <FieldSkeleton />
            <FieldSkeleton />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </section>

          <Skeleton className="h-px w-full" />

          <section className="space-y-5">
            <Skeleton className="h-5 w-36" />
            <FieldSkeleton />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-28 rounded-lg" />
              ))}
            </div>
          </section>

          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </main>
  );
}
