// src/app/dashboard/admin/properties/page.jsx
"use client";

import { useEffect, useState } from "react";
import { getAllAdminProperties, updatePropertyStatus } from "@/services/propertyApi";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, Eye, MapPin } from "lucide-react";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setError(null);
        const data = await getAllAdminProperties();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Properties Load Error:", err);
        setError("Failed to load properties");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const handleStatus = async (id, status) => {
    let feedback = "";

    if (status === "rejected") {
      const { value } = await Swal.fire({
        title: "Rejection Reason",
        input: "textarea",
        inputPlaceholder: "Why are you rejecting this property?",
        showCancelButton: true,
      });
      feedback = value || "Rejected by admin";
    }

    const confirm = await Swal.fire({
      title: status === "approved" ? "Approve Property?" : "Reject Property?",
      icon: status === "approved" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#14b8a6" : "#ef4444",
    });

    if (confirm.isConfirmed) {
      try {
        await updatePropertyStatus(id, status, feedback);
        setProperties(prev => prev.map(p => p._id === id ? { ...p, status, feedback } : p));
        Swal.fire("Success!", `Property ${status}`, "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update property", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[70vh] bg-slate-950">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Manage Properties</h1>
        <p className="text-slate-400 mt-2 text-lg">Review and moderate all listed properties</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80">
                <th className="text-left p-6">Property</th>
                <th className="text-left p-6">Owner</th>
                <th className="text-left p-6">Location</th>
                <th className="text-left p-6">Rent</th>
                <th className="text-center p-6">Status</th>
                <th className="text-center p-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <tr 
                    key={property._id} 
                    className="border-b border-slate-700 hover:bg-slate-800/50 transition group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-16 h-16 object-cover rounded-2xl" 
                        />
                        <div>
                          <p className="font-semibold text-white line-clamp-1">{property.title}</p>
                          <p className="text-sm text-slate-400">{property.propertyType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-medium">{property.ownerName}</p>
                      <p className="text-xs text-slate-400">{property.ownerEmail}</p>
                    </td>
                    <td className="p-6 text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {property.location}
                      </div>
                    </td>
                    <td className="p-6 font-semibold text-teal-400">৳{property.rent}</td>
                    <td className="p-6 text-center">
                      <span className={`inline-block px-6 py-2 rounded-2xl text-sm font-medium capitalize
                        ${property.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                          property.status === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {property.status || "pending"}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-3 justify-center">
                        {property.status === "pending" && (
                          <>
                            <button 
                              onClick={() => handleStatus(property._id, "approved")} 
                              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-medium transition flex items-center gap-2"
                            >
                              <CheckCircle size={18} /> Approve
                            </button>
                            <button 
                              onClick={() => handleStatus(property._id, "rejected")} 
                              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-2xl text-sm font-medium transition flex items-center gap-2"
                            >
                              <XCircle size={18} /> Reject
                            </button>
                          </>
                        )}
                        {property.feedback && (
                          <button 
                            onClick={() => Swal.fire("Rejection Feedback", property.feedback, "info")} 
                            className="p-3 text-teal-400 hover:bg-slate-700 rounded-2xl transition"
                          >
                            <Eye size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-slate-400">
                    No properties found.<br />
                    <span className="text-sm">Properties will appear here after owners add them.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}