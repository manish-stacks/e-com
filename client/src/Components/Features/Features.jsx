import React from "react";
import Natural from "./hun-natura.png";
import FarmFresh from "./farm-fresh.png";
import SafeHygienic from "./safe-hygienic.png";
import Quality from "./quality.png";
import { Link } from "react-router-dom";

export default function Features() {
  const features = [
    {
      id: 1,
      img: Natural,
      title: "100% Natural",
      description: "Spices made with pure, natural ingredients.",
    },
    {
      id: 2,
      img: FarmFresh,
      title: "Farm Fresh",
      description: "Directly sourced from trusted farmers.",
    },
    {
      id: 3,
      img: SafeHygienic,
      title: "Safe & Hygienic",
      description: "Processed with care under strict hygiene.",
    },
    {
      id: 4,
      img: Quality,
      title: "Premium Quality",
      description: "Handpicked spices for authentic flavor.",
    },
  ];

  return (
    <div className="w-full bg-[#F4F1EA] py-16 px-6 lg:px-12">
      {/* <div className="w-full bg-[#F4F1EA] py-16 px-6 lg:px-12"> */}
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-black text-[#81190B] mb-4">
          Why Choose Us
        </h2>
        <p className="text-lg text-gray-600">
          Experience the true essence of quality spices
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
          >
            {/* Image */}
            <img
              src={feature.img}
              alt={feature.title}
              className="w-24 h-24 object-contain mb-6"
            />

            {/* Title */}
            <h3 className="text-xl font-bold text-dark-800 mb-3">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6">{feature.description}</p>

            {/* Button */}
            <Link
              to="/shop"
              className="text-[#ffb229] font-semibold hover:underline"
            >
              EXPLORE ALL →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
