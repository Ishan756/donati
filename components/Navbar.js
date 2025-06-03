"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-8 h-16 shadow-xl border-b border-gray-700">
      
      {/* 🔹 Logo Section */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image src={logo} alt="Sahayak Logo" width={45} height={45} className="rounded-full shadow-md" />
        <span className="font-bold text-xl tracking-wide hover:text-yellow-400 transition duration-300">
          SAHAYAK
        </span>
      </Link>

      {/* 🔹 Navigation Buttons */}
      <div className="flex gap-6">
        <Link href="/" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Home</button>
        </Link>

        <Link href="/about" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">About</button>
        </Link>

        <Link href="/projects" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Projects</button>
        </Link>

        {!session ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800"
            >
              Login
            </button>

            <Link href="/signup" passHref>
              <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Sign Up</button>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => signOut()} 
              className="nav-btn bg-gradient-to-r from-gray-500 to-gray-700"
            >
              Sign Out
            </button>
          </>
        )}

        <Link href="/hurray" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Hurray</button>
        </Link>
      </div>

      {/* 🔹 Button Styling */}
      <style jsx>{`
        .nav-btn {
          padding: 10px 18px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          transition: transform 0.2s ease-in-out, background 0.3s ease-in-out;
          color: white;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-btn:hover {
          transform: scale(1.1);
          filter: brightness(1.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
