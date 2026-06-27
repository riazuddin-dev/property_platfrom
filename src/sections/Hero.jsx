import Image from "next/image";
import { MapPin, Home, DollarSign, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070"
          alt="Luxury Home"
          fill
          className="object-cover brightness-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-10">
        <div className="bg-white/95 backdrop-blur-3xl border border-white/60 rounded-3xl p-12 md:p-20 shadow-2xl max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-600 text-sm px-6 py-2.5 rounded-full mb-8 font-medium">
              ✨ A Vision for Your Life
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-none tracking-tighter">
              Find Your Best
              <span className="block text-teal-500 mt-3">REAL ESTATE</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Explore luxury properties suited to your preferences. Discover extraordinary homes and book with confidence.
            </p>
          </div>

          <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-3 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex items-center gap-4 px-6 py-6 border border-slate-200 rounded-2xl">
                <MapPin className="text-teal-500" size={28} />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Location</p>
                  <input type="text" defaultValue="Dhaka, Bangladesh" className="w-full bg-transparent outline-none text-lg mt-1 font-medium" />
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4 px-6 py-6 border border-slate-200 rounded-2xl">
                <Home className="text-teal-500" size={28} />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Property Type</p>
                  <select className="w-full bg-transparent outline-none text-lg mt-1 font-medium">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4 px-6 py-6 border border-slate-200 rounded-2xl">
                <DollarSign className="text-teal-500" size={28} />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Price Range</p>
                  <select className="w-full bg-transparent outline-none text-lg mt-1 font-medium">
                    <option>Any Price</option>
                    <option>৳10k - 30k</option>
                    <option>৳30k - 60k</option>
                  </select>
                </div>
              </div>

              <button className="lg:w-auto w-full bg-teal-500 hover:bg-teal-600 text-white px-14 py-6 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg transition">
                <Search size={28} /> Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}