"use client";

import { useEffect, useState } from "react";
import { getAllAdminProperties, updatePropertyStatus } from "@/services/propertyApi";
import Swal from "sweetalert2";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setError(null);
        const data = await getAllAdminProperties();
        console.log("✅ Properties Data:", data);
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
        inputPlaceholder: "Write reason...",
        showCancelButton: true,
      });
      feedback = value || "Rejected by admin";
    }

    const confirm = await Swal.fire({
      title: status === "approved" ? "Approve Property?" : "Reject Property?",
      icon: status === "approved" ? "success" : "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        await updatePropertyStatus(id, status, feedback);
        setProperties(prev => prev.map(p => p._id === id ? { ...p, status, feedback } : p));
        Swal.fire("Success!", `Property ${status}`, "success");
      } catch (error) {
        Swal.fire("Error", "Failed to update", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-2">Manage Properties</h1>
      <p className="text-slate-400 mb-8">Review and moderate all listed properties</p>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/70">
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
                  <tr key={property._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={property.image} alt="" className="w-16 h-16 object-cover rounded-2xl" />
                        <div>
                          <p className="font-semibold">{property.title}</p>
                          <p className="text-sm text-slate-400">{property.propertyType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <p>{property.ownerName}</p>
                      <p className="text-xs text-slate-400">{property.ownerEmail}</p>
                    </td>
                    <td className="p-6 text-slate-300">{property.location}</td>
                    <td className="p-6 font-medium">৳{property.rent}</td>
                    <td className="p-6 text-center">
                      <span className={`px-6 py-2 rounded-full text-sm font-medium capitalize
                        ${property.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                          property.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {property.status || "pending"}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-3 justify-center">
                        {property.status === "pending" && (
                          <>
                            <button onClick={() => handleStatus(property._id, "approved")} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm">Approve</button>
                            <button onClick={() => handleStatus(property._id, "rejected")} className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-2xl text-sm">Reject</button>
                          </>
                        )}
                        {property.feedback && (
                          <button onClick={() => Swal.fire("Feedback", property.feedback, "info")} className="p-3 text-teal-400 hover:bg-slate-700 rounded-xl">
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
                    <span className="text-sm">Go to Owner Dashboard → Add Property first.</span>
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