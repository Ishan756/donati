"use client";

import React from "react";
import Image from "next/image";

// Importing images
import project1 from "@/assets/image1.avif";
import project2 from "@/assets/image2.avif";
import project3 from "@/assets/image3.avif";
import receiver1 from "@/assets/image4.avif";
import receiver2 from "@/assets/image5.jpg";

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* 🔹 Hero Section */}
      <div className="bg-blue-950 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Projects</h1>
        <p className="mt-2 text-lg text-gray-300">Empowering lives through crowdfunding initiatives</p>
      </div>

      {/* 🔹 Our Crowdfunding Projects */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-900">Impactful Campaigns</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={project1} alt="Project 1" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Medical Aid for Children</h3>
              <p className="text-gray-700 mt-2">Providing healthcare support for underprivileged children.</p>
            </div>
          </div>

          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={project2} alt="Project 2" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Disaster Relief Fund</h3>
              <p className="text-gray-700 mt-2">Helping families affected by natural calamities.</p>
            </div>
          </div>

          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={project3} alt="Project 3" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Education for All</h3>
              <p className="text-gray-700 mt-2">Funding schools & scholarships for underprivileged students.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Active Receivers */}
      <div className="bg-gray-200 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">Active Receivers</h2>
          <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">
            These individuals urgently need financial assistance for medical emergencies and other causes.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={receiver1} alt="Receiver 1" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">John Doe - Urgent Surgery</h3>
                <p className="text-gray-700 mt-2">Raising $10,000 for a life-saving heart surgery.</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                  Donate Now
                </button>
              </div>
            </div>

            <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={receiver2} alt="Receiver 2" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">Jane Smith - Cancer Treatment</h3>
                <p className="text-gray-700 mt-2">Seeking $50,000 for chemotherapy and medical expenses.</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Get Involved */}
      <div className="bg-blue-900 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Want to Support a Cause?</h2>
        <p className="mt-3 max-w-2xl mx-auto">
          Start a campaign, donate, or volunteer today and be a part of the change.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
          Start a Campaign
        </button>
      </div>
    </div>
  );
}
