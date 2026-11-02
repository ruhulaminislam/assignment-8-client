import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found | StudioSpace",
};

function StudioIllustration() {
  return (
    <svg
      viewBox="0 0 400 360"
      role="img"
      aria-hidden="true"
      className="h-auto w-full max-w-md text-foreground"
      fill="none"
    >
      {/* Soft floor shadow */}
      <ellipse cx="205" cy="332" rx="170" ry="12" className="fill-foreground/10" />

      {/* Empty frame on the wall: the "missing page" */}
      <rect
        x="290"
        y="48"
        width="84"
        height="104"
        rx="8"
        strokeWidth="2.5"
        strokeDasharray="7 7"
        className="stroke-muted-foreground/60"
      />
      <text
        x="332"
        y="114"
        textAnchor="middle"
        fontSize="48"
        fontWeight="700"
        fill="#F4A340"
      >
        ?
      </text>

      {/* Light beam from the softbox */}
      <path d="M96 118 L230 160 L96 196 Z" fill="#F4A340" opacity="0.14" />

      {/* Softbox stand */}
      <path
        d="M70 196 V322 M70 322 L44 332 M70 322 L96 332"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Softbox */}
      <path
        d="M38 108 L98 90 V204 L38 186 Z"
        fill="#F4A340"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M52 118 V178" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

      {/* Tripod */}
      <path
        d="M210 214 V262 M210 262 L150 328 M210 262 L210 334 M210 262 L270 328"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Camera body */}
      <rect
        x="140"
        y="120"
        width="140"
        height="94"
        rx="16"
        strokeWidth="3"
        className="fill-card stroke-foreground"
      />
      <rect
        x="170"
        y="102"
        width="44"
        height="22"
        rx="6"
        strokeWidth="3"
        className="fill-card stroke-foreground"
      />
      <circle cx="256" cy="140" r="6" fill="#F4A340" />

      {/* Lens */}
      <circle cx="210" cy="170" r="38" strokeWidth="3" className="fill-card stroke-foreground" />
      <circle cx="210" cy="170" r="26" fill="#6D4AFF" />
      <circle cx="210" cy="170" r="12" className="fill-foreground" opacity="0.85" />
      <circle cx="201" cy="161" r="5" fill="#fff" opacity="0.9" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="relative grid w-full max-w-5xl items-center gap-10 overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 shadow-sm sm:px-10 md:grid-cols-2 md:gap-6 lg:px-14 lg:py-16">
        {/* Quiet brand glow, kept subtle on purpose */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />

        {/* Illustration: first on mobile, right on desktop */}
        <div className="relative order-1 flex justify-center md:order-2">
          <StudioIllustration />
        </div>

        <div className="relative order-2 text-center md:order-1 md:text-left">
          <p
            aria-hidden="true"
            className="select-none text-8xl font-extrabold leading-none tracking-tighter text-primary sm:text-9xl"
          >
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops! Page Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:mx-0">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Let&apos;s get you back to creating something amazing.
          </p>

          <div className="mt-8 flex justify-center md:justify-start">
            <Button  size="lg">
              <Link href="/">
                <Home className="size-4" aria-hidden="true" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}