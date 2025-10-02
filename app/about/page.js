"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#18181b] text-[#e0e7ef]">
      {/* Hero Section with Image & Animation */}
      <div className="bg-[#23232a] text-white py-16 text-center border-b border-[#23232a] relative overflow-hidden">
  <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" alt="Donate Hero" fill priority className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-blue-500 mb-2 animate-slideup">About Donati</h1>
          <p className="mt-2 text-lg text-gray-300 animate-fadein">Empowering generosity through secure crowdfunding</p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-2 animate-slideup">Who We Are</h2>
        <p className="text-center text-gray-400 mt-3 animate-fadein">
          Donati is a community-driven platform dedicated to helping individuals, NGOs, and organizations raise funds for meaningful causes. Our mission is to make fundraising accessible, secure, and impactful.
        </p>
      </div>

      {/* How It Works + Animated Donation Tips */}
      <div className="bg-[#23232a] py-12 border-b border-[#23232a]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-8 animate-slideup">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-10 mt-8">
            {[{
              title: "Start a Campaign",
              desc: "Create a campaign in minutes and share your story.",
              img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=400&q=80"
            }, {
              title: "Receive Donations",
              desc: "Accept donations from people who care about your cause.",
              img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
            }, {
              title: "Make an Impact",
              desc: "Use the funds to create real change in your community.",
              img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" // Hands holding heart
            }].map((card, idx) => (
              <div key={idx} className="max-w-sm p-6 bg-[#18181b] rounded-xl shadow-lg text-center border border-[#23232a] transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 animate-fadein flex flex-col items-center">
                <Image src={card.img} alt={card.title} width={64} height={64} className="w-16 h-16 object-cover rounded-full mb-4 shadow-md animate-fadein" />
                <h3 className="text-xl font-semibold text-blue-400 mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Useful Resources & Documentation */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-500 mb-4 animate-slideup">Donation Resources & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="https://www.pmcares.gov.in/en/" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">PM CARES Fund</h3>
            <p className="text-gray-300 text-sm">Official government portal for disaster relief donations in India.</p>
          </a>
          <a href="https://www.giveindia.org/" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">GiveIndia</h3>
            <p className="text-gray-300 text-sm">Trusted NGO platform for verified donation campaigns and causes.</p>
          </a>
          <a href="https://www.charitynavigator.org/" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">Charity Navigator</h3>
            <p className="text-gray-300 text-sm">Global ratings and reviews for charities and non-profits.</p>
          </a>
          <a href="https://www.unicef.org/donate" target="_blank" rel="noopener noreferrer" className="bg-[#23232a] p-6 rounded-xl shadow-lg border border-blue-500 hover:scale-105 transition-transform duration-300 animate-fadein">
            <h3 className="text-lg font-bold text-blue-400 mb-2">UNICEF Donation Portal</h3>
            <p className="text-gray-300 text-sm">Support children and families worldwide through UNICEF.</p>
          </a>
        </div>
      </div>

      {/* Our Impact */}
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-blue-500 mb-2 animate-slideup">Our Impact</h2>
        <p className="text-gray-400 mt-3 animate-fadein">
          With thousands of donors and countless campaigns funded, Donati has transformed lives by providing financial assistance to those in need. Join our mission to spread kindness.
        </p>
      </div>

      {/* Get Involved */}
      <div className="bg-[#23232a] text-white py-12 text-center border-t border-[#23232a]">
        <h2 className="text-3xl font-bold text-blue-500 mb-2 animate-slideup">Get Involved</h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-300 animate-fadein">
            Whether you&apos;re looking to start a campaign, donate to a cause, or spread the word, you can make a difference today!
        </p>
        <div className="mt-6">
          <button 
            onClick={() => router.push("/signup")}
            className="btn-primary"
          >
            Start Fundraising
          </button>
        </div>
      </div>
    </div>
  );
}
