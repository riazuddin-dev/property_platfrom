"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { saveTransaction } from "@/services/paymentApi";
import { createBooking } from "@/services/bookingApi"; // ✅ Fixed import
import { useRouter } from "next/navigation";
import { Loader2, CreditCard, CheckCircle } from "lucide-react";

export default function CheckoutForm({ clientSecret, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not loaded. Please refresh the page.");
      return;
    }

    setIsProcessing(true);

    try {
      // Process payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error("Payment error:", error);
        toast.error(error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Successful! 🎉");

        // Get booking data from localStorage
        const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
        
        if (!bookingData.propertyId) {
          toast.error("Booking data missing. Please try again.");
          setIsProcessing(false);
          return;
        }

        try {
          // Save transaction
          await saveTransaction({
            amount: paymentIntent.amount / 100, // Convert from cents
            paymentIntentId: paymentIntent.id,
            status: "succeeded",
            currency: paymentIntent.currency || "usd",
            tenantEmail: bookingData.tenantEmail,
            ownerEmail: bookingData.ownerEmail,
            propertyId: bookingData.propertyId,
            propertyTitle: bookingData.propertyTitle,
          });

          // Create booking
          const bookingResult = await createBooking({
            ...bookingData,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            status: "approved", // Auto-approve after payment
          });

          if (bookingResult.insertedId) {
            toast.success("Booking confirmed! ✅");
            localStorage.removeItem("bookingData");
            
            setTimeout(() => {
              router.push("/dashboard/tenant/my-bookings");
            }, 1500);
          } else {
            throw new Error("Booking creation failed");
          }
        } catch (err) {
          console.error("Post-payment error:", err);
          toast.error("Payment succeeded but booking failed. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Input */}
      <div className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 hover:border-teal-500 transition">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Card Details
        </label>
        <CardElement 
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {/* Payment Info */}
      <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-600 dark:text-slate-400">Amount:</span>
          <span className="text-2xl font-bold text-teal-600">৳{amount?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CheckCircle size={16} className="text-teal-500" />
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-2xl font-semibold text-xl shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
      >
        {isProcessing ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard size={24} />
            Pay ৳{amount?.toLocaleString() || 0}
          </>
        )}
      </button>

      {/* Security Notice */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        🔒 Your payment information is encrypted and secure
      </p>
    </form>
  );
}