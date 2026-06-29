"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, MapPin, BedDouble, Bath, Maximize, Calendar, 
  Phone, Mail, Share2, Star, Send, X, Home, Shield,
  CheckCircle, AlertCircle, User, Sparkles
} from "lucide-react";
import { getPropertyById } from "@/services/propertyApi";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import BookingModal from "@/components/shared/booking/BookingModel";
import ReviewSection from "@/components/shared/review/ReviewSection";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(params.id);
        setProperty(data);
        
        // Check if already favorited
        if (session?.user?.email) {
          const favoritesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
            credentials: "include"
          });
          const favorites = await favoritesRes.json();
          const isFav = favorites.some(f => f.propertyId === params.id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("Error loading property:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load property details"
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadProperty();
  }, [params.id, session]);

  const handleFavoriteToggle = async () => {
    if (!session?.user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to save favorites"
      });
      router.push("/login");
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        const favoritesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
          credentials: "include"
        });
        const favorites = await favoritesRes.json();
        const fav = favorites.find(f => f.propertyId === params.id);
        
        if (fav) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${fav._id}`, {
            method: "DELETE",
            credentials: "include"
          });
        }
        
        setIsFavorite(false);
        Swal.fire({
          icon: "success",
          title: "Removed!",
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        // Add to favorites
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            propertyId: property._id,
            propertyTitle: property.title,
            propertyImage: property.image || property.images?.[0],
            location: property.location,
            rent: property.rent,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
          })
        });
        
        setIsFavorite(true);
        Swal.fire({
          icon: "success",
          title: "Added to Favorites!",
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error("Favorite error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update favorites"
      });
    }
  };

  const handleBookNow = () => {
    if (!session?.user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book this property"
      });
      router.push("/login");
      return;
    }

    if (session.user.email === property.ownerEmail) {
      Swal.fire({
        icon: "error",
        title: "Cannot Book",
        text: "You cannot book your own property"
      });
      return;
    }

    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-white mb-2">Property Not Found</h2>
          <button
            onClick={() => router.push("/properties")}
            className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [property.image];

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-sm text-slate-400 flex items-center gap-2"
        >
          <button onClick={() => router.push("/")} className="hover:text-teal-400 transition">Home</button>
          <span>/</span>
          <button onClick={() => router.push("/properties")} className="hover:text-teal-400 transition">Properties</button>
          <span>/</span>
          <span className="text-white">{property.title}</span>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10">
            <img
              src={images[activeImage] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"}
              alt={property.title}
              className="w-full h-[500px] object-cover"
            />
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all group"
            >
              <Heart 
                size={24} 
                className={`transition-all ${isFavorite ? "text-red-500 fill-red-500" : "text-white group-hover:text-red-400"}`}
              />
            </button>

            {/* Status Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-full backdrop-blur-md">
                {property.status?.toUpperCase()}
              </span>
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? "border-teal-500 scale-110" : "border-white/20 opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Title & Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={18} className="text-teal-400" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Starting from</p>
                  <p className="text-4xl font-bold text-teal-400">৳{property.rent?.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">per {property.rentType || "month"}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-500/10 rounded-xl">
                    <BedDouble size={20} className="text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Bedrooms</p>
                    <p className="text-lg font-bold text-white">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <Bath size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Bathrooms</p>
                    <p className="text-lg font-bold text-white">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Maximize size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Size</p>
                    <p className="text-lg font-bold text-white">{property.size} sqft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <Home size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Type</p>
                    <p className="text-lg font-bold text-white">{property.propertyType}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-teal-400" size={24} />
                About This Property
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                {property.description}
              </p>
            </motion.div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5"
                    >
                      <CheckCircle size={18} className="text-teal-400 flex-shrink-0" />
                      <span className="text-slate-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews Section */}
            <ReviewSection propertyId={params.id} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Book Property Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 text-white sticky top-6"
            >
              <div className="mb-6">
                <p className="text-teal-100 text-sm mb-2">Price</p>
                <p className="text-5xl font-bold mb-1">৳{property.rent?.toLocaleString()}</p>
                <p className="text-teal-100">per {property.rentType || "month"}</p>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-white text-teal-600 rounded-2xl font-bold text-lg hover:bg-teal-50 transition-all shadow-lg mb-3 flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Book Now
              </button>

              <button
                onClick={handleFavoriteToggle}
                className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
              </button>

              <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                <div className="flex items-center gap-3 text-teal-100 text-sm">
                  <Shield size={16} />
                  <span>Verified Property</span>
                </div>
                <div className="flex items-center gap-3 text-teal-100 text-sm">
                  <CheckCircle size={16} />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-teal-100 text-sm">
                  <Sparkles size={16} />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* Owner Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <User className="text-teal-400" size={20} />
                Property Owner
              </h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                  {property.ownerName?.charAt(0) || "O"}
                </div>
                <div>
                  <p className="font-semibold text-white">{property.ownerName}</p>
                  <p className="text-sm text-slate-400">Verified Owner</p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${property.ownerEmail}`}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition group"
                >
                  <Mail size={18} className="text-teal-400" />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">{property.ownerEmail}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <BookingModal
            property={property}
            onClose={() => setShowBookingModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}