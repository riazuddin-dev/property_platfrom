const API =
  process.env.NEXT_PUBLIC_API_URL;

export const createPaymentIntent =
  async (amount) => {
    const res = await fetch(
      `${API}/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount,
        }),
      }
    );

    return res.json();
  };

export const saveTransaction = async (transactionData) => {
  const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");

  const fullTransaction = {
    ...transactionData,
    ownerEmail: bookingData.ownerEmail,
    tenantEmail: bookingData.tenantEmail,
    propertyId: bookingData.propertyId,
    propertyTitle: bookingData.propertyTitle,
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(`${API}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(fullTransaction),
  });

  return res.json();
};
export const getTransactions =
  async () => {
    const res = await fetch(
      `${API}/transactions`,
      {
        credentials: "include",
      }
    );

    return res.json();
  };