"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarCheck, CalendarDays, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

/* Duration choices shown in the dropdown (in hours). */
const durationOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

/**
 * Reusable booking button + modal.
 * Frontend only — the Confirm button does not submit anything yet.
 */
export function BookingModal({
  studioTitle,
  studioImage,
  hourlyRate,
  className,
  id,
  userName,
  userEmail
}: {
  studioTitle: string;
  studioImage: string;
  hourlyRate: string;
  className?: string;
  id: string;
  userName: string;
  userEmail: string;
}) {


  const [open, setOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // The values the user picks in the form.
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState("3");

  // --- Calculations (they simply re-run on every render) ---
  const durationHours = Number(duration);
  const ratePerHour = Number(hourlyRate);
  const totalAmount = ratePerHour * durationHours;

  // Turn "09:00" into a real date so we can add hours and format it nicely.
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + durationHours * 60);

  const startTimeLabel = startTime
    ? startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "—";
  const endTimeLabel = startTime
    ? endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "—";

  const durationLabel =
    durationHours === 1 ? "1 hour" : `${durationHours} hours`;

  const dateLabel = bookingDate
    ? bookingDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Select a booking date";
     const handlesubmit = async() => {
      const res =await fetch("http://localhost:5000/bookings",{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studioId: id,
          title: studioTitle,
          imageUrl: studioImage,
          hourlyRate: hourlyRate,
          bookingDate: dateLabel.toString(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          duration: durationHours,
          totalAmount: totalAmount,
          userName: userName,
          userEmail: userEmail,
          status: "pending"
        })
      })
      const data = await res.json();

if (res.ok && data.insertedId) {
  toast.add({
    type: "success",
    description: "Booking has been confirmed.",
  });
} else {
  toast.add({
    type: "warning",
    description: data.message,
  });
}
       }
     
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
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Book Workspace</DialogTitle>
            <DialogDescription>
              Choose your date and time to reserve this studio.
            </DialogDescription>
          </DialogHeader>

          {/* Studio summary */}
          <div className="flex items-center gap-3 rounded-xl bg-surface p-3 ring-1 ring-border">
            <Image
              src={studioImage}
              alt={studioTitle}
              width={64}
              height={52}
              className="h-13 w-16 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-semibold">{studioTitle}</p>
              <p className="text-sm font-semibold text-brand-text">
                ${hourlyRate}
                <span className="ml-1 font-normal text-muted-foreground">
                  / hour
                </span>
              </p>
            </div>
          </div>

          {/* Date, start time and duration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Booking Date</Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className="h-10 w-full justify-start gap-2 font-normal"
                    />
                  }
                >
                  <CalendarDays className="size-4 text-muted-foreground" />
                  {dateLabel}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingDate}
                    onSelect={(date) => {
                      setBookingDate(date);
                      setDatePickerOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="booking-start">Start Time</Label>
                <Input
                  id="booking-start"
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-duration">Duration (hours)</Label>
                <Select
                  value={duration}
                  onValueChange={(value) => setDuration(value ?? "3")}
                >
                  <SelectTrigger id="booking-duration" className="h-10 w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option} {option === "1" ? "hour" : "hours"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Automatically calculated values */}
          <div className="space-y-3 rounded-xl bg-surface p-4 ring-1 ring-border">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-brand-text" />
              <p className="text-sm font-semibold">Automatically Calculated</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Start Time</p>
                <p className="text-sm font-semibold">{startTimeLabel}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-semibold">{durationLabel}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">End Time</p>
                <p className="text-sm font-semibold text-brand-text">
                  {endTimeLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Booking summary */}
          <div className="rounded-xl bg-[#6D4AFF]/5 p-4 ring-1 ring-[#6D4AFF]/20">
            <p className="text-sm font-semibold">Booking Summary</p>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                ${ratePerHour} × {durationLabel}
              </span>
              <span className="font-medium">${totalAmount}</span>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total Amount</span>
              <span className="text-xl font-semibold text-brand-text">
                ${totalAmount}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
             
              onClick={() => {
                handlesubmit();
                setOpen(false);
              }}
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
