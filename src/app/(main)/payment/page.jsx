"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "@/components/shared/payment/CheckoutForm";
import { createPaymentIntent } from "@/services/paymentApi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] =
    useState("");

  const [loading, setLoading] =
    useState(true);

// In useEffect
useEffect(() => {
  const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
  const amount = bookingData.rent || 100; // fallback

  const loadPayment = async () => {
    try {
      const result = await createPaymentIntent(amount);
      if (result?.clientSecret) {
        setClientSecret(result.clientSecret);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadPayment();
}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-950 p-5">

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center mb-3">
          Secure Payment 💳
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Complete your property booking payment
        </p>

        {!clientSecret && (
          <p className="text-center text-red-500">
            Client Secret Not Found
          </p>
        )}

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <CheckoutForm
              clientSecret={
                clientSecret
              }
            />
          </Elements>
        )}

      </div>

    </div>
  );
}