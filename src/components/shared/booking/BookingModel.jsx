"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Phone, User, FileText, CreditCard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function BookingModal({ property, onClose }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    moveInDate: "",
    contactNumber: "",
    additionalNotes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.moveInDate || !formData.contactNumber) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields"
      });
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        propertyId: property._id,
        propertyTitle: property.title,
        propertyImage: property.image || property.images?.[0],
        tenantEmail: session.user.email,
        tenantName: session.user.name,
        ownerEmail: property.ownerEmail,
        ownerName: property.ownerName,
        moveInDate: formData.moveInDate,
        contactNumber: formData.contactNumber,
        additionalNotes: formData.additionalNotes,
        amount: property.rent,
        status: "pending",
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Booking Created!",
          text: "Redirecting to payment..."
        });
        
        onClose();
        
        // Redirect to payment
        setTimeout(() => {
          router.push(`/payment?bookingId=${data.insertedId}&amount=${property.rent}`);
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Booking failed"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Booking failed"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Book Property</h2>
            <p className="text-slate-400 text-sm mt-1">{property.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Property Summary */}
        <div className="p-4 bg-slate-800/50 rounded-2xl mb-6 flex items-center gap-4">
          <img
            src={property.image || property.images?.[0]}
            alt={property.title}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-white">{property.title}</p>
            <p className="text-sm text-slate-400">{property.location}</p>
            <p className="text-teal-400 font-bold mt-1">৳{property.rent?.toLocaleString()}/month</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              <Calendar size={14} className="inline mr-2" />
              Move-in Date *
            </label>
            <input
              type="date"
              value={formData.moveInDate}
              onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              <Phone size={14} className="inline mr-2" />
              Contact Number *
            </label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              placeholder="+880 1XXX-XXXXXX"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white placeholder:text-slate-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              <FileText size={14} className="inline mr-2" />
              Additional Notes
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              placeholder="Any special requirements..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 focus:border-teal-500/50 rounded-xl outline-none text-white placeholder:text-slate-500 transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard size={18} />
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}