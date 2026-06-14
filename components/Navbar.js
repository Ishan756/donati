"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
  <nav className="bg-gradient-to-r from-[#18181b] to-[#1a1a1f] text-white flex justify-between items-center px-8 h-16 shadow-lg border-b border-[#2a2a33]">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer group">
        <Image src={logo} alt="Donati Logo" width={40} height={40} className="rounded-full shadow-md border-2 border-[#23232a] group-hover:border-blue-500 transition duration-300" />
        <span className="font-extrabold text-2xl tracking-wide text-[#e0e7ef] group-hover:text-blue-500 transition duration-300">
          DONATI
        </span>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Link href="/" passHref>
          <button className="nav-btn">Home</button>
        </Link>
        <Link href="/about" passHref>
          <button className="nav-btn">About</button>
        </Link>
        <Link href="/projects" passHref>
          <button className="nav-btn">Projects</button>
        </Link>

        {!session ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="nav-btn"
            >
              Login
            </button>
          
          </>
        ) : (
          <>
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2a2a33] transition-all duration-300 border border-[#2a2a33] hover:border-blue-500 group"
              >
                <Image
                  src={session.user?.image || "/default-avatar.svg"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#2a2a33] group-hover:border-blue-500 transition duration-300"
                />
                <span className="text-sm font-semibold max-w-24 truncate text-[#e0e7ef]">
                  {session.user?.name || "User"}
                </span>
                <svg
                  className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 min-w-[16rem] max-w-[20rem] bg-[#1a1a1f] rounded-lg shadow-xl border border-[#2a2a33] z-50 backdrop-filter backdrop-blur-md bg-opacity-95">
                  <div className="p-4 border-b border-[#2a2a33]">
                    <div className="flex items-center gap-3">
                      <Image
                        src={session.user?.image || "/default-avatar.svg"}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-[#2a2a33] group-hover:border-blue-500 transition duration-300"
                      />
                      <div>
                        <p className="text-[#e0e7ef] font-bold">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-blue-500 text-sm max-w-[12rem] overflow-hidden text-ellipsis whitespace-nowrap block">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        router.push("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[#e0e7ef] hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 transition-all duration-200 flex items-center gap-3 rounded-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[#e0e7ef] hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 transition-all duration-200 flex items-center gap-3 rounded-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        router.push("/form");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[#e0e7ef] hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500 transition-all duration-200 flex items-center gap-3 rounded-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Fundraiser
                    </button>

                    <div className="border-t border-[#2a2a33] my-2"></div>

                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500 hover:bg-opacity-10 hover:text-red-300 transition-all duration-200 flex items-center gap-3 rounded-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <Link href="/dashboard" passHref>
          <button className="nav-btn">Dashboard</button>
        </Link>
      </div>

      {/* Button Styling */}
      <style jsx>{`
        .nav-btn {
          padding: 10px 18px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          background: rgba(35, 35, 42, 0.7);
          color: #e0e7ef;
          border: 1px solid #2a2a33;
          box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(4px);
        }
        .nav-btn:hover {
          transform: translateY(-2px);
          background: #1e293b;
          color: #3b82f6;
          border-color: #3b82f6;
          box-shadow: 0px 8px 16px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
