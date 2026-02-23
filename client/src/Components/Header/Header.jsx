"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  LogIn,
} from "lucide-react";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate();

  // Redux state
  const { cartItems } = useSelector((state) => state.cart);

  // Local state
  const [isToken, setIsToken] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate cart count from Redux state
  const cartCount = cartItems.length;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  // const toggleCart = () => setIsCartOpen(!isCartOpen)

  useEffect(() => {
    sessionStorage.getItem("token_login")
      ? setIsToken(true)
      : setIsToken(false);
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search query
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      // Clear search input
      setSearchQuery("");
      // Close mobile search if open
      setIsSearchOpen(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const handleSearchKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch(e)
  //   }
  // }

  return (
    <header className="bg-white sticky shadow-lg top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#81190B] text-white text-sm py-2">
        <div className="max-w-8xl mx-auto px-3 flex justify-between items-center">
          <div className="top-navbar w-full overflow-hidden">
            <article className="main-container__marquee">
              <div className="main-container__marquee-track flex">
                <div className="main-container__marquee-items flex space-x-8">
                  <span className="main-container__marquee-item">
                    {/* Get flat 24% off */}
                  </span>
                  <span className="main-container__marquee-item">
                   Free delivery on orders above ₹ 299{" "}
                  </span>
                  <span className="main-container__marquee-item">
                    {/* Use Code : Firstgrandmasala01 */}
                  </span>
                </div>
                {/* Duplicate for infinite loop effect */}
                <div
                  aria-hidden="true"
                  className="main-container__marquee-items flex space-x-8"
                >
                  <span className="main-container__marquee-item">
                    {/* Get flat 24% off */}
                  </span>
                  <span className="main-container__marquee-item">
                   Free delivery on orders above ₹ 299{" "}
                  </span>
                  <span className="main-container__marquee-item">
                    {/* Use Code : Firstgrandmasala01 */}
                  </span>
                </div>
                {/* Duplicate for infinite loop effect */}
                <div
                  aria-hidden="true"
                  className="main-container__marquee-items flex space-x-8"
                >
                  <span className="main-container__marquee-item">
                    {/* Get flat 24% off */}
                  </span>
                  <span className="main-container__marquee-item">
                   Free delivery on orders above ₹ 299{" "}
                  </span>
                  <span className="main-container__marquee-item">
                    {/* Use Code : Firstgrandmasala01 */}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className=" bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold text-[#862113]">
                <img
                  src={logo || "/placeholder.svg"}
                  className="w-[80px] rounded-lg"
                  alt="Grand Masala"
                />{" "}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8 ">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for Spices.."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-[#81190b] rounded-full focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#81190b] hover:text-[#000000] transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Toggle */}
              <button
                onClick={toggleSearch}
                className="md:hidden p-2 text-[#862113] hover:text-[#000000] transition-colors"
              >
                <Search size={24} />
              </button>

              {isToken ? (
                <Link
                  to="/profile"
                  className="hidden sm:flex p-2 text-[#862113] hover:text-[#000000] transition-colors"
                >
                  <User size={24} />
                </Link>
              ) : (
                <a
                  href="/login"
                  className="hidden sm:flex p-2 text-[#862113] hover:text-[#000000] transition-colors"
                >
                  <LogIn size={24} />
                </a>
              )}

              {/* Shopping Cart with Redux count */}
              <Link
                to="/cart"
                className="p-2 text-[#862113] hover:text-black transition-colors relative"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full border-2 border-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-[#862113] hover:text-[#000000] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden mt-4 pb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for s..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#000000] text-[#862113] focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#000000] transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                 onClick={() => setIsMenuOpen(false) }
                className="text-[#862113] hover:text-[#000000] font-medium py-2 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium py-2 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium py-2 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#862113] hover:text-[#000000] font-medium py-2 transition-colors"
              >
                Contact Us
              </Link>
              <hr className="my-2" />
              <div className="flex items-center space-x-4 pt-2">
                {isToken ? (
                  <a
                    href="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-[#000000] transition-colors"
                  >
                    <User size={20} />
                    <span>Account</span>
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="flex items-center space-x-2 text-gray-700 hover:text-[#000000] transition-colors"
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </a>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
