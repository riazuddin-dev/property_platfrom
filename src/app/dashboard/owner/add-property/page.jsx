// src/app/dashboard/owner/add-property/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { addProperty } from "@/services/propertyApi";
import { authClient } from "@/lib/auth-client";
import { 
  Home, MapPin, DollarSign, BedDouble, Bath, Maximize, 
  FileText, Image as ImageIcon, Sparkles, Plus, X,
  Building2, Castle, Wifi, Car, Dumbbell, Waves,
  Wind, Shield, Tv, Utensils, WashingMachine,
  CheckCircle, Upload
} from "lucide-react";

export default function AddProperty() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    rentType: "Monthly",
    bedrooms: "",
    bathrooms: "",
    size: "",
    propertyType: "Apartment",
    description: "",
    images: [],
    amenities: [],
    extraFeatures: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const amenitiesList = [
    { name: "WiFi", icon: Wifi },
    { name: "Parking", icon: Car },
    { name: "Gym", icon: Dumbbell },
    { name: "Swimming Pool", icon: Waves },
    { name: "Air Conditioning", icon: Wind },
    { name: "Security", icon: Shield },
    { name: "TV", icon: Tv },
    { name: "Furnished", icon: Home },
    { name: "Kitchen", icon: Utensils },
    { name: "Laundry", icon: WashingMachine },
    { name: "Elevator", icon: Building2 },
    { name: "Balcony", icon: Castle },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAddImage = () => {
    if (currentImage.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, currentImage.trim()],
      });
      setCurrentImage("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!session?.user?.email) {
      Swal.fire({ icon: "error", title: "Login Required" });
      return;
    }

    if (formData.images.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please add at least one property image",
      });
      return;
    }

    setLoading(true);

    const propertyData = {
      ...formData,
      rent: Number(formData.rent),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      size: Number(formData.size) || 0,
      image: formData.images[0], // First image as main
      ownerName: session.user.name,
      ownerEmail: session.user.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const result = await addProperty(propertyData);
      if (result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Property Added Successfully!",
          text: "Waiting for admin approval",
          timer: 2500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push("/dashboard/owner/my-properties");
        }, 2500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add property",
        });
      }
    } catch (error) {
      console.error("Add property error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add property",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-teal-400 text-sm mb-4">
            <Sparkles size={16} />
            <span className="font-semibold">List Your Property</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Add New <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Property</span>
          </h1>
          <p className="text-slate-400 mt-3 text-lg">
            Fill in the details below to list your property for rent
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
        >
          {/* Basic Information */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Home className="text-white" size={20} />
              </div>
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="Luxury 3BHK Apartment in Gulshan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <MapPin size={14} className="text-teal-400" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="Gulshan, Dhaka"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white cursor-pointer transition-all"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="Office">Office</option>
                  <option value="Shop">Shop</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Size */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <DollarSign className="text-white" size={20} />
              </div>
              Pricing & Size
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Rent Amount (৳) *
                </label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="25000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Rent Type *
                </label>
                <select
                  name="rentType"
                  value={formData.rentType}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white cursor-pointer transition-all"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Maximize size={14} className="text-teal-400" />
                  Property Size (sqft)
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="1200"
                />
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <BedDouble className="text-white" size={20} />
              </div>
              Rooms
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <BedDouble size={14} className="text-teal-400" />
                  Bedrooms *
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Bath size={14} className="text-teal-400" />
                  Bathrooms *
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="2"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <ImageIcon className="text-white" size={20} />
              </div>
              Property Images
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentImage}
                  onChange={(e) => setCurrentImage(e.target.value)}
                  className="flex-1 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all"
                  placeholder="Paste image URL (https://...)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-6 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Property ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-xl border border-white/10"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400";
                        }}
                      />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-teal-500 text-white text-xs rounded-lg font-semibold">
                          Main
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-slate-400">
                💡 Added {formData.images.length} image(s). First image will be the main cover.
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <CheckCircle className="text-white" size={20} />
              </div>
              Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesList.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = formData.amenities.includes(amenity.name);
                return (
                  <button
                    key={amenity.name}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity.name)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-teal-500/20 border-teal-500/50 text-teal-400"
                        : "bg-slate-800/50 border-white/10 text-slate-400 hover:border-teal-500/30"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </button>
                );
              })}
            </div>

            {formData.amenities.length > 0 && (
              <p className="text-xs text-slate-400 mt-3">
                ✅ Selected: {formData.amenities.join(", ")}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                <FileText className="text-white" size={20} />
              </div>
              Description
            </h2>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all resize-none"
              placeholder="Describe your property in detail - location advantages, nearby facilities, special features..."
            />
          </div>

          {/* Extra Features */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              Extra Features
            </h2>

            <textarea
              name="extraFeatures"
              value={formData.extraFeatures}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl px-5 py-4 outline-none text-white placeholder:text-slate-500 transition-all resize-none"
              placeholder="Any extra features (e.g., Recently renovated, Rooftop access, Garden view...)"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Upload size={20} />
                List Property
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-slate-400 mt-4">
            ⚠️ Your property will be reviewed by admin before being published
          </p>
        </motion.form>
      </div>
    </div>
  );
}