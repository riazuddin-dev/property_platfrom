import CTA from "@/sections/CTA";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Hero from "@/sections/Hero";
import Reviews from "@/sections/Reviews";
import TopLocations from "@/sections/TopLocations";
import TrustedBy from "@/sections/TrustedBy";
import WhyChooseUs from "@/sections/WhyChoose";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col bg-white font-sans dark:bg-slate-950">
      <Hero />
      <TrustedBy />
      <FeaturedProperties />
      <WhyChooseUs />
      <TopLocations />
      <Reviews />
      <CTA />
    </div>
  );
}
