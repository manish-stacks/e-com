import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import Bg from './parallax2.jpg';

export default function BgMoving() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{ backgroundImage: `url(${Bg})` }}
      />

      {/* Overlay with gradient */}
      <div className="absolute " />
      {/* <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-700/70 z-1" /> */}

      <section className="relative z-2 text-white py-16 md:py-24 px-5 min-h-[80vh] flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text Content */}
            <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} w-full lg:w-7/12`}>
              <div className="bg-[#81190bc7] backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border border-amber-500/30">
                <div className="flex items-center mb-6">
                  <div className="h-1 w-12 bg-amber-400 mr-4"></div>
                  <h2 className="text-3xl md:text-4xl font-bold font-serif">Our Story</h2>
                </div>

                <p className="text-lg leading-relaxed mb-5 transition-all duration-700 delay-150">
                  <span className="text-amber-300 font-semibold">Grand Masala</span> began with a simple mission: to deliver authentic, natural spices directly to your kitchen. Our founder, MD Juber, sourced the finest spices from across India, blending tradition with quality.
                </p>

                <p className="text-lg leading-relaxed mb-5 transition-all duration-700 delay-300">
                  Over the years, we've expanded globally, reaching spice lovers in 25 countries. Every product is carefully tested for aroma, freshness, and taste to ensure only the best reaches you.
                </p>

                <p className="text-lg leading-relaxed transition-all duration-700 delay-500">
                  Today, Grand Masala continues to inspire culinary creativity, offering over 50 varieties of premium spices and blends, while staying true to our core values: quality, authenticity, and customer delight.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Link to="/shop" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                    <span>Explore Our Products</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </Link>

                  <Link to="/blogs" className="bg-transparent hover:bg-amber-500/20 border-2 border-amber-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center">
                    <span>Read Our Blog</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Spice Visualization */}
            {/* <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} w-full lg:w-5/12 flex justify-center`}>
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-[#81190bc7] backdrop-blur-sm rounded-full flex items-center justify-center p-8 border-2 border-amber-500/30 shadow-2xl">
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-amber-300 mb-2">15 % </div>
                    <div className="text-white text-lg">Off On Your First Order</div>

                    <div className="h-1 w-16 bg-amber-400 mx-auto my-4"></div>


                  </div>
                </div>

              
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-amber-600/40 blur-md animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-amber-800/40 blur-md animate-pulse delay-1000"></div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}