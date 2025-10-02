"use client";
import Image from "next/image";
import medicalBills from "@/assets/medicalbills.png";
import fundraiser from "@/assets/startMedFundraiser.avif";
import medical from "@/assets/trymedical.avif";

export default function Home() {   
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        src="https://www.w3schools.com/howto/rain.mp4"
      />
  {/* Overlay for dark effect */}
  <div className="absolute inset-0 w-full h-full bg-[#18181b] opacity-10 z-10" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 animate-fadein">
        <div className="font-extrabold text-5xl md:text-6xl text-center text-[#e0e7ef] mb-6 drop-shadow-lg animate-slideup">
          <span className="text-blue-500">Donati</span> — Empower Generosity
        </div>
        <p className="text-lg md:text-xl text-center max-w-xl text-gray-300 font-medium mb-8 animate-fadein">
          A secure, transparent platform for fundraising and giving. Make a difference with just a few clicks.
        </p>
        <div className="flex gap-4 mb-12 animate-fadein">
          <button className="btn-primary" onClick={() => window.location.href = '/dashboard'}>Start a Fundraiser</button>
          <button className="btn-primary" onClick={() => window.location.href = '/projects'}>Browse Campaigns</button>
        </div>
      </div>

    </div>
  );
}
