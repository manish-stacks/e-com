import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneImg from "./phone-call.png";
import EmailImg from "./email.png";
import CheckImg from "./work-schedule.png";
import User from "./user.png";
import Img from './bg-about.jpg'


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    Phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setting, setSetting] = useState({});

  const handleFetchSetting = async () => {
    try {
      const { data } = await axios.get(
        "https://api.grandmasala.in/api/v1/admin/settings"
      );
      setSetting(data.data);
    } catch (error) {
      console.log("Internal server error", error);
    }
  };

  useEffect(() => {
    handleFetchSetting();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(setting)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://api.grandmasala.in/api/v1/support-request",
        formData
      );
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        Phone: "",
        message: "",
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Internal server error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      image: PhoneImg,
      title: "Call Us",
      info: "+919355577789",
      description: "Mon-Sat 10 AM - 06 PM",
      bgColor: "bg-gradient-to-r from-[#FFB229] to-[#FF9F00]",
    },
    {
      image: EmailImg,
      title: "Email Support",
      info:  "info@grandmasala.in",
      description: "We reply within 10AM to 6 PM",
      bgColor: "bg-gradient-to-r from-[#81190B] to-[#A41C0F]",
    },
    {
      image: User,
      title: "Address",
      info: "47, VPO Dhauj, Tehsil Dhauj, Near Rabia Masjid, Faridabad, India, Haryana",
      description: "Visit our store",
      bgColor: "bg-gradient-to-r from-[#FFB229] to-[#FF9F00]",
    },
    {
      image: CheckImg,
      title: "Working Hours",
      info: "Mon-Sat",
      description: "10 AM - 06 PM",
      bgColor: "bg-gradient-to-r from-[#81190B] to-[#A41C0F]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative  text-white py-24" style={
              {
                backgroundImage: `url(${Img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }
            }>
              <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-[#FFB229] to-[#FF9F00] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          {/* <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            We're here to help you explore our 100% natural spices. Have a
            question about an order or our products? Our team is ready to
            assist you.
          </p> */}
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactMethods.map((method, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
          >
            <div
              className={`w-20 h-20 rounded-xl flex items-center justify-center mb-4 ${method.bgColor}`}
            >
              {/* <img src={method.image} alt={method.title} className="w-10 h-10 " /> */}
              <img src={method.image} alt={method.title} className="w-10 h-10 filter invert" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {method.title}
            </h3>
            <p className="text-lg font-bold text-gray-700">{method.info}</p>
            <p className="text-sm text-gray-500 mt-1">{method.description}</p>
          </div>
        ))}
      </div>

      {/* Contact Form + Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Send us a Message
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question about our spices or an order? Fill out the form
            below and we'll get back to you promptly.
          </p>

          {isSubmitted && (
            <div className="mb-6 p-4 bg-[#FFB229]/20 border border-[#FFB229] rounded-xl flex items-center gap-3">
              <img src={CheckImg} alt="Success" className="w-6 h-6" />
              <p className="text-[#81190B] font-medium">
                Message sent successfully! We'll be in touch soon.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFB229] focus:border-transparent outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFB229] focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFB229] focus:border-transparent outline-none"
              />
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFB229] focus:border-transparent outline-none"
              >
                <option value="">Select Subject</option>
                <option value="order">Order & Shipping</option>
                <option value="returns">Returns & Refunds</option>
                <option value="product">Product Questions</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              placeholder="Your Message..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFB229] focus:border-transparent outline-none resize-none"
            ></textarea>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#81190B] hover:bg-[#6f1508] text-[#FFB229] font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#FFB229]/50 border-t-[#FFB229] rounded-full animate-spin"></div>
              ) : (
                <>
                  <img src={EmailImg} alt="Send" className="w-5 h-5 filter invert " />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Store Location */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Visit Our Store</h3>
            <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224321.99615187824!2d77.05362179185872!3d28.538782213942742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdf0017871669%3A0x19f6e3672f8e9e3e!2sJai%20Hind!5e0!3m2!1sen!2sin!4v1757331443153!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
