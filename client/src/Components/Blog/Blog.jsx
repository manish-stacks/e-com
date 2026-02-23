import React from 'react';
import {Link} from 'react-router-dom'
import haldi from './hldi.jpg';
import spices from "../../Components/FeaturePost/right.png";
import chilli from './chilli.jpeg';
// import Vector from './haldi-vector.png';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: " The Magic of Turmeric",
      subtitle: "Discover the golden spice that heals and flavors.",
      image: haldi,
      category: "Spices & Health"
    },
    {
      id: 2,
      title: "Cinnamon Secrets",
      subtitle: "Why this sweet spice is loved worldwide.",
      image: spices,
      category: "Flavors & Wellness"
    },
    {
      id: 3,
      title: "Red Chili Power",
      subtitle: "The fiery spice that adds heat to every dish.",
      image: chilli,
      category: "Spice Culture"
    }
  ];

  return (
    <div className="relative bg-[#F4F1EA] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <div className='flex justify-center'>
            <div className="w-16 h-1 bg-[#81190B] mb-2 text-center"></div> 
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#81190B] mb-4">
            Spice Blogs
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-58 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-[#81190B] uppercase tracking-wide">
                  {blog.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-gray-900 mt-2 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {blog.subtitle}
                </p>
                <Link to='/blogs-details'  
                  className="inline-flex items-center text-[#81190B] font-medium hover:text-[#5a1208] transition-colors duration-200 mt-4"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link to="/blogs" className="px-6 py-3 bg-[#81190B] text-white font-medium rounded-md hover:bg-[#81190B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB229]">
            View All Spice Blogs
          </Link>
        </div>
        {/* <img
      src={Vector}
      alt=""
      className="absolute bottom-8 right-8 w-32 h-20 pointer-events-none select-none z-10"
      aria-hidden="true"
    /> */}
      </div>
    </div>
  );
};

export default BlogSection;
