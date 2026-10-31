import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Star,
  Users,
  BadgeDollarSign,
  Wallet,
  LayoutGrid,
  Wifi,
  Snowflake,
  Car,
  Lightbulb,
  VolumeX,
  Projector,
  Tag,
  User,
  Mail,
} from "lucide-react";
import type { TStudio } from "@/lib/studios";
import { StudioGallery } from "./StudioGallery";
import { BookingModal } from "./BookingModal";

/* ---------- Demo data (MongoDB has no rating/reviews fields) ---------- */

const demoRating = {
  average: 4.8,
  count: 126,
};

const demoReviews = [
  {
    name: "Sarah Mitchell",
    rating: 5,
    date: "October 12, 2026",
    comment:
      "Beautiful, well-lit space and the host was super responsive. Everything was exactly as described.",
  },
  {
    name: "David Chen",
    rating: 4,
    date: "September 28, 2026",
    comment:
      "Great location and easy check-in. The amenities were accurate and the room was spotless.",
  },
  {
    name: "Priya Nair",
    rating: 5,
    date: "September 5, 2026",
    comment:
      "Booked it for a full day shoot — plenty of space and natural light. Would happily book again.",
  },
];

/* ---------- Amenity icon mapping ---------- */

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> =
  {
    "Wi-Fi": Wifi,
    "Air Conditioning": Snowflake,
    Parking: Car,
    "Lighting Equipment": Lightbulb,
    "Soundproof Room": VolumeX,
    Projector: Projector,
  };

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#F8F7FC] p-4 ring-1 ring-border">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#6D4AFF]/10">
        <Icon className="size-5 text-[#6D4AFF]" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={
            star <= Math.round(rating)
              ? "size-4 fill-[#F4A340] text-[#F4A340]"
              : "size-4 text-border"
          }
        />
      ))}
    </div>
  );
}

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let studio: TStudio | null = null;
  try {
    const res = await fetch(`http://localhost:5000/studios/${id}`);
    if (res.ok) {
      const text = await res.text();
      studio = text ? JSON.parse(text) : null;
    }
  } catch {
    studio = null;
  }

  if (!studio?._id) {
    return (
      <main
        className="flex flex-1 items-center justify-center px-4 py-20"
        style={{ backgroundColor: "#F8F7FC" }}
      >
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-12 text-center shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
          <h1 className="text-xl font-semibold">Studio not found</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            We couldn’t find the studio you’re looking for. It may have been
            removed.
          </p>
          <Link
            href="/studios/All-studios"
            className="rounded-lg bg-[#6D4AFF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5A3BD9]"
          >
            Back to Explore Studios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex-1 px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F8F7FC" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/studios/All-studios">
                Explore Studios
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{studio.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Gallery carousel */}
            <StudioGallery images={[studio.imageUrl]} title={studio.title} />

            {/* Title row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <Badge className="bg-[#6D4AFF]/10 text-[#6D4AFF] hover:bg-[#6D4AFF]/10">
                  {studio.category}
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight">
                  {studio.title}
                </h1>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {studio.location}
                </p>
              </div>

              {/* Rating (demo) */}
              <div className="flex items-center gap-2 rounded-full bg-[#F4A340]/15 px-3 py-1.5">
                <Star className="size-4 fill-[#F4A340] text-[#F4A340]" />
                <span className="text-sm font-semibold">
                  {demoRating.average}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({demoRating.count} reviews)
                </span>
              </div>
            </div>

            {/* Workspace Specifications */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">
                Workspace Specifications
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SpecItem
                  icon={BadgeDollarSign}
                  label="Hourly Rate"
                  value={`$${studio.rate} / hr`}
                />
                <SpecItem
                  icon={Wallet}
                  label="Security Deposit"
                  value={`$${studio.deposit}`}
                />
                <SpecItem
                  icon={Users}
                  label="Max Capacity"
                  value={`${studio.capacity} people`}
                />
                <SpecItem
                  icon={LayoutGrid}
                  label="Category"
                  value={studio.category}
                />
              </div>
            </section>

            {/* Detailed Overview */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Detailed Overview</h2>
              <div className="rounded-2xl bg-white p-6 leading-relaxed text-muted-foreground ring-1 ring-border">
                {studio.overview}
              </div>
            </section>

            {/* Amenities */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Amenities</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {studio.amenities.map((item) => {
                  const Icon = amenityIcons[item] ?? Tag;
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-border"
                    >
                      <Icon className="size-4 shrink-0 text-[#6D4AFF]" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Host Details */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Host Details</h2>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-border">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6D4AFF]">
                  <User className="size-6 text-white" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{studio.username}</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="size-4" />
                    {studio.useremail}
                  </p>
                </div>
              </div>
            </section>

            {/* Reviews (demo) */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <div className="space-y-4">
                {demoReviews.map((review) => (
                  <div
                    key={review.name}
                    className="rounded-2xl bg-white p-6 ring-1 ring-border"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#6D4AFF]/10 text-sm font-semibold text-[#6D4AFF]">
                          {review.name.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{review.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <Stars rating={review.rating} />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column — booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-[#6D4AFF]">
                  ${studio.rate}
                </span>
                <span className="text-sm text-muted-foreground">/ hour</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Stars rating={demoRating.average} />
                <span className="text-xs text-muted-foreground">
                  {demoRating.average} · {demoRating.count} reviews
                </span>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Security deposit
                  </span>
                  <span className="font-medium">${studio.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max capacity</span>
                  <span className="font-medium">{studio.capacity} people</span>
                </div>
              </div>

              <BookingModal
                studioTitle={studio.title}
                hourlyRate={studio.rate}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
