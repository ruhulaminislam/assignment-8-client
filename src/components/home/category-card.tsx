import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type CategoryCardProps = {
  name: string
  image: string
  href: string
  className?: string
}

function CategoryCard({ name, image, href, className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block shrink-0 overflow-hidden rounded-xl ring-1 ring-border transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 18vw"
        />
      </div>
      <p className="px-2 py-3 text-center text-sm font-medium transition-colors group-hover:text-[#6D4AFF]">
        {name}
      </p>
    </Link>
  )
}

export { CategoryCard }
