"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { saveTransaction } from "@/services/paymentApi";
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
      toast.success("Payment Successful!");

      const transactionData = {
        amount: paymentIntent.amount / 100,   // Important: divide by 100
        paymentIntentId: paymentIntent.id,
        status: "succeeded",
        currency: paymentIntent.currency || "usd",
      };

      try {
        const result = await saveTransaction(transactionData);
        console.log("Transaction Save Result:", result);

        localStorage.removeItem("bookingData");
        
        setTimeout(() => {
          router.push("/dashboard/tenant/bookings");
        }, 1200);
      } catch (err) {
        console.error("Save transaction error:", err);
        toast.error("Payment done but transaction save failed");
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
        {isProcessing ? "Processing..." : `Pay Now`}
      </button>
    </form>
  );
}