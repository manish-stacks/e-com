import React from "react";
import haldi from "./hldi.jpg";
import spices from "../../Components/FeaturePost/right.png";
import chilli from "./chilli.jpeg";
// import Vector from "./haldi-vector.png";
import BgImg from "./bg-about.jpg";
import { Link } from "react-router-dom";


const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: " The Magic of Turmeric",
      subtitle: "Discover the golden spice that heals and flavors.",
      image: haldi,
      category: "Spices & Health",
    },
    {
      id: 2,
      title: "Cinnamon Secrets",
      subtitle: "Why this sweet spice is loved worldwide.",
      image: spices,
      category: "Flavors & Wellness",
    },
    {
      id: 3,
      title: "Red Chili Power",
      subtitle: "The fiery spice that adds heat to every dish.",
      image: chilli,
      category: "Spice Culture",
    },
  ];

  return (
    <div className="relative bg-[#F4F1EA] ">
      {/* Hero Section */}
      <div
        className="relative text-white py-20"
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-[#FFB229] to-[#FFD966] bg-clip-text text-transparent">
              Blogs
            </span>
          </h1>
          {/* <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Explore the world of spices with Grand Masala. From kitchen tips and
            authentic recipes to the rich heritage of Indian flavors, our blogs
            are crafted to inspire your cooking journey and celebrate the art of
            spices.
          </p> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-15">
        {/* Section Heading */}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
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
                <p className="text-gray-600 mb-4">{blog.subtitle}</p>
                <Link to='/blogs-details'
                  className="inline-flex items-center text-[#81190B] font-medium hover:text-[#5a1208] transition-colors duration-200"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
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
