import Image from "next/image"
import { MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export type Studio = {
  /** Maps to MongoDB `_id` once fetched from the API */
  _id: string
  title: string
  rate: string
  deposit: string
  capacity: string
  location: string
  overview: string
  category: string
  amenities: string[]
  imageUrl: string
  username: string
  useremail: string
}

function StudioCard({ studio }: { studio: Studio }) {
  return (
    <Card className="group flex flex-col overflow-hidden p-0 ring-1 ring-border transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-md"
        >
          {studio.category}
        </Badge>
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 gap-1 bg-background/90 text-foreground backdrop-blur-md"
        >
          <Star className="size-3 fill-[#F4A340] text-[#F4A340]" />
          {4.5}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-base font-semibold leading-snug">
          {studio.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          {studio.location}
        </p>
        <p className="mt-auto pt-2 text-lg font-semibold text-brand-text">
          ${studio.rate}
          <span className="text-sm font-normal text-muted-foreground"> / hr</span>
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
      <Link href={`/studios/All-studios/${studio._id}`}>  <Button className="w-full bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]">
          View Details
        </Button></Link>
      </CardFooter>
    </Card>
  )
}

export { StudioCard }
