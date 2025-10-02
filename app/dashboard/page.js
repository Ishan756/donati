"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Dummy fundraisers for demo
  const heroImg = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80";
  const dummyFundraisers = useMemo(() => [
    {
      title: "Help Rohan Fight Cancer",
      needed: 100000,
      raised: 45000,
      image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80", // Cancer patient support
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
  ], []);
  const [fundraisers, setFundraisers] = useState(dummyFundraisers);
  const [payments, setPayments] = useState([]); // ✅ Store payments

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load fundraisers from localStorage if available
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fundraisers") || "[]");
    if (stored.length > 0) {
      setFundraisers([...stored, ...dummyFundraisers]);
    }
  }, [dummyFundraisers]);

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
    <div className="min-h-screen bg-[#18181b] text-[#e0e7ef]">
      {/* Hero Section with Image & Animation */}
      <div className="bg-[#23232a] text-white py-16 text-center border-b border-[#23232a] relative overflow-hidden">
  <Image src={heroImg} alt="Dashboard Hero" fill priority className="absolute inset-0 w-full h-full object-cover opacity-20 " />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-blue-500 mb-2 animate-slideup">Dashboard</h1>
          {session?.user && (
            <p className="mt-2 text-lg text-gray-300 animate-fadein">Welcome, {session.user.name} 👋</p>
          )}
          <p className="mt-2 text-lg text-gray-300 animate-fadein">Manage your fundraisers, donations, and impact.</p>
          <button
            onClick={() => router.push("/form")}
            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 animate-fadein"
          >
            Start Fundraising Here
          </button>
        </div>
      </div>

      {/* Active Fundraisers Section */}
      <div className="mt-8 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Active Fundraisers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {fundraisers.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#23232a] to-[#18181b] rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/40 border border-[#23232a] group"
            >
              <div className="relative w-full h-48">
                <Image src={project.image} alt={project.title} fill className="w-full h-full object-cover group-hover:brightness-90 transition duration-300" />
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow">Featured</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="mb-3">
                  <h3 className="text-xl font-bold mb-1 text-blue-400 group-hover:text-blue-300 transition">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{project.reason}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-bold">Raised: ₹{project.raised.toLocaleString()}</span>
                    <span className="text-red-400 font-bold">Needed: ₹{project.needed.toLocaleString()}</span>
                  </div>
                  {project.document && (
                    <a
                      href={project.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-400 hover:underline text-sm"
                    >
                      {project.documentName ? `View: ${project.documentName}` : "View Supporting Document"}
                    </a>
                  )}
                </div>
                <button
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300 shadow group-hover:shadow-lg"
                  onClick={() => router.push(`/payment?username=${encodeURIComponent(project.title)}`)}
                >
                  Proceed Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Payments Section */}
      <div className="mt-8 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Recent Payments</h2>
        {payments.length === 0 ? (
          <p className="text-center">No recent payments.</p>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {payments.map((payment, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md border border-[#23232a] animate-fadein w-full max-w-md">
                <h3 className="text-xl font-semibold text-blue-400 mb-1">{payment.donorName}</h3>
                <p className="text-gray-300">Email: {payment.donorEmail}</p>
                <p className="text-green-400 font-bold">Amount: ₹{payment.amount}</p>
                <p className="text-blue-400">Fundraiser: {payment.fundraiser}</p>
                <p className="text-gray-400">Payment ID: {payment.paymentId}</p>
                <p>Status: <span className="text-green-400">{payment.status}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 animate-fadein"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
