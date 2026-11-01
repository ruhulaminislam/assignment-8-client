import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProgressTracker from "./ProgressTracker";
import CancelBooking from "./CancelBooking";
type Booking = {
  _id: string;
  studioId: string;
  title: string;
  imageUrl: string;
  hourlyRate: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalAmount: number;
  userName: string;
  userEmail: string;
  status: string;
};

export default function BookingCard({ booking }: { booking: Booking }) {
 const status = booking.status;

  const isPending = status === "Pending";

  const startTime = new Date(booking.startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(booking.endDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      {/* Studio Information */}
      <div className="mb-4 flex items-center gap-3">
        <Image
          src={booking.imageUrl}
          alt={booking.title}
          width={80}
          height={56}
          className="h-14 w-20 rounded-lg object-cover"
        />

        <div>
          <h3 className="font-semibold">{booking.title}</h3>
          <p className="text-sm text-[#6D4AFF]">
            ${booking.hourlyRate} / hour
          </p>
        </div>
      </div>

      {/* Booking Information */}
      <div className="space-y-2 text-sm text-gray-500">
        <p>
          <span className="font-medium text-[#6D4AFF]">
            {booking.bookingDate}
          </span>
          {" • "}
          {startTime} - {endTime}
        </p>

        <p>
          {booking.duration} hours
          {" • "}
          <span className="font-semibold text-[#6D4AFF]">
            Total: ${booking.totalAmount}
          </span>
        </p>
      </div>

      {/* Booking Status */}
      <ProgressTracker status={status} />

      {/* Cancel Button */}
      
      <CancelBooking isPending={isPending} status={status} booking={booking} />
    </div>
  );
}