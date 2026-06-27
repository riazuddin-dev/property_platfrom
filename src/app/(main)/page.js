import CTA from "@/sections/CTA";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Hero from "@/sections/Hero";
import Reviews from "@/sections/Reviews";
import TopLocations from "@/sections/TopLocations";
import TrustedBy from "@/sections/TrustedBy";
import WhyChooseUs from "@/sections/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <Hero></Hero>
      <TrustedBy></TrustedBy>
      <FeaturedProperties></FeaturedProperties>
      <WhyChooseUs></WhyChooseUs>
      <TopLocations></TopLocations>
      <Reviews></Reviews>
      <CTA></CTA>
   
    </div>
  );
}
