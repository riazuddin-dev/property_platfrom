"use client";

const locations = [
  {
    id: 1,
    name: "Dhaka",
    properties: "3,500+ Properties",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  },
  {
    id: 2,
    name: "Uttara",
    properties: "1,200+ Properties",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  },
  {
    id: 3,
    name: "Gulshan",
    properties: "950+ Properties",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
  },
  {
    id: 4,
    name: "Savar",
    properties: "800+ Properties",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650",
  },
];

export default function TopLocations() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center">
          <p className="text-teal-500 font-semibold uppercase tracking-wider">
            Top Locations
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Discover Popular Locations
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Explore the most sought-after rental destinations with
            thousands of verified properties.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {locations.map((location) => (
            <div
              key={location.id}
              className="group relative overflow-hidden rounded-[32px] h-[320px] cursor-pointer"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-3xl font-bold">
                  {location.name}
                </h3>

                <p className="text-white/80 mt-2">
                  {location.properties}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}