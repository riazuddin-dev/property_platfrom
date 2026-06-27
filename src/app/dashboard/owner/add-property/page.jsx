// src/app/dashboard/owner/add-property/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { addProperty } from "@/services/propertyApi";
import { authClient } from "@/lib/auth-client";

export default function AddProperty() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "Apartment",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      Swal.fire({ icon: "error", title: "Login Required" });
      return;
    }

    setLoading(true);

    const propertyData = {
      ...formData,
      rent: Number(formData.rent),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      ownerName: session.user.name,
    };

    try {
      const result = await addProperty(propertyData);
      if (result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Property Added Successfully!",
          text: "Waiting for admin approval",
        });
        router.push("/dashboard/owner/my-properties");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to add property" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">List New Property</h1>
        <p className="text-slate-400 mt-2">Share your property with potential tenants</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 rounded-3xl p-12 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-2">Property Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
              placeholder="Luxury 3BHK Apartment in Gulshan"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
              placeholder="Gulshan, Dhaka"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Monthly Rent (৳)</label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-teal-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-slate-800 border border-slate-700 rounded-3xl px-6 py-5 focus:outline-none focus:border-teal-500"
              placeholder="Beautiful apartment with modern amenities..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-10 w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold text-xl hover:brightness-110 transition disabled:opacity-70"
        >
          {loading ? "Submitting..." : "List Property"}
        </button>
      </form>
    </div>
  );
}