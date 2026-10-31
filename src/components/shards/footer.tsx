import type { ReactNode, SVGProps } from "react"
import Link from "next/link"
import { Aperture } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type NavLink = {
  label: string
  href: string
}

type SocialLink = {
  label: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode
}

const quickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "About Us", href: "#about-us" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact Us", href: "/contact" },
]

const popularCategories: NavLink[] = [
  { label: "Photography Studios", href: "/studios?category=photo" },
  { label: "Podcast Studios", href: "/studios?category=podcast" },
  { label: "Music Recording Studios", href: "/studios?category=music" },
  { label: "Film Production Studios", href: "/studios?category=film" },
  { label: "Art Workshops", href: "/studios?category=art" },
]

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/** Modern X logo (not the legacy Twitter bird) */
function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FacebookIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: InstagramIcon,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedinIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
]

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
        {children}
      </h3>
      <span
        className="mt-2 block h-0.5 w-8 bg-[#F4A340]"
        aria-hidden="true"
      />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-[#6D4AFF] bg-[#191035] text-white/70">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#6D4AFF]">
                <Aperture className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">
                StudioSpace
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              StudioSpace connects creators with beautifully designed studios
              and workspaces — so every idea finds the right place to come to
              life.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors duration-300 hover:bg-[#6D4AFF]"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Studio Categories */}
          <div className="lg:col-span-3">
            <ColumnHeading>Popular Studio Categories</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {popularCategories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <ColumnHeading>Stay in the Creative Loop</ColumnHeading>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              New studios, creative tips, and exclusive offers — straight to
              your inbox, no spam.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <Input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-10 flex-1 border-white/15 bg-white/5 text-white placeholder:text-white/50 focus-visible:border-[#6D4AFF] focus-visible:ring-[#6D4AFF]/40"
              />
              <Button
                type="button"
                className="h-10 bg-[#F4A340] px-4 text-[#191035] hover:bg-[#ffb04a]"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-white/60">
            © 2026 StudioSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
