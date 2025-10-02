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
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <Image
              src={session.user?.image || "/default-avatar.svg"}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-600"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {session.user?.name || "User"}
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                {session.user?.email}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => router.push("/form")}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300"
                >
                  Create Fundraiser
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="bg-gray-700 rounded-lg p-3 text-white">
                  {session.user?.name || "Not provided"}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="bg-gray-700 rounded-lg p-3 text-white">
                  {session.user?.email}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  User ID
                </label>
                <div className="bg-gray-700 rounded-lg p-3 text-white text-sm font-mono">
                  {session.user?.id || "Loading..."}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-300 flex items-center gap-3"
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div>
                  <p className="text-white font-medium">View Dashboard</p>
                  <p className="text-gray-400 text-sm">Manage your fundraising campaigns</p>
                </div>
              </button>

              <button
                onClick={() => router.push("/form")}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-300 flex items-center gap-3"
              >
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <div>
                  <p className="text-white font-medium">Create New Fundraiser</p>
                  <p className="text-gray-400 text-sm">Start raising funds for your cause</p>
                </div>
              </button>

              <button
                onClick={() => router.push("/projects")}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-300 flex items-center gap-3"
              >
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
      </div>
    </div>
  );
}