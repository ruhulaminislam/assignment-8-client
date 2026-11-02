import Image from "next/image";
import { LayoutDashboard, Pencil, Trash2, ImageOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { TStudio } from "@/lib/studios";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import StudioDlete from "./ StudioDlete";
import Link from "next/link";
import CTFButton from "./CTFButton";

  
// Listings will be loaded here later — empty for now (no fake data).


export default async function MyListingsPage() {
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    const email=session?.user?.email
    console.log(email)
    const res=await fetch(`http://localhost:5000/my-listings/${email}`)
    const listings: TStudio[] = await res.json()
    console.log(listings)
  return (
    <main
      className="flex-1 bg-canvas px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-x-6">
        {/* Page header */}
        <div className="flex flex-col items-start gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-[#6D4AFF] shadow-[0_6px_18px_rgba(109,74,255,0.35)]">
            <LayoutDashboard className="size-6 text-white" />
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              My Studio Listings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage your studio spaces and keep your listings up to date.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="inline-flex items-center gap-4 rounded-2xl bg-card p-5 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#6D4AFF]/10">
            <LayoutDashboard className="size-5 text-brand-text" />
          </span>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Total Listings
            </p>
            <p className="text-2xl font-semibold">{listings.length}</p>
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
              {listings.length === 0 ? (
                <CTFButton></CTFButton>
              
              ) : (
                listings.map((studio) => (
                  <TableRow key={studio._id}>
                    {/* Studio */}
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        {studio.imageUrl ? (
                          <Image
                            src={studio.imageUrl}
                            alt={studio.title}
                            width={56}
                            height={44}
                            className="h-11 w-14 shrink-0 rounded-md object-cover"
                          />
                        ) : (
                          <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-md bg-muted">
                            <ImageOff className="size-4 text-muted-foreground" />
                          </span>
                        )}
                        <span className="font-medium whitespace-nowrap">
                          {studio.title}
                        </span>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-[#6D4AFF]/10 text-brand-text hover:bg-[#6D4AFF]/10"
                      >
                        {studio.category}
                      </Badge>
                    </TableCell>

                    {/* Location */}
                    <TableCell className="text-muted-foreground">
                      {studio.location}
                    </TableCell>

                    {/* Rate */}
                    <TableCell className="font-semibold text-brand-text">
                      ${studio.rate}
                      <span className="text-xs font-normal text-muted-foreground">
                        {" "}
                        / hr
                      </span>
                    </TableCell>

                    {/* Capacity */}
                    <TableCell>{studio.capacity}</TableCell>

                    {/* Actions */}
                    <TableCell className="pr-5">
                      <div className="flex items-center justify-end gap-2">
                       <Link href={`/studios/edit/${studio._id}`} > <Button
                          type="button"
                          size="sm"
                          className="h-8 gap-1.5 border border-[#6D4AFF]/40 bg-[#6D4AFF]/10 px-3 text-brand-text hover:bg-[#6D4AFF] hover:text-white"
                        >
                          <Pencil className="size-3.5" />
                          Update
                        </Button></Link>
                        
                        <StudioDlete id={studio._id}></StudioDlete>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
