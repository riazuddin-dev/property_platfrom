// src/app/payment/page.jsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ✅ Loading fallback component
function PaymentLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400">Loading payment...</p>
      </div>
    </div>
  );
}

function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bookingData = {
    propertyId: searchParams.get("propertyId"),
    propertyTitle: searchParams.get("propertyTitle"),
    propertyImage: searchParams.get("propertyImage"),
    tenantEmail: searchParams.get("tenantEmail"),
    tenantName: searchParams.get("tenantName"),
    ownerEmail: searchParams.get("ownerEmail"),
    ownerName: searchParams.get("ownerName"),
    amount: parseFloat(searchParams.get("amount")),
    moveInDate: searchParams.get("moveInDate"),
    contactNumber: searchParams.get("contactNumber"),
    additionalNotes: searchParams.get("additionalNotes"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: bookingData.amount }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
      } else if (result.paymentIntent.status === "succeeded") {
        const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...bookingData,
            status: "pending",
            paymentStatus: "paid",
            transactionId: result.paymentIntent.id,
            paidAt: new Date(),
          }),
        });

        const bookingResult = await bookingRes.json();

        if (bookingRes.ok) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              bookingId: bookingResult.insertedId,
              propertyId: bookingData.propertyId,
              propertyTitle: bookingData.propertyTitle,
              tenantEmail: bookingData.tenantEmail,
              tenantName: bookingData.tenantName,
              ownerEmail: bookingData.ownerEmail,
              ownerName: bookingData.ownerName,
              amount: bookingData.amount,
              transactionId: result.paymentIntent.id,
              status: "success",
              createdAt: new Date(),
            }),
          });

          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your booking has been confirmed",
            timer: 2000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            router.push("/dashboard/tenant/my-bookings");
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: bookingResult.message || "Failed to create booking",
          });
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Payment processing failed",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Card Details
        </label>
        <div className="p-4 bg-slate-800/50 border border-white/10 rounded-xl">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#ffffff",
                  "::placeholder": { color: "#94a3b8" },
                },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>Pay ৳{bookingData.amount?.toLocaleString()}</>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
        🔒 Secure payment powered by Stripe
      </p>
    </form>
  );
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const amount = parseFloat(searchParams.get("amount")) || 0;
  const propertyTitle = searchParams.get("propertyTitle") || "Property";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <PaymentLoading />;
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Complete Payment
          </h1>
          <p className="text-slate-400">
            Secure payment processing for your booking
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📋 Booking Summary</h2>
          <div className="space-y-4 divide-y divide-white/5">
            <div className="flex justify-between items-center pt-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Property</p>
                <p className="text-white font-semibold text-lg">{propertyTitle}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Tenant Name</p>
                <p className="text-white font-semibold">{searchParams.get("tenantName")}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Move-in Date</p>
                <p className="text-white font-semibold">{searchParams.get("moveInDate")}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Amount</p>
                <p className="text-teal-400 text-3xl font-bold">৳{amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">💳 Payment Details</h3>
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm">
            🔒 Your payment information is encrypted and secure
          </div>
        </motion.div>
      </div>
    </div>
  );
}