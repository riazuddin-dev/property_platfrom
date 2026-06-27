"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById, updateProperty } from "@/services/propertyApi";
import Swal from "sweetalert2";

export default function EditProperty() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await getPropertyById(params.id);
        setProperty(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Property not found", "error");
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const updatedData = {
        title: property.title,
        description: property.description,
        location: property.location,
        rent: Number(property.rent),
        image: property.image,
        bedrooms: Number(property.bedrooms),
        bathrooms: Number(property.bathrooms),
        propertySize: Number(property.propertySize),
        amenities: property.amenities,
      };

      const result = await updateProperty(params.id, updatedData);
      
      if (result.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
          text: "Property has been updated.",
        });
        router.push("/dashboard/owner/my-properties");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update property", "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="loading loading-spinner loading-lg text-teal-500"></span></div>;
  }

  if (!property) {
    return <div className="p-8 text-center text-red-400">Property not found</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Edit Property</h1>
        <button onClick={() => router.back()} className="text-teal-400 hover:underline">← Back</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 rounded-3xl p-10 border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Property Title</label>
            <input name="title" value={property.title || ""} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Location</label>
            <input name="location" value={property.location || ""} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Rent (৳)</label>
            <input name="rent" type="number" value={property.rent || ""} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Image URL</label>
            <input name="image" value={property.image || ""} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Bedrooms</label>
            <input name="bedrooms" type="number" value={property.bedrooms || ""} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Bathrooms</label>
            <input name="bathrooms" type="number" value={property.bathrooms || ""} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Description</label>
          <textarea name="description" value={property.description || ""} onChange={handleChange} rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-3xl px-5 py-4" />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Amenities</label>
          <input name="amenities" value={property.amenities || ""} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4" placeholder="WiFi, Parking, etc." />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-teal-500 hover:bg-teal-600 py-5 rounded-2xl text-xl font-semibold disabled:opacity-70"
        >
          {updating ? "Updating Property..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}