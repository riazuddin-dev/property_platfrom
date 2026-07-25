"use client";

import { useEffect, useMemo, useState } from "react";
import { getBookingRequests, updateBookingStatus } from "@/services/bookingApi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Search,
  UserRound,
  FileText,
} from "lucide-react";

export default function BookingRequests() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      if (!session?.user?.email) return;
      try {
        const data = await getBookingRequests(session.user.email);
        const list = Array.isArray(data) ? data : [];
        setBookings(list);
        if (list.length) setSelected(list[0]);
      } catch (error) {
        console.error("Failed to load booking requests:", error);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [session]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        b.tenantName?.toLowerCase().includes(q) ||
        b.tenantEmail?.toLowerCase().includes(q) ||
        b.propertyTitle?.toLowerCase().includes(q) ||
        (b.contactNumber || b.phone || "").toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || (b.status || "pending") === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
      setSelected((prev) => (prev?._id === id ? { ...prev, status } : prev));
      toast.success(`Application ${status}`);
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          Applications
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Review tenant applications for your properties — name, email, phone,
          message, and date.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/60 sm:grid-cols-[1fr_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applicant, email, property..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-teal-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center dark:border-white/15">
          <p className="text-lg font-semibold text-slate-700 dark:text-white">
            No applications yet
          </p>
          <p className="mt-2 text-sm text-slate-500">
            When tenants apply, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-h-[70vh] space-y-3 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/60">
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500">
                No matches for your filters.
              </p>
            ) : (
              filtered.map((booking) => {
                const active = selected?._id === booking._id;
                return (
                  <button
                    key={booking._id}
                    type="button"
                    onClick={() => setSelected(booking)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-teal-500/40 bg-teal-500/10"
                        : "border-slate-200 bg-slate-50 hover:border-teal-500/30 dark:border-white/10 dark:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900 dark:text-white">
                          {booking.tenantName || "Tenant"}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                          {booking.propertyTitle}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          booking.status === "approved"
                            ? "bg-emerald-500/15 text-emerald-500"
                            : booking.status === "rejected"
                              ? "bg-rose-500/15 text-rose-400"
                              : "bg-amber-500/15 text-amber-500"
                        }`}
                      >
                        {booking.status || "pending"}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/60 lg:sticky lg:top-6 lg:self-start">
            {!selected ? (
              <p className="text-sm text-slate-500">Select an application</p>
            ) : (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-500">
                    <UserRound size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selected.tenantName}
                    </h3>
                    <p className="text-sm text-slate-500">Applicant details</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail
                    icon={Mail}
                    label="Email"
                    value={selected.tenantEmail || "—"}
                  />
                  <Detail
                    icon={Phone}
                    label="Phone"
                    value={
                      selected.contactNumber || selected.phone || "Not provided"
                    }
                  />
                  <Detail
                    icon={Calendar}
                    label="Move-in date"
                    value={
                      selected.moveInDate
                        ? new Date(selected.moveInDate).toLocaleDateString()
                        : "—"
                    }
                  />
                  <Detail
                    icon={Calendar}
                    label="Applied on"
                    value={
                      selected.createdAt
                        ? new Date(selected.createdAt).toLocaleString()
                        : "—"
                    }
                  />
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                  <img
                    src={
                      selected.propertyImage ||
                      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                    }
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selected.propertyTitle}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={14} />
                      {selected.location || "—"}
                    </p>
                    <p className="mt-1 font-bold text-teal-500">
                      ৳
                      {Number(
                        selected.rent || selected.amount || 0
                      ).toLocaleString()}
                      /mo
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <FileText size={14} className="text-teal-500" />
                    Message / cover note
                  </p>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
                    {selected.additionalNotes ||
                      selected.coverLetter ||
                      "No message provided."}
                  </div>
                </div>

                {(selected.status || "pending") === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleStatusUpdate(selected._id, "approved")
                      }
                      className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(selected._id, "rejected")
                      }
                      className="flex-1 rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-slate-500">
        <Icon size={13} className="text-teal-500" />
        {label}
      </p>
      <p className="mt-1 break-all text-sm font-medium text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
