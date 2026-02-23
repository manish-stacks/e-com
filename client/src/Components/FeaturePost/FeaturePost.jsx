import React from 'react'
import left from './left.jpg' // replace with haldi image
import right from './right.png' // replace with lal mirchi / masala image
import { Link } from 'react-router-dom'

const FeaturePost = () => {
  return (
    <div className="min-h-75vh p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Haldi & Dhaniya Card */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${left})`,
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0000008c] bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
                PURE HALDI & DHANIYA
              </h2>
              <p className="text-sm md:text-base mb-8 max-w-md leading-relaxed opacity-90">
                Experience the richness of 100% natural Haldi and Dhaniya. Freshly ground to bring authentic taste, aroma, and health benefits to your kitchen.
              </p>
              <Link to={'/shop'} className="border-2 border-white text-white px-8 py-3 font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                SHOP NOW
              </Link>
            </div>
          </div>

          {/* Lal Mirchi & Garam Masala Card */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${right})`,
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0000008c] bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide">
                LAL MIRCHI & GARAM MASALA
              </h2>
              <p className="text-sm md:text-base mb-8 max-w-md leading-relaxed opacity-90">
                Add the perfect punch with our fiery Lal Mirchi and aromatic Garam Masala. Handpicked, 100% natural ingredients to spice up every meal.
              </p>
              <Link to="/shop" className="border-2 border-white text-white px-8 py-3 font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                SHOP NOW
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FeaturePost
