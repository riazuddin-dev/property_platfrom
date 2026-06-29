"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { createPaymentIntent } from "@/services/paymentApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import CheckoutForm from "@/components/shared/payment/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData") || "{}");
    
    if (!data.propertyId) {
      toast.error("No booking data found");
      router.push("/properties");
      return;
    }

    setBookingData(data);

    const initPayment = async () => {
      try {
        const result = await createPaymentIntent(data.rent);
        
        if (result.clientSecret) {
          setClientSecret(result.clientSecret);
        } else {
          throw new Error("Failed to create payment intent");
        }
      } catch (error) {
        console.error("Payment init error:", error);
        toast.error("Failed to initialize payment");
        router.push("/properties");
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-teal-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Initializing payment...</p>
        </div>
      </div>
    );
  }

  if (!clientSecret || !bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 mb-8 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Complete Your Booking
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Secure payment for your property rental
          </p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/10 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Booking Summary
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
              <span className="text-slate-600 dark:text-slate-400">Property:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {bookingData.propertyTitle}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
              <span className="text-slate-600 dark:text-slate-400">Location:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {bookingData.location}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
              <span className="text-slate-600 dark:text-slate-400">Owner:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {bookingData.ownerName}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-slate-900 dark:text-white">Total Amount:</span>
              <span className="text-3xl font-bold text-teal-600">
                ৳{bookingData.rent?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-white/10">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} amount={bookingData.rent} />
          </Elements>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
          <ShieldCheck size={20} className="text-teal-500" />
          <span className="text-sm">256-bit SSL Encrypted Payment</span>
        </div>
      </div>
    </div>
  );
}