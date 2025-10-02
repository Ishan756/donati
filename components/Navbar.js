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
  <nav className="bg-[#18181b] text-white flex justify-between items-center px-8 h-16 shadow-md border-b border-[#23232a]">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image src={logo} alt="Donati Logo" width={40} height={40} className="rounded-full shadow-md border-2 border-[#23232a]" />
        <span className="font-extrabold text-2xl tracking-wide text-[#e0e7ef] hover:text-blue-500 transition duration-200">
          DONATI
        </span>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-6">
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
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[#23232a] transition duration-200 border border-[#23232a]"
              >
                <Image
                  src={session.user?.image || "/default-avatar.svg"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#23232a] hover:border-blue-500 transition duration-200"
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
                <div className="absolute right-0 mt-2 w-64 min-w-[16rem] max-w-[20rem] bg-[#23232a] rounded-lg shadow-lg border border-[#23232a] z-50">
                  <div className="p-4 border-b border-[#23232a]">
                    <div className="flex items-center gap-3">
                      <Image
                        src={session.user?.image || "/default-avatar.svg"}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-[#23232a]"
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
                      className="w-full text-left px-4 py-2 text-[#e0e7ef] hover:bg-[#18181b] hover:text-blue-500 transition duration-200 flex items-center gap-2"
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
                      className="w-full text-left px-4 py-2 text-[#e0e7ef] hover:bg-[#18181b] hover:text-blue-500 transition duration-200 flex items-center gap-2"
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
                      className="w-full text-left px-4 py-2 text-[#e0e7ef] hover:bg-[#18181b] hover:text-blue-500 transition duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Fundraiser
                    </button>

                    <div className="border-t border-[#23232a] my-2"></div>

                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#18181b] hover:text-red-300 transition duration-200 flex items-center gap-2"
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
          font-weight: 500;
          border-radius: 8px;
          background: #23232a;
          color: #e0e7ef;
          border: 1px solid #23232a;
          box-shadow: 0px 2px 8px rgba(0,0,0,0.12);
          transition: transform 0.18s, background 0.2s, color 0.2s;
        }
        .nav-btn:hover {
          transform: scale(1.04);
          background: #1e293b;
          color: #3b82f6;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
