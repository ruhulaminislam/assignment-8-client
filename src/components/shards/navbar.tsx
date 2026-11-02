"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Aperture,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  LogOut,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode"

// ---------- Data (শুধু এখানে বদলালেই হবে) ----------
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios/All-studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
]

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/studios/add-studio", icon: PlusCircle },
  { label: "My Studio Listings", href: "/my-listings", icon: Building2 },
  { label: "My Bookings", href: "/My-bookings", icon: CalendarCheck },
]

// Dropdown Item-এর সব style এক জায়গায়
const itemClass =
  "gap-2.5 px-2 py-2 text-[15px] focus:bg-[#6D4AFF]/10 focus:text-brand-text"

// ---------- ছোট Component ----------
function NavLink({ href, label }: { href: string; label: string }) {
  const isActive = usePathname() === href

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative whitespace-nowrap py-2 text-sm font-medium transition-colors md:text-[15px]",
        isActive ? "text-brand-text" : "text-muted-foreground hover:text-brand-text"
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-0.5 rounded-full",
          isActive ? "bg-[#6D4AFF]" : "bg-transparent"
        )}
      />
    </Link>
  )
}

function UserAvatar({ user, size }: { user: any; size?: "sm" }) {
  return (
    <Avatar size={size} className="ring-2 ring-[#6D4AFF]/40">
      <AvatarImage src={user.image || ""} alt={user.name || "User"} />
      <AvatarFallback className="bg-[#6D4AFF]/10 text-brand-text">
        {user.name?.[0]?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  )
}

function UserMenu({ user }: { user: any }) {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push("/login") },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="gap-2 border-[#6D4AFF]/25 py-1.5 pl-1.5 pr-3 hover:border-[#6D4AFF]/50 hover:bg-[#6D4AFF]/5"
          >
            <UserAvatar user={user} size="sm" />
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-64">
        {/* User info */}
        <DropdownMenuGroup>
          <div className="flex items-center gap-3 px-1.5 py-2">
            <UserAvatar user={user} />
            <div className="min-w-0">
              <DropdownMenuLabel className="truncate p-0 text-sm text-foreground">
                {user.name?.toUpperCase()}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="truncate p-0 text-xs text-muted-foreground">
                {user.email}
              </DropdownMenuLabel>
            </div>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#6D4AFF]/10" />

        {/* Menu Items (Array থেকে Loop) */}
        <DropdownMenuGroup className="space-y-0.5">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <DropdownMenuItem
              key={href}
              className={itemClass}
              render={<Link href={href} />}
            >
              <Icon className="text-muted-foreground" />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#6D4AFF]/10" />

        <DropdownMenuItem onClick={handleLogout} className={itemClass}>
          <LogOut className="text-muted-foreground" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AuthButtons() {
  return (
    <>
      <Button
        variant="outline"
        className="border-[#6D4AFF]/40 text-brand-text hover:border-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-brand-text"
        render={<Link href="/login" />}
      >
        Login
      </Button>
      <Button
        className="bg-[#6D4AFF] text-white shadow-[0_4px_14px_rgba(109,74,255,0.35)] hover:bg-[#5A3BD9]"
        render={<Link href="/register" />}
      >
        Register
      </Button>
    </>
  )
}

// ---------- মূল Navbar ----------
export function Navbar() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return <div className="loading"></div>

  const user = session?.user

  return (
    <header className="sticky top-0 z-50 border-b border-[#6D4AFF]/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-3 px-4 py-2 sm:px-6 md:h-16 md:py-0 lg:px-8">
        {/* ১. Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#6D4AFF] shadow-[0_4px_14px_rgba(109,74,255,0.35)]">
            <Aperture className="size-5 text-white" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Studio<span className="text-brand-text">Space</span>
          </span>
        </Link>

        {/* ২. Nav Links: Mobile-এ নিচে (order-last), PC-তে মাঝখানে */}
        <nav
          aria-label="Main"
          className="order-last flex w-full gap-5 overflow-x-auto md:order-none md:w-auto md:gap-6 md:overflow-visible"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* ৩. Actions: সব Screen-এ একই */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {user?.email ? <UserMenu user={user} /> : <AuthButtons />}
        </div>
      </div>
    </header>
  )
}