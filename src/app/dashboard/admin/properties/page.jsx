// src/app/dashboard/admin/properties/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// পরিবর্তন করো:
import { getAllPropertiesAdmin, updatePropertyStatus } from "@/services/propertyApi";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, Eye, MapPin, Building2, Loader2 } from "lucide-react";

export default function AdminProperties() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setError(null);
        const data = await getAllPropertiesAdmin()
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
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
      });
      
      if (!value) {
        Swal.fire("Cancelled", "Rejection cancelled", "info");
        return;
      }
      
      feedback = value;
    }

    const confirm = await Swal.fire({
      title: status === "approved" ? "Approve Property?" : "Reject Property?",
      text: status === "approved" 
        ? "This property will be visible to all tenants" 
        : "This property will be hidden from tenants",
      icon: status === "approved" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#14b8a6" : "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: status === "approved" ? "Yes, Approve" : "Yes, Reject",
    });

    if (confirm.isConfirmed) {
      try {
        const result = await updatePropertyStatus(id, status, feedback);
        
        if (result.modifiedCount > 0 || result.matchedCount > 0) {
          setProperties(prev => 
            prev.map(p => p._id === id ? { ...p, status, feedback } : p)
          );
          
          Swal.fire({
            title: "Success!",
            text: `Property ${status} successfully`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        console.error("Status update error:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to update property status",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[70vh] bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-teal-500/10 rounded-2xl">
            <Building2 className="text-teal-500" size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Manage Properties
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
              Review and moderate all listed properties
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Properties</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {properties.length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">
              {properties.filter(p => p.status === "pending").length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">Approved</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">
              {properties.filter(p => p.status === "approved").length}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-2xl mb-6 flex items-center gap-3">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Properties Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left p-6 font-semibold text-slate-700 dark:text-slate-300">Property</th>
                <th className="text-left p-6 font-semibold text-slate-700 dark:text-slate-300">Owner</th>
                <th className="text-left p-6 font-semibold text-slate-700 dark:text-slate-300">Location</th>
                <th className="text-left p-6 font-semibold text-slate-700 dark:text-slate-300">Rent</th>
                <th className="text-center p-6 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                <th className="text-center p-6 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <tr 
                    key={property._id} 
                    className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group"
                  >
                    {/* Property Info */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200"} 
                          alt={property.title} 
                          className="w-16 h-16 object-cover rounded-2xl border-2 border-slate-200 dark:border-white/10" 
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                            {property.title}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {property.propertyType}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner Info */}
                    <td className="p-6">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {property.ownerName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {property.ownerEmail}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="p-6 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-teal-500 flex-shrink-0" />
                        <span className="line-clamp-1">{property.location}</span>
                      </div>
                    </td>

                    {/* Rent */}
                    <td className="p-6">
                      <span className="font-bold text-teal-500 text-lg">
                        ৳{property.rent?.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                        /month
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-6 text-center">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold capitalize
                        ${property.status === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' 
                          : property.status === 'rejected' 
                          ? 'bg-red-500/10 text-red-500 border border-red-500/30' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'}`}>
                        {property.status || "pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-6">
                      <div className="flex gap-2 justify-center">
                        {property.status === "pending" && (
                          <>
                            <button 
                              onClick={() => handleStatus(property._id, "approved")} 
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                              <CheckCircle size={16} /> 
                              <span className="hidden md:inline">Approve</span>
                            </button>
                            <button 
                              onClick={() => handleStatus(property._id, "rejected")} 
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-red-500/20"
                            >
                              <XCircle size={16} />
                              <span className="hidden md:inline">Reject</span>
                            </button>
                          </>
                        )}
                        
                        {property.status === "approved" && (
                          <button 
                            onClick={() => handleStatus(property._id, "rejected")} 
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-sm font-medium transition flex items-center gap-2 border border-red-500/30"
                          >
                            <XCircle size={16} />
                            <span className="hidden md:inline">Revoke</span>
                          </button>
                        )}

                        {property.status === "rejected" && (
                          <button 
                            onClick={() => handleStatus(property._id, "approved")} 
                            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl text-sm font-medium transition flex items-center gap-2 border border-emerald-500/30"
                          >
                            <CheckCircle size={16} />
                            <span className="hidden md:inline">Re-approve</span>
                          </button>
                        )}

                        {property.feedback && (
                          <button 
                            onClick={() => Swal.fire({
                              title: "Rejection Feedback",
                              text: property.feedback,
                              icon: "info",
                              confirmButtonColor: "#14b8a6",
                            })} 
                            className="p-2 text-teal-500 hover:bg-teal-500/10 rounded-xl transition"
                            title="View feedback"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-20 text-center">
                    <Building2 className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={64} />
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                      No properties found
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                      Properties will appear here after owners add them
                    </p>
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