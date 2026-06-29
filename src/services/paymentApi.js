// src/services/paymentApi.js
const API = process.env.NEXT_PUBLIC_API_URL;

// Create Stripe payment intent
export const createPaymentIntent = async (amount) => {
  try {
    const res = await fetch(`${API}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ amount }),
    });
    return await res.json();
  } catch (error) {
    console.error("createPaymentIntent error:", error);
    return { clientSecret: null };
  }
};

// Save transaction
export const saveTransaction = async (transactionData) => {
  try {
    const res = await fetch(`${API}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(transactionData),
    });
    return await res.json();
  } catch (error) {
    console.error("saveTransaction error:", error);
    return { success: false };
  }
};

// Get transactions
export const getTransactions = async () => {
  try {
    const res = await fetch(`${API}/transactions`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("getTransactions error:", error);
    return [];
  }
};