"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { saveTransaction } from "@/services/paymentApi";
import { addBooking } from "@/services/bookingApi";   // ← ADD THIS IMPORT
import { useRouter } from "next/navigation";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not loaded");
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment Successful! 🎉");

      const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
      
      if (!bookingData.propertyId) {
        toast.error("Booking data missing");
        setIsProcessing(false);
        return;
      }

      try {
        // Save transaction
        await saveTransaction({
          amount: paymentIntent.amount / 100,
          paymentIntentId: paymentIntent.id,
          status: "succeeded",
          currency: paymentIntent.currency || "usd",
        });

        // Create/Update Booking
        await addBooking({
          ...bookingData,
          paymentIntentId: paymentIntent.id,
          status: "approved",   // You can change to "paid" if you want owner confirmation
        });

        localStorage.removeItem("bookingData");
        
        setTimeout(() => {
          router.push("/dashboard/tenant/bookings");
        }, 1500);
      } catch (err) {
        console.error("Post-payment error:", err);
        toast.error("Payment succeeded but booking failed. Contact support.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-5 border border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-slate-800">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-semibold disabled:opacity-50"
      >
        {isProcessing ? "Processing Payment..." : `Pay ৳${stripe?.price || 0}`}
      </button>
    </form>
  );
}