import { StudioCard, type Studio } from "@/components/home/studio-card"

/**
 * Dummy data shaped like a future MongoDB API response.
 * Replace this array with fetched data when the API is connected.
 */
const featuredStudios: Studio[] = [
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d1",
    title: "Lumen Photography Studio",
    category: "Photography",
    image: "/image/hero/kobu-agency-O8AtzoQcnY4-unsplash.jpg",
    pricePerHour: 45,
    rating: 4.9,
    location: "Brooklyn, New York",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d2",
    title: "Echo Wave Recording Room",
    category: "Music",
    image: "/image/hero/studio-lego-EYQ6vraGu_I-unsplash.jpg",
    pricePerHour: 60,
    rating: 4.8,
    location: "Austin, Texas",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d3",
    title: "Signal Talk Podcast Suite",
    category: "Podcast",
    image: "/image/hero/rodrigo-rodrigues-wolf-r-t-XlKnIuk85y8-unsplash.jpg",
    pricePerHour: 35,
    rating: 4.7,
    location: "Los Angeles, California",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d4",
    title: "Golden Hour Photo Loft",
    category: "Photography",
    image: "/image/hero/kobu-agency-O8AtzoQcnY4-unsplash.jpg",
    pricePerHour: 50,
    rating: 4.6,
    location: "Seattle, Washington",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d5",
    title: "Analog Vibes Music Room",
    category: "Music",
    image: "/image/hero/studio-lego-EYQ6vraGu_I-unsplash.jpg",
    pricePerHour: 55,
    rating: 5,
    location: "Nashville, Tennessee",
  },
  {
    id: "65f1a2b3c4d5e6f7a8b9c0d6",
    title: "Prime Cast Podcast Studio",
    category: "Podcast",
    image: "/image/hero/rodrigo-rodrigues-wolf-r-t-XlKnIuk85y8-unsplash.jpg",
    pricePerHour: 40,
    rating: 4.5,
    location: "Chicago, Illinois",
  },
]

export function FeaturedStudios() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Featured Studios
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Handpicked spaces for photographers, musicians, and podcasters.
          Book by the hour and start creating today.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredStudios.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
        ))}
      </div>
    </section>
  )
}
