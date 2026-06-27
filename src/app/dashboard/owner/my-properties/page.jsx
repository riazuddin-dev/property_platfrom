"use client";

import { useEffect, useState } from "react";
import { getMyProperties, deleteProperty } from "@/services/propertyApi";
import Swal from "sweetalert2";
import Link from "next/link";
import { MapPin, Edit, Trash2, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyProperties() {
  const { data: session } = authClient.useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getMyProperties(session.user.email); // ← Fixed: email pass kora hoyeche
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, [session]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter(p => p._id !== id));
        Swal.fire("Deleted!", "Your property has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">My Properties</h1>
          <p className="text-slate-400 mt-1">Manage all your listed properties</p>
        </div>
        <Link
          href="/dashboard/owner/add-property"
          className="flex items-center gap-3 bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-2xl text-white font-semibold transition"
        >
          <Plus size={20} /> Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl py-24 text-center border border-slate-700">
          <div className="mx-auto w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8">
            🏠
          </div>
          <h3 className="text-3xl font-semibold text-white">No Properties Listed Yet</h3>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            You haven't listed any properties yet. Start earning by adding your first property.
          </p>
          <Link
            href="/dashboard/owner/add-property"
            className="mt-10 inline-block bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition flex items-center gap-2 mx-auto"
          >
            <Plus size={20} /> List Your First Property
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <div key={property._id} className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 hover:border-teal-500 transition-all group">
              <div className="relative h-64">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute top-5 right-5">
                  <span className={`px-5 py-2 text-sm font-medium rounded-2xl capitalize
                    ${property.status === 'approved' ? 'bg-emerald-500 text-white' : property.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                    {property.status}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold line-clamp-2">{property.title}</h3>
                <p className="flex items-center gap-2 mt-3 text-slate-400">
                  <MapPin size={18} /> {property.location}
                </p>

                <div className="mt-6 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-400">Rent</p>
                    <p className="text-3xl font-bold text-teal-400">৳{property.rent}</p>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/dashboard/owner/edit-property/${property._id}`} className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition">
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="p-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-2xl transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}