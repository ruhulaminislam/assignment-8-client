"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Aperture,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios/All-studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-full items-center px-1 text-[15px] font-medium transition-colors duration-200",
        isActive
          ? "text-[#6D4AFF]"
          : "text-muted-foreground hover:text-[#6D4AFF]"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-0.5 rounded-full transition-all duration-300",
          isActive ? "bg-[#6D4AFF]" : "bg-transparent"
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

export function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, isPending } = authClient.useSession()
  if (isPending) return <div className="loading"></div>
  const user = session?.user
  const haddleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login") // redirect to login page
        },
      },
    })
  }
  return (
    <header className="sticky top-0 z-50 border-b border-[#6D4AFF]/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#6D4AFF] shadow-[0_4px_14px_rgba(109,74,255,0.35)]">
            <Aperture className="size-5 text-white" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Studio<span className="text-[#6D4AFF]">Space</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {user?.email ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      className="gap-2 border-[#6D4AFF]/25 py-1.5 pl-1.5 pr-3 hover:border-[#6D4AFF]/50 hover:bg-[#6D4AFF]/5"
                    >
                      <Avatar size="sm" className="ring-2 ring-[#6D4AFF]/40">
                        <AvatarImage
                          src={user?.image || ""}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-[#6D4AFF]/10 text-[#6D4AFF]">
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuGroup>
                    <div className="flex items-center gap-3 px-1.5 py-2">
                      <Avatar className="ring-2 ring-[#6D4AFF]/40">
                        <AvatarImage
                          src={user?.image || ""}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-[#6D4AFF]/10 text-[#6D4AFF]">
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <DropdownMenuLabel className="truncate p-0 text-sm text-foreground">
                          {user?.name?.toUpperCase()}
                        </DropdownMenuLabel>
                        <DropdownMenuLabel className="truncate p-0 text-xs text-muted-foreground">
                          {user?.email}
                        </DropdownMenuLabel>
                      </div>
                    </div>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-[#6D4AFF]/10" />
                  <DropdownMenuGroup className="space-y-0.5">
                    <DropdownMenuItem className="gap-2.5 px-2 py-2 text-[15px] focus:bg-[#6D4AFF]/10 focus:text-[#6D4AFF] [&>svg]:transition-colors [&>svg]:group-focus/dropdown-menu-item:text-[#6D4AFF]">
                      <LayoutDashboard className="text-muted-foreground" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem  className="gap-2.5 px-2 py-2 text-[15px] focus:bg-[#6D4AFF]/10 focus:text-[#6D4AFF] [&>svg]:transition-colors [&>svg]:group-focus/dropdown-menu-item:text-[#6D4AFF]">
                      <PlusCircle className="text-muted-foreground" />
                      <Link href="/studios/new"> Add New Studio</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2.5 px-2 py-2 text-[15px] focus:bg-[#6D4AFF]/10 focus:text-[#6D4AFF] [&>svg]:transition-colors [&>svg]:group-focus/dropdown-menu-item:text-[#6D4AFF]">
                      <Building2 className="text-muted-foreground" />
                      <Link href="/my-listings"> My Studio Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2.5 px-2 py-2 text-[15px] focus:bg-[#6D4AFF]/10 focus:text-[#6D4AFF] [&>svg]:transition-colors [&>svg]:group-focus/dropdown-menu-item:text-[#6D4AFF]">
                      <CalendarCheck className="text-muted-foreground" />
                      My Bookings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-[#6D4AFF]/10" />
                  <DropdownMenuItem
                    onClick={haddleLogout}
                    className="gap-2.5 px-2 py-2 text-[15px] focus:bg-[#6D4AFF]/10 focus:text-[#6D4AFF] [&>svg]:transition-colors [&>svg]:group-focus/dropdown-menu-item:text-[#6D4AFF]"
                  >
                    <LogOut className="text-muted-foreground" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-[#6D4AFF]/40 text-[#6D4AFF] transition-all duration-200 hover:border-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-[#6D4AFF]"
                render={<Link href="/login" />}
              >
                Login
              </Button>
              <Button
                className="bg-[#6D4AFF] text-white shadow-[0_4px_14px_rgba(109,74,255,0.35)] transition-all duration-200 hover:bg-[#5A3BD9] hover:shadow-[0_6px_18px_rgba(109,74,255,0.45)]"
                render={<Link href="/register" />}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#6D4AFF]/10 bg-background/95 backdrop-blur-md md:hidden">
          <div className="space-y-4 px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors duration-200",
                      isActive
                        ? "bg-[#6D4AFF]/10 text-[#6D4AFF]"
                        : "text-muted-foreground hover:bg-[#6D4AFF]/5 hover:text-[#6D4AFF]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
            <div className="flex flex-col gap-2 border-t border-[#6D4AFF]/10 pt-4">
              <Button
                variant="outline"
                className="border-[#6D4AFF]/40 text-[#6D4AFF] transition-all duration-200 hover:border-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-[#6D4AFF]"
                render={<Link href="/login" onClick={() => setOpen(false)} />}
              >
                Login
              </Button>
              <Button
                className="bg-[#6D4AFF] text-white shadow-[0_4px_14px_rgba(109,74,255,0.35)] transition-all duration-200 hover:bg-[#5A3BD9]"
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
