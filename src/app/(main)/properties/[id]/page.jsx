"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getPropertyById } from "@/services/propertyApi";
import { addFavorite } from "@/services/favoriteApi";
import { MapPin, ArrowLeft, Heart } from "lucide-react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const result = await getPropertyById(params.id);
        if (result) {
          setProperty(result);
        } else {
          toast.error("Property not found");
        }
      } catch (error) {
        console.error("Error loading property:", error);
        toast.error("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) loadProperty();
console.log("Property ID from URL:", params.id);
  }, [params]);

  const handleFavorite = async () => {
    if (!session?.user?.email) {
      toast.error("Please login to add to favorites");
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
        toast("Already in Favorites ❤️", { icon: "❤️" });
      } else if (result?.insertedId) {
        toast.success("Added to Favorites ❤️");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add favorite");
    }
  };

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
    toast.success("Redirecting to payment...");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-6">Property Not Found</h2>
        <p className="text-slate-400 mb-10 text-center max-w-md">
          The property you are looking for may have been removed or doesn't exist.
        </p>
        <button 
          onClick={() => router.push('/properties')}
          className="flex items-center gap-3 bg-teal-600 hover:bg-teal-700 px-8 py-4 rounded-2xl text-lg font-medium transition"
        >
          <ArrowLeft size={24} /> Back to All Properties
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-8"
        >
          <ArrowLeft /> Back to Properties
        </button>

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
              <span className="badge badge-primary text-lg px-6 py-3">{property.propertyType}</span>
              <span className={`badge ${property.status === "approved" ? "badge-success" : "badge-warning"} text-lg px-6 py-3`}>
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

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow">
                <p className="text-5xl">🛏</p>
                <p className="text-2xl font-semibold mt-4">{property.bedrooms} Bedrooms</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow">
                <p className="text-5xl">🚿</p>
                <p className="text-2xl font-semibold mt-4">{property.bathrooms} Bathrooms</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow">
                <p className="text-5xl">🏠</p>
                <p className="text-2xl font-semibold mt-4">{property.propertyType}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-10 shadow">
              <h2 className="text-3xl font-semibold mb-6">Description</h2>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {property.description || "No description available."}
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
                  className="w-full py-5 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-semibold transition text-lg flex items-center justify-center gap-2"
                >
                  <Heart /> Add to Favorites
                </button>

                <button
                  onClick={handleBooking}
                  className="w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold text-xl shadow-lg hover:brightness-110 transition"
                >
                  Book Now - ৳{property.rent}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}