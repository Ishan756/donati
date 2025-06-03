"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [fundraisers, setFundraisers] = useState([]);
  const [payments, setPayments] = useState([]); // ✅ Store payments

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch fundraisers from API
  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await fetch("/api/get-fundraisers");
        const data = await response.json();
        if (data.success) {
          setFundraisers(data.fundraisers);
        } else {
          console.error("Error fetching fundraisers:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch fundraisers:", error);
      }
    };

    fetchFundraisers();
  }, []);

  // ✅ Fetch payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/get-payments");
        const data = await response.json();
        if (data.success) {
          setPayments(data.payments);
        } else {
          console.error("Error fetching payments:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state while checking session
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      {session?.user && (
        <p className="mt-2 text-lg">Hello, {session.user.email} 👋</p>
      )}

      {/* ✅ Start Fundraising Button */}
      <button
        onClick={() => router.push("/fundraiser-form")}
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Start Fundraising Here
      </button>

      {/* ✅ Proceed to Payment Page */}
      <button
        onClick={() => router.push("/payment")}
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Proceed to Payment
      </button>

      {/* ✅ Active Fundraisers Section */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Active Fundraisers</h2>

        {fundraisers.length === 0 ? (
          <p>No active fundraisers.</p>
        ) : (
          <div className="space-y-4">
            {fundraisers.map((project, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p>Needed: ₹{project.needed.toLocaleString()}</p>
                <p>Raised: ₹{project.raised.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Recent Payments Section */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Recent Payments</h2>

        {payments.length === 0 ? (
          <p>No recent payments.</p>
        ) : (
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{payment.donorName}</h3>
                <p>Email: {payment.donorEmail}</p>
                <p>Amount: ₹{payment.amount}</p>
                <p>Fundraiser: {payment.fundraiser}</p>
                <p>Payment ID: {payment.paymentId}</p>
                <p>Status: <span className="text-green-400">{payment.status}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}
