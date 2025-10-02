"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Dummy fundraisers for demo
  const dummyFundraisers = [
    {
      title: "Help Rohan Fight Cancer",
      needed: 100000,
      raised: 45000,
      image: "https://images.unsplash.com/photo-1588776814546-ec7e1b1b1b1b?auto=format&fit=crop&w=600&q=80", // Hospital bed
      reason: "Medical bills for chemotherapy",
      document: "/medical-reports.pdf",
    },
    {
      title: "Support Priya's Education",
      needed: 50000,
      raised: 12000,
      image: "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=600&q=80", // School classroom
      reason: "School fees and books",
      document: "/education-proof.pdf",
    },
    {
      title: "Save Stray Dogs",
      needed: 30000,
      raised: 8000,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80", // Dog rescue
      reason: "Food and shelter for rescued dogs",
      document: "/dog-rescue.pdf",
    },
    {
      title: "Help Flood Victims",
      needed: 200000,
      raised: 95000,
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80", // Flood relief
      reason: "Emergency relief and supplies",
      document: "/flood-relief.pdf",
    },
  ];
  const [fundraisers, setFundraisers] = useState(dummyFundraisers);
  const [payments, setPayments] = useState([]); // ✅ Store payments

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Removed API fetch for fundraisers; only dummy examples are shown

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
        <p className="mt-2 text-lg">Hello, {session.user.name} 👋</p>
      )}

      {/* ✅ Start Fundraising Button */}
      <button
        onClick={() => router.push("/fundraiser-form")}
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Start Fundraising Here
      </button>

      {/* ✅ Proceed to Payment Page */}
     

      {/* ✅ Active Fundraisers Section */}
      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Active Fundraisers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fundraisers.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{project.reason}</p>
                  <p className="text-green-400 font-bold">Raised: ₹{project.raised.toLocaleString()}</p>
                  <p className="text-red-400 font-bold">Needed: ₹{project.needed.toLocaleString()}</p>
                  {/* Supporting Document */}
                  <a
                    href={project.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-400 hover:underline text-sm"
                  >
                    View Supporting Document
                  </a>
                </div>
                <button
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
                  onClick={() => router.push(`/payment?username=${encodeURIComponent(project.title)}`)}
                >
                  Proceed Payment
                </button>
              </div>
            </div>
          ))}
        </div>
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
