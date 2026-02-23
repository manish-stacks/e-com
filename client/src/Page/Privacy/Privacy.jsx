import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Img from './bg-about.jpg';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      
      {/* Hero Section */}
      <div
        className="relative text-white py-20"
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Privacy <span className="bg-gradient-to-r from-[#FFB229] to-[#FFD966] bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-xl opacity-90">Grand Masala – Privacy Policy</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

        {/* Dates */}
        <section className="text-gray-700">
          <p><strong>Effective Date:</strong> 2 February 2026</p>
          <p><strong>Last Updated:</strong> 2 February 2026</p>
        </section>

        {/* Intro */}
        <section>
          <p className="text-gray-700 leading-relaxed">
            At Grand Masala, we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, and safeguard your personal information when you visit our website, make a purchase, or interact with us in any way.
          </p>
        </section>

        {/* 1 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            1. Information We Collect
          </h2>

          <p className="text-gray-700 mb-3">
            We may collect the following types of information:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Personal Information:</strong> Name, phone number, email address, shipping and billing address.
            </li>
            <li>
              <strong>Payment Information:</strong> Securely processed via trusted payment gateways (we do not store your card details).
            </li>
            <li>
              <strong>Order & Usage Data:</strong> Purchase history, browsing patterns, device information, cookies.
            </li>
          </ul>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            2. How We Use Your Information
          </h2>

          <p className="text-gray-700 mb-3">
            We use your information to:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Process and fulfill your orders.</li>
            <li>Send you order confirmations, delivery updates, and promotional offers (if you opt-in).</li>
            <li>Improve our products, website, and customer service.</li>
            <li>Prevent fraud, comply with legal obligations, and manage disputes.</li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            3. Sharing of Information
          </h2>

          <p className="text-gray-700 mb-3">
            We do not sell or rent your personal data. However, we may share your information with:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Logistics & Delivery Partners:</strong> To ensure smooth delivery of your orders.</li>
            <li><strong>Payment Gateways:</strong> For processing secure transactions.</li>
            <li><strong>Marketing & Analytics Tools:</strong> To improve our website and communicate offers (only if opted in).</li>
            <li><strong>Legal Authorities:</strong> If required to comply with applicable laws.</li>
            <li><strong>Business Transfers:</strong> If Grand Masala undergoes a merger or acquisition, your data may be transferred with the business assets.</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700">
            We implement strict security measures to protect your data. While no online transmission is 100% secure, we use encryption, secure servers, and limited data access internally.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            5. Use of Cookies
          </h2>

          <p className="text-gray-700 mb-3">
            Our website may use cookies to:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Remember your preferences and cart items.</li>
            <li>Analyze site traffic and usage.</li>
          </ul>

          <p className="text-gray-700 mt-3">
            You can disable cookies through your browser, though some features may not function correctly.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            6. Your Rights
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Request access to your data.</li>
            <li>Ask us to correct or delete your data.</li>
            <li>Opt-out of marketing communication anytime.</li>
          </ul>

          <p className="text-gray-700 mt-3">
            To exercise these rights, contact us at info@grandmasala.in.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-2xl font-bold text-[#81190B] mb-4">
            7. Updates to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. All updates will be posted here with the revised date. Continued use of our services means you accept the updated policy.
          </p>
        </section>

        {/* 8 */}
        <section className="bg-gradient-to-r from-[#81190B] to-[#A41C0F] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>

          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-amber-300" />
              <span>
                Grand Masala <br />
                47, VPO Dhauj, Tehsil Dhauj, Near Rabia Masjid, Faridabad, India, Haryana
              </span>
            </div>

            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-amber-300" />
              <span>Email: info@grandmasala.in</span>
            </div>

            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-amber-300" />
              <span>Phone: +919355577789</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Privacy;
