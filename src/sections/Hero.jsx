import Image from "next/image";
import { MapPin, Home, DollarSign, Search, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070"
          alt="Luxury Home"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm mb-6">
            ✨ Find Your Dream Home Today
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight tracking-tighter">
            Discover Premium
            <span className="block text-teal-400">Rental Properties</span>
          </h1>

          <p className="mt-6 text-xl text-white/80 max-w-2xl">
            Connect with verified property owners. Book with confidence through our secure platform.
          </p>

          {/* Search Bar */}
          <div className="mt-10 bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-3 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 flex items-center gap-4 px-6 py-5 border border-slate-200 rounded-2xl">
                <MapPin className="text-teal-600" size={28} />
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <input 
                    type="text" 
                    defaultValue="Dhaka, Bangladesh" 
                    className="w-full bg-transparent outline-none text-lg font-medium mt-1" 
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4 px-6 py-5 border border-slate-200 rounded-2xl">
                <Home className="text-teal-600" size={28} />
                <div>
                  <p className="text-xs text-slate-500">Property Type</p>
                  <select className="w-full bg-transparent outline-none text-lg font-medium mt-1">
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex items-center gap-4 px-6 py-5 border border-slate-200 rounded-2xl">
                <DollarSign className="text-teal-600" size={28} />
                <div>
                  <p className="text-xs text-slate-500">Price Range</p>
                  <select className="w-full bg-transparent outline-none text-lg font-medium mt-1">
                    <option>Any Price</option>
                    <option>৳10,000 - 30,000</option>
                    <option>৳30,000 - 80,000</option>
                  </select>
                </div>
              </div>

              <button className="lg:w-auto w-full bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg transition-all active:scale-95">
                Search <Search size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowRight size={28} className="text-white rotate-90" />
      </div>
    </section>
  );
}