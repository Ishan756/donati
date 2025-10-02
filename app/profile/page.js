"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#18181b]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#18181b] text-[#e0e7ef]">
      {/* Hero Section with Image & Animation */}
      <div className="bg-[#23232a] text-white py-16 text-center border-b border-[#23232a] relative overflow-hidden">
        <Image src={session.user?.image || "/default-avatar.svg"} alt="Profile Hero" width={1200} height={400} className="absolute inset-0 w-full h-full object-cover opacity-20 animate-fadein" />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-blue-500 mb-2 animate-slideup">Your Profile</h1>
          <p className="mt-2 text-lg text-gray-300 animate-fadein">Welcome, {session.user?.name || "User"} 👋</p>
        </div>
      </div>

      {/* Profile Info Cards */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        {/* Account Information Card */}
        <div className="bg-[#23232a] rounded-xl shadow-lg p-8 border border-blue-500 animate-fadein flex flex-col items-center">
          <Image src={session.user?.image || "/default-avatar.svg"} alt="Profile Picture" width={120} height={120} className="rounded-full border-4 border-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-blue-400 mb-2 animate-slideup">Account Information</h2>
          <div className="space-y-4 w-full">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Full Name</label>
              <div className="bg-[#18181b] rounded-lg p-3 text-white">{session.user?.name || "Not provided"}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
              <div className="bg-[#18181b] rounded-lg p-3 text-white">{session.user?.email}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">User ID</label>
              <div className="bg-[#18181b] rounded-lg p-3 text-white text-sm font-mono">{session.user?.id || "Loading..."}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-[#23232a] rounded-xl shadow-lg p-8 border border-blue-500 animate-fadein flex flex-col items-center">
          <h2 className="text-2xl font-bold text-blue-400 mb-2 animate-slideup">Quick Actions</h2>
          <div className="space-y-4 w-full">
            <button onClick={() => router.push("/dashboard")} className="w-full p-4 bg-[#18181b] hover:bg-blue-900 rounded-lg transition duration-300 flex items-center gap-3 shadow-md">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>
                <p className="text-white font-medium">View Dashboard</p>
                <p className="text-gray-400 text-sm">Manage your fundraising campaigns</p>
              </div>
            </button>
            <button onClick={() => router.push("/form")} className="w-full p-4 bg-[#18181b] hover:bg-green-900 rounded-lg transition duration-300 flex items-center gap-3 shadow-md">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div>
                <p className="text-white font-medium">Create New Fundraiser</p>
                <p className="text-gray-400 text-sm">Start raising funds for your cause</p>
              </div>
            </button>
            <button onClick={() => router.push("/projects")} className="w-full p-4 bg-[#18181b] hover:bg-purple-900 rounded-lg transition duration-300 flex items-center gap-3 shadow-md">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>
                <p className="text-white font-medium">Browse Projects</p>
                <p className="text-gray-400 text-sm">Discover fundraising campaigns</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Resources & Documentation */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-500 mb-4 animate-slideup">Useful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="https://www.nextauthjs.org/" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">NextAuth.js Docs</h3>
            <p className="text-gray-300 text-sm">Learn more about authentication in Next.js apps.</p>
          </a>
          <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Tailwind CSS Docs</h3>
            <p className="text-gray-300 text-sm">Explore styling and theming options for your app.</p>
          </a>
          <a href="https://www.mongodb.com/docs/atlas/" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">MongoDB Atlas Docs</h3>
            <p className="text-gray-300 text-sm">Manage your database and user data securely.</p>
          </a>
          <a href="https://razorpay.com/docs/" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Razorpay Docs</h3>
            <p className="text-gray-300 text-sm">Integrate secure payments in your fundraising campaigns.</p>
          </a>
        </div>
      </div>

      {/* Get Involved Section */}
      <div className="bg-[#23232a] text-white py-12 text-center border-t border-[#23232a]">
        <h2 className="text-3xl font-bold text-blue-500 mb-2 animate-slideup">Get Involved</h2>
        <p className="mt-3 max-w-2xl mx-auto text-gray-300 animate-fadein">
          Ready to make an impact? Start a fundraiser, donate, or explore campaigns to help others!
        </p>
        <div className="mt-6">
          <button onClick={() => router.push("/form")} className="btn-primary">Create Fundraiser</button>
        </div>
      </div>
    </div>
  );
}