import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import Img from './bg-about.jpg'
import Spices from './spice.png'

import {
  Award,
  Users,
  Globe,
  Heart,
  Target,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Truck,
  RefreshCw,
  CheckCircle,
  Quote
} from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  // const stats = [
  //   { number: '100K+', label: 'Satisfied Customers', icon: Users },
  //   { number: '25+', label: 'Countries Served', icon: Globe },
  //   { number: '50+', label: 'Spice Varieties', icon: Award },
  //   { number: '99.9%', label: 'Customer Satisfaction', icon: Star }
  // ]

  const values = [
    {
      icon: Heart,
      title: 'Passion for Spices',
      description: 'We believe every meal should be flavorful. Our spices are carefully sourced for authenticity and aroma.',
      color: 'from-[#81190B] to-[#FFB229]'
    },
    {
      icon: Shield,
      title: 'Quality First',
      description: 'Every batch undergoes strict quality checks. Only the best, 100% natural spices make it to your kitchen.',
      color: 'from-[#81190B] to-[#FFB229]'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'From new blends to convenient packaging, we continuously innovate to enhance your cooking experience.',
      color: 'from-[#81190B] to-[#FFB229]'
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. From easy ordering to prompt support, we are here for you.',
      color: 'from-[#81190B] to-[#FFB229]'
    }
  ]

  // const team = [
  //   {
  //     name: 'MD Juber',
  //     role: 'Founder & CEO',
  //     image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a4?w=400&h=400&fit=crop&crop=face',
  //     bio: 'Spice enthusiast and culinary expert with 10+ years experience sourcing premium spices.'
  //   },
  //   {
  //     name: 'Anjali Mehta',
  //     role: 'Head of Quality',
  //     image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face',
  //     bio: 'Ensures every spice meets the highest quality and freshness standards.'
  //   },
  //   {
  //     name: 'Rohan Kapoor',
  //     role: 'Customer Experience Director',
  //     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  //     bio: 'Passionate about making every customer’s culinary journey memorable.'
  //   }
  // ]

  // const milestones = [
  //   { year: '2018', title: 'Grand Masala Founded', description: 'Started as a small kitchen-based venture sourcing premium spices.' },
  //   { year: '2019', title: 'First Product Line', description: 'Launched 10 signature spice blends loved by food enthusiasts.' },
  //   { year: '2020', title: 'Global Shipping', description: 'Expanded delivery to 15 countries worldwide.' },
  //   { year: '2021', title: 'Sustainability Initiative', description: 'Introduced eco-friendly packaging and organic sourcing.' },
  //   { year: '2022', title: '100K Customers', description: 'Celebrated serving our 100,000th happy customer.' },
  //   { year: '2023', title: 'New Blends', description: 'Launched exotic spice blends and curated gift sets.' }
  // ]

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over ₹1500' },
    { icon: RefreshCw, title: '7-Day Returns', description: 'Satisfaction guaranteed or your money back' },
    { icon: CheckCircle, title: '100% Natural', description: 'No artificial flavors or preservatives' },
    { icon: Star, title: '10 AM - 6 PM Support', description: 'We are always here to help you' }
  ]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },[])

  return (
    <>
      <Helmet>
        <title>Grand Masala: Authentic Spices Delivered to Your Kitchen</title>
        <meta 
          name="description" 
          content="Founded by MD Juber in 2018, Grand Masala offers natural, authentic spices directly to your kitchen. Elevate your cooking with the finest, quality spices." 
        />
        
      </Helmet>
   
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="relative text-white py-20" style={
        {
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }
      }>
        <div className="absolute inset-0 bg-black/60"></div>
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            About <span className="bg-gradient-to-r from-[#FFB229] to-[#FFD966] bg-clip-text text-transparent">Grand Masala</span>
          </h1>
          {/* <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Grand Masala is dedicated to bringing you the finest 100% natural spices. 
            From traditional flavors to exotic blends, we ensure your culinary creations are always rich and authentic.
          </p> */}
        </div>
      </div>

       {/* Story Section with Interactive Elements */}
      <div className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-800 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400 rounded-full opacity-20"></div>
              
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Story</h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Founded in 2018, Grand Masala began with a simple mission: to deliver authentic, natural spices 
                    directly to your kitchen. Our founder, MD Juber, sourced the finest spices from across India, 
                    blending tradition with quality.
                  </p>
                  <p>
                    Over the years, we've expanded globally, reaching spice lovers in 25 countries. Every product 
                    is carefully tested for aroma, freshness, and taste to ensure only the best reaches you.
                  </p>
                  <p>
                    Today, Grand Masala continues to inspire culinary creativity, offering over 50 varieties of premium spices 
                    and blends, while staying true to our core values: quality, authenticity, and customer delight.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div 
                  className="w-full h-full bg-cover bg-center flex items-center justify-center p-8"
                  style={{ backgroundImage: `url(${Spices})` }}
                >
                  <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md">
                    <Quote className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                    <blockquote className="text-xl font-semibold text-gray-900 mb-4">
                      "Every dish deserves the perfect flavor. We make that happen."
                    </blockquote>
                    <cite className="text-amber-600 font-medium">- MD Juber, Founder</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principles that guide every blend, every package, every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-[#81190B] via-[#A41C0F] to-[#81190B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Grand Masala?</h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Authentic, 100% natural spices delivered with care and quality guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-10 h-10  text-slate-200" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                {/* <p className=" text-slate-200">{feature.description}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <TrendingUp className="w-16 h-16 text-[#81190B] mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Elevate Your Cooking?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join the Grand Masala family and bring authentic flavors to your kitchen. Explore our premium 100% natural spices today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-gradient-to-r from-[#FFB229] to-[#FFD966] text-[#81190B] font-bold py-4 px-8 rounded-2xl hover:from-[#FFD966] hover:to-[#FFB229] transition-all duration-300 transform hover:scale-105 shadow-xl">
              Shop Now
            </Link>
            <Link to={"/contact"} className="border-2 border-[#81190B] text-[#81190B] font-bold py-4 px-8 rounded-2xl hover:bg-[#81190B] hover:text-[#FFB229] transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
     </>
  )
}

export default About
