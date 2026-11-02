import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <main className="flex-1 bg-canvas px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-x-6">
        {/* Page header */}
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="size-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-9 w-64 max-w-full" />
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

        {/* Listings table */}
        <div className="col-span-2 mt-6 overflow-hidden rounded-2xl bg-card shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Studio</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-11 w-14 rounded-md" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>

                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-2">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
