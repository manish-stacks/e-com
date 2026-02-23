import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PopupDetailsForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Show popup once per session
  useEffect(() => {
    const popupShown = sessionStorage.getItem('popupShown');
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('popupShown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Match backend field names exactly
      const payload = {
        name,
        email,
        Phone: phoneNumber,
        subject: 'Website Visitor Details',
        message: `New visitor details from popup:\n\nName: ${name}\nPhone: ${phoneNumber}\nEmail: ${email}`,
      };

      const res = await axios.post(
        'https://api.grandmasala.in/api/v1/support-request',
        payload
      );

      toast.success(res.data.message || 'Details submitted successfully!');
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setPhoneNumber('');
      setIsChecked(false);

      // Close popup after short delay
      setTimeout(() => setIsOpen(false), 1500);
    } catch (error) {
      console.error('Submission error:', error);
      const msg =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Get in Touch
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {isSubmitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">
              ✅ Thank you! Your details have been submitted.
            </div>
          )}

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#81190B] focus:border-transparent"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#81190B] focus:border-transparent"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#81190B] focus:border-transparent"
                required
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-md border border-gray-200">
              <input
                type="checkbox"
                id="agree"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#81190B] border-gray-300 rounded focus:ring-[#81190B]"
                required
              />
              <label
                htmlFor="agree"
                className="text-sm text-gray-700 leading-relaxed"
              >
                I agree to share my details for follow-up. Read our{' '}
                <a
                  href="/privacy"
                  className="text-[#81190B] hover:underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#81190B] focus:ring-offset-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isChecked || !phoneNumber || !name || !email || isLoading}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#81190B] rounded-lg hover:bg-[#6A1409] focus:outline-none focus:ring-2 focus:ring-[#81190B] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✨ Animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}`;
document.head.appendChild(style);

export default PopupDetailsForm;