import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { StudioCategories } from "@/components/home/studio-categories";
import { HowBookingWorks } from "@/components/home/how-booking-works";
import { HostGuarantee } from "@/components/home/host-guarantee";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <HeroSlider />
      </div>
      <FeaturedStudios />
      <StudioCategories />
      <HowBookingWorks />
      <HostGuarantee />
    </main>
  );
}
