"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent automatic redirects
        email,
        password,
      });

      if (res?.error) {
        alert("Login failed. Check your credentials.");
      } else {
        console.log("Login successful! Redirecting...");
        router.push("/dashboard"); // ✅ Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="font-bold text-3xl text-white mb-4">Login</h1>

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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Login Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })} // ✅ Redirect to Dashboard
          className="w-full mt-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Login with Google
        </button>

        {/* Forgot Password & Signup Links */}
        <div className="flex justify-between text-sm mt-3 text-gray-400">
          <button onClick={() => router.push("/forgot-password")} className="hover:underline">
            Forgot Password?
          </button>
          <button onClick={() => router.push("/signup")} className="hover:underline">
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
