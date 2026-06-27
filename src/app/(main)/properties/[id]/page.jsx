"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getPropertyById } from "@/services/propertyApi";
import { addFavorite } from "@/services/favoriteApi";
import { MapPin } from "lucide-react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const result = await getPropertyById(params.id);
        setProperty(result);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) loadProperty();
  }, [params]);

  // ==================== ADD TO FAVORITES ====================
  const handleFavorite = async () => {
    if (!session?.user?.email) {
      toast.error("Please login to add favorites");
      return;
    }

    const favoriteData = {
      propertyId: property._id,
      propertyTitle: property.title,
      propertyImage: property.image,
      rent: property.rent,
      location: property.location,
      userEmail: session.user.email,
    };

    try {
      const result = await addFavorite(favoriteData);

      if (result?.message === "Already Added") {
        toast("Already in Favorites ❤️", { 
          icon: "❤️", 
          duration: 2000 
        });
      } else if (result?.insertedId) {
        toast.success("Added to Favorites ❤️");
      } else {
        toast.error("Failed to add favorite");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ==================== BOOK NOW ====================
  const handleBooking = () => {
    if (!session?.user?.email) {
      toast.error("Please login to book this property");
      return;
    }

    if (session.user.email === property.ownerEmail) {
      toast.error("You cannot book your own property");
      return;
    }

    const bookingData = {
      propertyId: property._id,
      propertyTitle: property.title,
      propertyImage: property.image,
      ownerName: property.ownerName,
      ownerEmail: property.ownerEmail,
      tenantName: session.user.name,
      tenantEmail: session.user.email,
      rent: property.rent,
      location: property.location,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push("/payment");
    toast.success("Redirecting to secure payment...");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  if (!property) {
    return <div className="text-center py-20 text-3xl">Property Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[580px] object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary text-lg px-5 py-3">{property.propertyType}</span>
              <span className={`badge ${property.status === "approved" ? "badge-success" : "badge-warning"} text-lg px-5 py-3`}>
                {property.status || "Pending"}
              </span>
            </div>

            <h1 className="text-5xl font-bold mt-6 leading-tight">{property.title}</h1>
            
            <p className="text-2xl text-slate-600 dark:text-slate-400 mt-4 flex items-center gap-3">
              <MapPin size={28} /> {property.location}
            </p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-6xl font-bold text-teal-600">৳{property.rent}</span>
              <span className="text-2xl text-slate-500">/month</span>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow premium-card">
                <p className="text-5xl">🛏</p>
                <p className="text-2xl font-semibold mt-4">{property.bedrooms} Bedrooms</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow premium-card">
                <p className="text-5xl">🚿</p>
                <p className="text-2xl font-semibold mt-4">{property.bathrooms} Bathrooms</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow premium-card">
                <p className="text-5xl">🏠</p>
                <p className="text-2xl font-semibold mt-4">{property.propertyType}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-10 shadow">
              <h2 className="text-3xl font-semibold mb-6">Description</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {property.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl sticky top-8">
              <h3 className="text-2xl font-semibold mb-6">Property Owner</h3>
              <div className="space-y-4 text-lg">
                <p><strong>Name:</strong> {property.ownerName}</p>
                <p><strong>Email:</strong> {property.ownerEmail}</p>
              </div>

              <div className="mt-10 space-y-4">
                <button
                  onClick={handleFavorite}
                  className="w-full py-5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-semibold transition text-lg"
                >
                  ❤️ Add to Favorites
                </button>

                <button
                  onClick={handleBooking}
                  className="w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold text-xl shadow-lg hover:brightness-110 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}