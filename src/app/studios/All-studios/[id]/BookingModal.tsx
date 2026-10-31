"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Reusable booking button + modal.
 * UI only — no booking API. Move it to any page and pass studio info.
 */
export function BookingModal({
  studioTitle,
  hourlyRate,
  className,
}: {
  studioTitle?: string;
  hourlyRate?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={
          className ??
          "mt-6 h-11 w-full bg-[#6D4AFF] text-white shadow-[0_4px_14px_rgba(109,74,255,0.35)] hover:bg-[#5A3BD9]"
        }
      >
        <CalendarCheck className="mr-2 size-5" />
        Book Workspace Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Workspace</DialogTitle>
            <DialogDescription>
              {studioTitle}
              {hourlyRate ? ` · $${hourlyRate} / hour` : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Booking Date</Label>
              <Input id="booking-date" type="date" className="h-10" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-start">Start Time</Label>
                <Input id="booking-start" type="time" className="h-10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-duration">Duration (hours)</Label>
                <Input
                  id="booking-duration"
                  type="number"
                  min={1}
                  placeholder="3"
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
