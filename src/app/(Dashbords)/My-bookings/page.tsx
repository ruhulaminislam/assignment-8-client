
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CalendarCheck, CalendarDays } from "lucide-react";

import BookingCard from "./BookingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

// const statusOrder = ["Pending", "Confirmed", "Completed", "Cancelled"];

// Booking status দেখানোর জন্য
// function ProgressTracker({ status }: { status: string }) {
//   const isCancelled = status === "Cancelled";
//   const currentIndex = statusOrder.indexOf(status);

//   return (
//     <div className="mt-4 flex flex-wrap items-center gap-3">
//       {statusOrder.map((step, index) => {
//         const active = isCancelled
//           ? step === "Cancelled"
//           : index <= currentIndex;

//         return (
//           <div key={step} className="flex items-center gap-1.5">
//             <div
//               className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
//                 active
//                   ? isCancelled
//                     ? "border-red-600 bg-red-600 text-white"
//                     : "border-primary bg-primary text-white"
//                   : "border-gray-300 text-gray-400"
//               }`}
//             >
//               {index + 1}
//             </div>

//             <span
//               className={`text-xs ${
//                 active
//                   ? isCancelled
//                     ? "font-semibold text-red-600"
//                     : "font-semibold text-primary"
//                   : "text-gray-400"
//               }`}
//             >
//               {step}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// প্রতিটি Booking Card
// function BookingCard({ booking }: { booking: Booking }) {
//   const status =
//     booking.status.charAt(0).toUpperCase() +
//     booking.status.slice(1).toLowerCase();

//   const isPending = status === "Pending";

//   const startTime = new Date(booking.startDate).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const endTime = new Date(booking.endDate).toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="rounded-2xl border bg-white p-5 shadow-sm">
//       {/* Studio Information */}
//       <div className="mb-4 flex items-center gap-3">
//         <Image
//           src={booking.imageUrl}
//           alt={booking.title}
//           width={80}
//           height={56}
//           className="h-14 w-20 rounded-lg object-cover"
//         />

//         <div>
//           <h3 className="font-semibold">{booking.title}</h3>
//           <p className="text-sm text-[#6D4AFF]">
//             ${booking.hourlyRate} / hour
//           </p>
//         </div>
//       </div>

//       {/* Booking Information */}
//       <div className="space-y-2 text-sm text-gray-500">
//         <p>
//           <span className="font-medium text-[#6D4AFF]">
//             {booking.bookingDate}
//           </span>
//           {" • "}
//           {startTime} - {endTime}
//         </p>

//         <p>
//           {booking.duration} hours
//           {" • "}
//           <span className="font-semibold text-[#6D4AFF]">
//             Total: ${booking.totalAmount}
//           </span>
//         </p>
//       </div>

//       {/* Booking Status */}
//       <ProgressTracker status={status} />

//       {/* Cancel Button */}
//       <div className="mt-4 border-t pt-4">
//         <Button
//           variant="outline"
//           disabled={!isPending}
//           className="w-full bg-[#6D4AFF] text-white hover:bg-[#5A3BD9] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
//         >
//           {isPending ? "Cancel Booking" : status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// My Bookings Page
const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) {
    return <div className="p-10 text-center">Please login to see your bookings.</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load bookings");
  }

  const data: Booking[] = await res.json();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header — matches My Studio Listings design */}
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6">
        <div className="flex flex-col items-start gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-[#6D4AFF] shadow-[0_6px_18px_rgba(109,74,255,0.35)]">
            <CalendarCheck className="size-6 text-white" />
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              My Bookings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage your reservations and keep your bookings up to date.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="inline-flex items-center gap-4 rounded-2xl bg-card p-5 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#6D4AFF]/10">
            <CalendarDays className="size-5 text-brand-text" />
          </span>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Total Bookings
            </p>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-20 text-center">
  <p className="text-xl font-semibold">No Bookings Yet!</p>

  <p className="mt-2 text-sm text-muted-foreground">
    You haven't booked a studio yet. Find the perfect creative space for your next project.
  </p>

  <Button   className="mt-6">
    <Link href="/studios">
      Explore Studios
    </Link>
  </Button>
</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
