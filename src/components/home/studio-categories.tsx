import { CategoryCard } from "@/components/home/category-card"

type StudioCategory = {
  name: string
  image: string
  /** Value passed as ?category= in the /studios URL */
  slug: string
}

/**
 * Dummy category data, kept separate from the card JSX.
 * Replace or extend when the studios API is connected.
 */
const studioCategories: StudioCategory[] = [
  {
    name: "Photo Studios",
    image: "/image/categories/photo-studios.jpg",
    slug: "photo",
  },
  {
    name: "Sound Stages",
    image: "/image/categories/sound-stage.jpg",
    slug: "sound-stage",
  },
  {
    name: "Podcast Rooms",
    image: "/image/categories/podcast-rooms.jpg",
    slug: "podcast",
  },
  {
    name: "Music Suites",
    image: "/image/categories/music-suites.jpg",
    slug: "music",
  },
  {
    name: "Art Workshops",
    image: "/image/categories/art-workshops.jpg",
    slug: "art",
  },
]

export function StudioCategories() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Browse by Studio Categories
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Find the perfect space for your craft — from photography and
          recording to podcasts, music, and hands-on workshops.
        </p>
      </div>

      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:pb-0">
        {studioCategories.map((category) => (
          <CategoryCard
            key={category.slug}
            name={category.name}
            image={category.image}
            href={`/studios?category=${category.slug}`}
            className="w-44 md:w-auto"
          />
        ))}
      </div>
    </section>
  )
}
