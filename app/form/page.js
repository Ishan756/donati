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
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert image and document to object URLs for preview/download
    let imageUrl = "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80";
    let documentUrl = "";
    if (formData.image) {
      imageUrl = URL.createObjectURL(formData.image);
    }
    if (formData.documents) {
      documentUrl = URL.createObjectURL(formData.documents);
    }
    const newFundraiser = {
      title: formData.title,
      needed: Number(formData.neededAmount),
      raised: 0,
      image: imageUrl,
      reason: formData.description,
      document: documentUrl,
      documentName: formData.documents ? formData.documents.name : "",
    };
    const existing = JSON.parse(localStorage.getItem("fundraisers") || "[]");
    localStorage.setItem("fundraisers", JSON.stringify([newFundraiser, ...existing]));
    alert("Fundraiser submitted successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Fundraiser</h1>

  <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full p-3 mb-3 bg-gray-700 rounded-lg focus:outline-none"
        />
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
