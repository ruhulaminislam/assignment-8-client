import {
  Search,
  Clock,
  CalendarCheck,
  Clapperboard,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

type BookingStep = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

/**
 * Booking flow steps. UI-only data — replace with real flow content if needed.
 */
const bookingSteps: BookingStep[] = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Browse verified studios by category, location, and amenities until you find the space that fits your shoot.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Pick the exact hours you need, with the hourly price shown upfront so you only pay for the time you book.",
    icon: Clock,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Confirm your date and pay securely in seconds — no back-and-forth emails and no waiting for approvals.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive and start creating. Your booking unlocks the space, access, and listed gear exactly when you need them.",
    icon: Clapperboard,
  },
]

export function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          How Booking Works
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Four simple steps from browsing studios to production day — book any
          space in minutes.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bookingSteps.map((step, index) => (
          <div
            key={step.number}
            className="group relative flex flex-col gap-3 rounded-2xl bg-card p-6 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#6D4AFF]/30"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#6D4AFF]/10 text-[#6D4AFF] transition-colors duration-300 group-hover:bg-[#6D4AFF] group-hover:text-white">
              <step.icon className="size-6" aria-hidden="true" />
            </span>

            <span className="text-xs font-semibold tracking-widest text-[#F4A340]">
              STEP {step.number}
            </span>

            <h3 className="text-lg font-semibold leading-snug">
              {step.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>

            {index < bookingSteps.length - 1 && (
              <ArrowRight
                className="absolute top-1/2 -right-[1.375rem] z-10 hidden size-5 -translate-y-1/2 text-[#6D4AFF] lg:block"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
