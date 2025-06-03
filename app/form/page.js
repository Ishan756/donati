"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FundraiserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    neededAmount: "",
    razorpayID: "",
    razorpaySecret: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Fundraiser submitted successfully!");
    router.push("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Fundraiser</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <input
          type="text"
          name="title"
          placeholder="Fundraiser Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="Describe why you need funds"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        ></textarea>

        <input
          type="number"
          name="neededAmount"
          placeholder="Amount Needed (₹)"
          value={formData.neededAmount}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="text"
          name="razorpayID"
          placeholder="Razorpay ID"
          value={formData.razorpayID}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="password"
          name="razorpaySecret"
          placeholder="Razorpay Secret"
          value={formData.razorpaySecret}
          onChange={handleChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Submit Fundraiser
        </button>
      </form>
    </div>
  );
}
