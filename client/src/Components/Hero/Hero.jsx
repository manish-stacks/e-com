import React from 'react';
import { Link } from "react-router-dom";
import heroVideo from '/video/video-banner.mp4';
  
const Hero = () => {
  return (
    <div className="relative w-full h-[780px] flex items-center justify-center text-center text-white px-4 overflow-hidden">
      
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
      />

      {/* Overlay to make text visible */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-2">
          <span className="bg-amber-700 text-amber-100 text-sm md:text-base px-4 py-2 rounded-full uppercase tracking-wider">
            100% Natural
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-3">
          Experience the Richness of <span className="text-amber-300">Authentic Spices</span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Handcrafted blends of Haldi, Garam Masala, Dhania, and Lal Mirch – bringing generations of flavor to your kitchen.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/shop" className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
            Explore Our Spices
          </Link>
          <Link to="/about" className="bg-transparent hover:bg-amber-100 hover:text-amber-900 border-2 border-amber-100 text-amber-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Learn Our Story
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Hero;
