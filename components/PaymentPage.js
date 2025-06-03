"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Unknown User";

  // Fundraiser details (Replace with API call in real implementation)
  const fundraiserDetails = {
    name: username,
    amountNeeded: 50000,
    amountRaised: 20000,
    reason: "Medical Treatment for Surgery",
    documents: [
      { name: "Medical Reports", url: "/medical-reports.pdf" },
      { name: "Doctor's Prescription", url: "/prescription.pdf" },
      { name: "Hospital Bills", url: "/hospital-bills.pdf" },
    ],
  };

  // Donor input states
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("✅ Razorpay script loaded");
    script.onerror = () => console.error("❌ Failed to load Razorpay script");
    document.body.appendChild(script);
  }, []);

  // Handle Payment
  const handlePayment = async () => {
    if (!donorName || !donorEmail || !donationAmount) {
      alert("Please enter all details before proceeding.");
      return;
    }
  
    console.log("🚀 Creating order with amount:", donationAmount);
  
    try {
      // ✅ Create order
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: donationAmount }),
      });
  
      const data = await response.json();
      console.log("🚀 Order API Response:", data);
  
      if (!data.orderId) {
        console.error("❌ Order ID missing in response");
        alert("Order ID not found! Please try again.");
        return;
      }
  
      console.log("✅ Order ID:", data.orderId);
  
      // 🔹 Razorpay Payment Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: donationAmount * 100, // Convert to paise
        currency: "INR",
        name: fundraiserDetails.name,
        description: fundraiserDetails.reason,
        order_id: data.orderId,
        handler: async function (response) {
          alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
  
          console.log("🚀 Verifying payment on server...");
  
          // ✅ Send verification request to server
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorName,
              donorEmail,
              amount: donationAmount,
              fundraiser: fundraiserDetails.name,
            }),
          });
  
          const verifyData = await verifyResponse.json();
          console.log("🔹 Payment Verification Response:", verifyData);
  
          if (verifyData.success) {
            alert("🎉 Payment Verified & Stored Successfully!");
          } else {
            alert("❌ Payment verification failed!");
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: { color: "#3399cc" },
      };
  
      if (!window.Razorpay) {
        console.error("❌ Razorpay SDK not loaded");
        alert("Failed to load Razorpay. Please refresh and try again.");
        return;
      }
  
      console.log("🛠️ Opening Razorpay...");
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("❌ Error creating order:", error);
      alert("Something went wrong! Please try again.");
    }
  };
  

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-4">{fundraiserDetails.name}'s Fundraiser</h1>
          <p className="text-lg"><strong>Reason:</strong> {fundraiserDetails.reason}</p>
          <p className="text-lg"><strong>Needed:</strong> ₹{fundraiserDetails.amountNeeded.toLocaleString()}</p>
          <p className="text-lg"><strong>Raised:</strong> ₹{fundraiserDetails.amountRaised.toLocaleString()}</p>

          {/* Supporting Documents */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Supporting Documents:</h3>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {fundraiserDetails.documents.map((doc, index) => (
                <li key={index}>
                  <a href={doc.url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Donor Input Fields */}
          <div className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Message (Optional)"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={donorMessage}
              onChange={(e) => setDonorMessage(e.target.value)}
            />
            <input
              type="number"
              placeholder="Donation Amount (₹)"
              className="w-full p-3 rounded bg-gray-700 text-white"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </div>

          {/* Pay Now Button */}
          <button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
