"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Aperture, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about-us" },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-full items-center text-sm font-medium transition-colors hover:text-[#6D4AFF]",
        isActive ? "text-[#6D4AFF]" : "text-muted-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-0 -bottom-px h-0.5 rounded-full",
          isActive ? "bg-[#6D4AFF]" : "bg-transparent"
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Aperture className="size-6 text-[#6D4AFF]" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">
            StudioSpace
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            className="border-[#6D4AFF]/40 text-[#6D4AFF] hover:border-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-[#6D4AFF]"
            render={<Link href="/login" />}
          >
            Login
          </Button>
          <Button
            className="bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
            render={<Link href="/register" />}
          >
            Register
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <div className="space-y-4 px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-[#6D4AFF]",
                      isActive ? "text-[#6D4AFF]" : "text-muted-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="border-[#6D4AFF]/40 text-[#6D4AFF] hover:border-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-[#6D4AFF]"
                render={<Link href="/login" onClick={() => setOpen(false)} />}
              >
                Login
              </Button>
              <Button
                className="bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
                render={<Link href="/register" onClick={() => setOpen(false)} />}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
