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
    <div className="min-h-screen bg-[#18181b] text-[#e0e7ef]">
      {/* Hero Section */}
      <div className="bg-[#23232a] text-white py-16 text-center border-b border-[#23232a]">
        <h1 className="text-5xl font-extrabold text-blue-500 mb-2">Our Projects</h1>
        <p className="mt-2 text-lg text-gray-300">Empowering lives through crowdfunding initiatives</p>
      </div>

      {/* Our Crowdfunding Projects */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-2 animate-slideup">Impactful Campaigns</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[{
            img: project1,
            title: "Medical Aid for Children",
            desc: "Providing healthcare support for underprivileged children."
          }, {
            img: project2,
            title: "Disaster Relief Fund",
            desc: "Helping families affected by natural calamities."
          }, {
            img: project3,
            title: "Education for All",
            desc: "Funding schools & scholarships for underprivileged students."
          }].map((proj, idx) => (
            <div key={idx} className="max-w-sm bg-[#23232a] rounded-xl shadow-lg overflow-hidden border border-[#23232a] transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 animate-fadein">
              <Image src={proj.img} alt={proj.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col items-center">
                <h3 className="font-bold text-lg text-blue-400 mb-2">{proj.title}</h3>
                <p className="text-gray-400 mb-4">{proj.desc}</p>
                <button className="btn-primary w-full animate-fadein" onClick={() => window.location.href = '/dashboard'}>
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Donation Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            title: "Verify Campaigns",
            desc: "Always check the authenticity of campaigns before donating.",
            img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
          }, {
            title: "Track Your Impact",
            desc: "Follow up on how your donation is used for transparency.",
            img: "https://images.unsplash.com/photo-1465101178521-c1a2b3a8e8a2?auto=format&fit=crop&w=400&q=80"
          }, {
            title: "Share & Inspire",
            desc: "Encourage others to join and support meaningful causes.",
            img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
          }].map((tip, idx) => (
            <div key={idx} className="bg-[#18181b] rounded-xl shadow-lg p-6 text-center border border-blue-500 transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 animate-fadein flex flex-col items-center">
              <Image src={tip.img} alt={tip.title} width={64} height={64} className="w-16 h-16 object-cover rounded-full mb-4 shadow-md animate-fadein" />
              <h3 className="text-lg font-bold text-blue-400 mb-2">{tip.title}</h3>
              <p className="text-gray-400 text-sm">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Receivers */}
      <div className="bg-[#23232a] py-12 border-t border-[#23232a]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-2">Active Receivers</h2>
          <p className="text-center text-gray-400 mt-3 max-w-2xl mx-auto">
            These individuals urgently need financial assistance for medical emergencies and other causes.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[{
              img: receiver1,
              name: "John Doe - Urgent Surgery",
              desc: "Raising $10,000 for a life-saving heart surgery."
            }, {
              img: receiver2,
              name: "Jane Smith - Cancer Treatment",
              desc: "Seeking $50,000 for chemotherapy and medical expenses."
            }].map((rec, idx) => (
              <div key={idx} className="max-w-sm bg-[#18181b] rounded-xl shadow-lg overflow-hidden border border-[#23232a] transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 animate-fadein">
                <Image src={rec.img} alt={rec.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col items-center">
                  <h3 className="font-bold text-lg text-blue-400 mb-2">{rec.name}</h3>
                  <p className="text-gray-400 mb-4">{rec.desc}</p>
                  <button className="btn-primary w-full" onClick={() => window.location.href = '/dashboard'}>
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Resources & Documentation */}
      <div className="max-w-5xl mx-auto px-6 py-12">
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

      {/* Get Involved */}
      <div className="bg-[#23232a] text-white py-12 text-center border-t border-[#23232a]">
        <h2 className="text-3xl font-bold text-blue-500 mb-2 animate-slideup">Want to Support a Cause?</h2>
        <p className="mt-3 max-w-2xl mx-auto text-gray-300 animate-fadein">
          Start a campaign, donate, or volunteer today and be a part of the change.
        </p>
        <button className="mt-6 btn-primary animate-fadein">
          Start a Campaign
        </button>
      </div>
    </div>
  );
}
