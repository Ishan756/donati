"use client"; // Required for Client Component

import React, { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    toast.success(`Signup successful! Welcome, ${name}`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex justify-center items-center h-screen bg-gray-900 relative overflow-hidden">
  <Image src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80" alt="Signup Hero" fill priority className="absolute inset-0 w-full h-full object-cover opacity-60 " />
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center relative z-10 animate-slideup">
          <h1 className="font-bold text-3xl text-white mb-4">Create an Account</h1>
          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Sign Up
          </button>
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          {/* Google Signup Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Sign up with Google
          </button>
          {/* GitHub Signup Button */}
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full mt-2 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Sign up with GitHub
          </button>
          {/* Already have an account? Login Link */}
          <div className="text-sm mt-3 text-gray-400">
            Already have an account?{" "}
            <button onClick={() => router.push("/login")} className="text-blue-400 hover:underline">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
// ...existing code...
}
