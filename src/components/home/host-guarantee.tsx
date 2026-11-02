import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Headset,
  type LucideIcon,
} from "lucide-react"

type GuaranteeFeature = {
  title: string
  description: string
  icon: LucideIcon
}

/**
 * Guarantee & support features. UI-only data for the homepage section.
 */
const guaranteeFeatures: GuaranteeFeature[] = [
  {
    title: "Liability Protection",
    description:
      "Every booking is backed by coverage against accidental damage and third-party claims, so hosts and creators can work with real peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    description:
      "ID and studio-ownership checks confirm exactly who you are booking with, building trust between hosts and creators before the shoot begins.",
    icon: BadgeCheck,
  },
  {
    title: "Equipment Safety",
    description:
      "Clear handling guidelines and shared responsibility rules keep mics, lighting, and gear in top condition for every creator who books next.",
    icon: Wrench,
  },
  {
    title: "24/7 Host Support",
    description:
      "Round-the-clock assistance for booking issues, rescheduling, and guest questions — real help whenever it is needed, day or night.",
    icon: Headset,
  },
]

export function HostGuarantee() {
  return (
    <section
      id="about-us"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Host Guarantee &amp; Creator Support
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Book and host with confidence — protection, verified people, and
          round-the-clock help come standard with every studio.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {guaranteeFeatures.map((feature) => (
          <div
            key={feature.title}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#6D4AFF]/30"
          >
            {/* Warm amber accent line revealed on hover */}
            <span
              className="absolute inset-x-0 top-0 h-1 bg-[#F4A340] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <span className="flex size-12 items-center justify-center rounded-full bg-[#6D4AFF]/10 text-brand-text ring-1 ring-[#6D4AFF]/25 transition-colors duration-300">
              <feature.icon className="size-6" aria-hidden="true" />
            </span>

            <h3 className="text-lg font-semibold leading-snug">
              {feature.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
