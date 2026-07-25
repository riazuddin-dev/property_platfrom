"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Phone, FileText, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { createBooking } from "@/services/bookingApi";

export default function BookingModal({ property, onClose, onSuccess }) {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    moveInDate: "",
    contactNumber: "",
    additionalNotes: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login to apply");
      return;
    }

    if (!formData.moveInDate || !formData.contactNumber.trim()) {
      toast.error("Please fill move-in date and phone number");
      return;
    }

    if (formData.additionalNotes.trim().length > 0 && formData.additionalNotes.trim().length < 10) {
      toast.error("Message should be at least 10 characters, or leave it empty");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting your application...");

    try {
      const bookingData = {
        propertyId: property._id,
        propertyTitle: property.title,
        propertyImage: property.image || property.images?.[0] || "",
        location: property.location || "",
        tenantEmail: session.user.email,
        tenantName: session.user.name || "Tenant",
        ownerEmail: property.ownerEmail,
        ownerName: property.ownerName || "Owner",
        moveInDate: formData.moveInDate,
        contactNumber: formData.contactNumber.trim(),
        phone: formData.contactNumber.trim(),
        additionalNotes: formData.additionalNotes.trim(),
        coverLetter: formData.additionalNotes.trim(),
        amount: Number(property.rent) || 0,
        rent: Number(property.rent) || 0,
      };

      const result = await createBooking(bookingData);

      if (!result || result.success === false || result.message) {
        // Server may return Mongo insert result (insertedId) or { message }
        if (result?.message && !result.insertedId && !result.acknowledged) {
          throw new Error(result.message);
        }
      }

      if (result?.status === 400 || result?.status === 403) {
        throw new Error(result.message || "Could not submit application");
      }

      toast.success("Application submitted successfully!", {
        id: toastId,
        duration: 3500,
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error?.message || "Failed to submit application", {
        id: toastId,
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
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => !loading && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        initial={{ scale: 0.96, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 16 }}
        className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-teal-600/30 via-slate-900 to-cyan-500/20 px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
                Apply now
              </p>
              <h2 id="apply-title" className="mt-1 text-2xl font-bold text-white">
                Rental application
              </h2>
              <p className="mt-1 line-clamp-1 text-sm text-slate-400">
                {property.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() => !loading && onClose()}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-800/50 p-3">
            <img
              src={
                property.image ||
                property.images?.[0] ||
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200"
              }
              alt=""
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{property.title}</p>
              <p className="truncate text-sm text-slate-400">{property.location}</p>
              <p className="mt-0.5 font-bold text-teal-400">
                ৳{Number(property.rent || 0).toLocaleString()}/month
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                <Calendar size={14} className="mr-2 inline text-teal-400" />
                Preferred move-in date *
              </label>
              <input
                type="date"
                value={formData.moveInDate}
                onChange={(e) =>
                  setFormData({ ...formData, moveInDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white outline-none transition focus:border-teal-500/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                <Phone size={14} className="mr-2 inline text-teal-400" />
                Phone number *
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                placeholder="+880 1XXX-XXXXXX"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-500/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                <FileText size={14} className="mr-2 inline text-teal-400" />
                Message / cover note (optional)
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, additionalNotes: e.target.value })
                }
                placeholder="Tell the owner why this home fits you..."
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-800/50 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-500/50"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:from-teal-600 hover:to-cyan-600 disabled:opacity-50"
              >
                <Send size={18} />
                {loading ? "Submitting..." : "Submit application"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
