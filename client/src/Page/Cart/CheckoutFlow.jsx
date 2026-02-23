"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Smartphone,
  CheckCircle,
  Loader,
  AlertCircle,
  X,
  Package,
  ShoppingBag,
  Truck,
  Phone,
  Star,
  User,
  Mail, // 👈 NEW
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentStep,
  setError,
  clearError,
  updateAddress,
  setPaymentMethod,
  calculateTotals,
  removeCoupon,
  loadAppliedCoupon,
  resetCheckout,
  fetchSettings,
  createOrder,
} from "../store/slices/checkoutSlice";
import { fetchUserDetails } from "../store/slices/userSlice";
import { clearCart } from "../store/slices/cartSlice";
import axios from "axios";

const CheckoutFlow = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const {
    currentStep,
    loading,
    error,
    success,
    address,
    paymentMethod,
    cartSubtotal,
    shipping,
    orderTotal,
    discountAmount,
    appliedCoupon,
    createdOrder,
  } = useSelector((state) => state.checkout);

  // 👇 NEW: Guest user details
  const [guestDetails, setGuestDetails] = useState({
    Email: "",
    ContactNumber: "",
  });
  const [guestSubmitting, setGuestSubmitting] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saveToken, setSaveToken] = useState("");
  const [user, setUser] = useState({});
  const [codAdvancePaid, setCodAdvancePaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token_login");
    if (!token) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://api.grandmasala.in/api/v1/my-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 1) Initial data load: user, coupon, totals, settings
  useEffect(() => {
    const token = sessionStorage.getItem("token_login");
    const storedCart = JSON.parse(sessionStorage.getItem("cartItems") || "[]");

    setSaveToken(token);

    // setIsLoggedIn(!!token);

    // 👉 Step set karo based on login
    if (token) {
      dispatch(setCurrentStep(1));
      dispatch(fetchUserDetails());
      fetchUser();
    } else {
      dispatch(setCurrentStep(0)); // Guest step
    }

    dispatch(loadAppliedCoupon());

    const storedCoupon = sessionStorage.getItem("appliedCoupon");
    const couponData = storedCoupon ? JSON.parse(storedCoupon) : null;

    dispatch(
      calculateTotals({ cartItems: storedCart, appliedCoupon: couponData })
    );

    dispatch(fetchSettings());

    return () => {
      dispatch(resetCheckout());
    };
  }, [dispatch]);

  // 2) Razorpay script load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token_login");

    if (!token) return;

    const fetchLastOrderAddress = async () => {
      try {
        const res = await axios.get(
          "https://api.grandmasala.in/api/v1/my-last-order",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.success && res.data.order?.shipping) {
          const shipping = res.data.order.shipping;

          dispatch(
            updateAddress({
              name: shipping.name || "",
              city: shipping.city || "",
              state: shipping.state || "",
              postCode: shipping.postCode || "",
              addressType: shipping.addressType || "",
              addressLine: shipping.addressLine || "",
            })
          );
        }
      } catch (error) {
        console.log("Failed to fetch last address", error);
      }
    };

    fetchLastOrderAddress();
  }, [dispatch, saveToken]);

  const handleAddressSubmit = () => {
    if (
      !address.name ||
      !address.city ||
      !address.state ||
      !address.postCode ||
      !address.addressLine ||
      !address.addressType
    ) {
      dispatch(setError("Please fill in all address fields"));
      return;
    }
    dispatch(clearError());
    dispatch(setCurrentStep(2));
  };

  const handlePaymentMethodSelect = (method) => {
    dispatch(setPaymentMethod(method));
    if (method === "COD") {
      dispatch(setCurrentStep(4));
    } else {
      dispatch(setCurrentStep(3));
    }
  };

  // 🔹 NEW: Guest user registration (Step 0)
  const handleGuestSubmit = async () => {
    const { Email, ContactNumber } = guestDetails;

    if (!Email || !ContactNumber) {
      dispatch(setError("Please enter both Email and Contact Number"));
      return;
    }

    try {
      dispatch(clearError());
      setGuestSubmitting(true);

      const res = await axios.post(
        "https://api.grandmasala.in/api/v1/create_user_from_cart",
        {
          Email,
          ContactNumber,
        }
      );

      // console.log("res",res.data)

      if (res.data?.success) {
        // console.log("data,data", data);
        const { token, data: login } = res.data;

        if (token) {
          // 👉 LOGIN: token store karo
          sessionStorage.setItem("token_login", token);
          setSaveToken(token);
        }

        // chahe token ho ya na, user details fetch karwa lo
        dispatch(fetchUserDetails());

        // Ab se pura flow normal logged-in jaisa chalega
        dispatch(setCurrentStep(1));

        // ⚠️ IMPORTANT:
        // Agar backend yaha token bhi bhej raha ho to:
        // sessionStorage.setItem("token_login", res.data.token)

        // Abhi ke liye: guest user id store kar rahe hain
        // sessionStorage.setItem("guest_user_id", user._id);

        // Ab se flow normal step-1 se chalega
        // dispatch(setCurrentStep(1));
      } else {
        dispatch(setError(res.data?.message || "Failed to register user"));
      }
    } catch (err) {
      console.error(err);
      dispatch(setError("Failed to register user. Please try again."));
    } finally {
      setGuestSubmitting(false);
    }
  };

  // new code
  // MAIN: Order create + Razorpay handling

  // this one new code

  const handleCreateOrder = async () => {
    // setIsLoading(true);
    const token = sessionStorage.getItem("token_login");

    if (!token) {
      dispatch(setError("Please enter your details to continue"));
      dispatch(setCurrentStep(0));
      return;
    }

    // ----------------------------------------------------
    // ALWAYS PREPARE orderData FIRST (before any COD logic)
    // ----------------------------------------------------

    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.product,
        product_name: item.product_name,
        Qunatity: item.quantity,
        price_after_discount: item.price,
        Varient_id: item.variantId || "N/A", // FIXED
        size: item.size || "N/A", // FIXED
      })),
      totalAmount: cartSubtotal,
      payAmt: orderTotal,
      paymentType: paymentMethod,
      isVarientInCart: cartItems.some((item) => item.variantId),
      offerId: appliedCoupon?.offerId || null,
      codFeePaid: codAdvancePaid || false,
      shipping: {
        ...address,
        mobileNumber: user?.ContactNumber,
        email: user.Email,
      },
      discountAmount,
      shippingAmount: shipping,
      couponCode: appliedCoupon?.code || null,
    };

    // ----------------------------------------------------
    // STEP 1 — COD selected but ₹50 fee not paid
    // ----------------------------------------------------
    if (paymentMethod === "COD" && !codAdvancePaid) {
  try {
    const res = await axios.post(
      "https://api.grandmasala.in/api/v1/create-cod-order",
      { amount: 50, orderData },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const {
      razorpayOrderId,
      amount,
      currency,
      rezorPayKey,
      orderId, // ⭐ IMPORTANT
    } = res.data;

    const options = {
      key: rezorPayKey,
      amount: amount * 100,
      currency: currency || "INR",
      name: "Grand Masala",
      description: "₹50 COD Delivery Fee",
      order_id: razorpayOrderId,

      handler: function (response) {
        axios
          .post(
            "https://api.grandmasala.in/api/v1/verify-cod-fee",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,

              orderId: orderId, // ✅ ONLY THIS
            },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((resp) => {
            if (resp.data.success) {
              setCodAdvancePaid(true);

              dispatch(clearCart());
              sessionStorage.removeItem("cartItems");
              sessionStorage.removeItem("appliedCoupon");

              if (resp.data.redirectUrl) {
                window.location.href = resp.data.redirectUrl;
              } else {
                window.location.reload();
              }
            } else {
              dispatch(setError("Failed to confirm COD order"));
            }
          })
          .catch(() =>
            dispatch(setError("COD payment verification failed"))
          );
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    return;
  } catch (err) {
    dispatch(setError("Unable to start COD payment"));
    return;
  }
}

    // ----------------------------------------------------
    // STEP 2 — Online or COD (when fee already paid)
    // ----------------------------------------------------
    try {
      const result = await dispatch(createOrder({ orderData, token }));

      if (!createOrder.fulfilled.match(result)) return;

      const payload = result.payload;

      // ONLINE PAYMENT FLOW
      if (paymentMethod === "ONLINE") {
        const { razorpayOrderId, amount, currency, rezorPayKey } = payload;

        const options = {
          key: rezorPayKey,
          amount: amount * 100,
          currency: currency || "INR",
          name: "Grand Masala",
          description: "Payment for order",
          order_id: razorpayOrderId,

          handler: function (response) {
            axios
              .post(
                "https://api.grandmasala.in/api/v1/verify-payment",
                response
              )
              .then((responseData) => {
                if (responseData.data.success) {
                  dispatch(clearCart());
                  sessionStorage.removeItem("cartItems");
                  sessionStorage.removeItem("appliedCoupon");

                  if (responseData.data.redirectUrl) {
                    window.location.href = responseData.data.redirectUrl;
                  } else {
                    window.location.reload();
                  }
                } else {
                  dispatch(setError("Payment failed. Please try again."));
                }
              })
              .catch(() =>
                dispatch(
                  setError("Payment verification failed. Please try again.")
                )
              );
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        // COD (fee already paid earlier)
        dispatch(clearCart());
        sessionStorage.removeItem("cartItems");
        sessionStorage.removeItem("appliedCoupon");
      }
      // setIsLoading(false);
    } catch (err) {
      dispatch(setError("Failed to place order. Please try again."));
    }
  };

  const handleBackNavigation = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    } else {
      window.history.back();
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    dispatch(calculateTotals({ cartItems, appliedCoupon: null }));
  };

  const stepLabels = {
    0: {
      icon: User,
      title: "Your Details",
      color: "from-slate-500 to-slate-700",
    }, // 👈 NEW
    1: {
      icon: MapPin,
      title: "Delivery Address",
      color: "from-blue-500 to-cyan-500",
    },
    2: {
      icon: CreditCard,
      title: "Payment Method",
      color: "from-purple-500 to-pink-500",
    },
    3: {
      icon: Smartphone,
      title: "Online Payment",
      color: "from-emerald-500 to-teal-500",
    },
    4: {
      icon: CheckCircle,
      title: "Confirm Order",
      color: "from-orange-500 to-red-500",
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // UI:
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={handleBackNavigation}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Checkout
              </h1>
              <p className="text-sm text-gray-500 mt-1">Secure & Fast</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                Step {currentStep} of 4
              </div>
              <div className="text-xs text-gray-500">
                {stepLabels[currentStep]?.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-6">
            {[0, 1, 2, 3, 4].map((step) => {
              const StepIcon = stepLabels[step].icon;
              const isActive = step === currentStep;
              const isCompleted = step < currentStep;
              return (
                <div key={step} className="flex items-center">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${stepLabels[step].color} text-white shadow-lg scale-110`
                          : isCompleted
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={18} />
                      ) : (
                        <StepIcon size={18} />
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                    )}
                  </div>
                  {step < 4 && (
                    <div
                      className={`hidden md:block w-20 h-1 mx-4 rounded-full transition-all duration-500 ${
                        step < currentStep
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* 🔹 Step 0: Guest User Details */}
            {currentStep === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Your Details
                    </h2>
                    <p className="text-gray-600">
                      Enter your email and mobile number to continue checkout.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={guestDetails.Email}
                      onChange={(e) =>
                        setGuestDetails((prev) => ({
                          ...prev,
                          Email: e.target.value,
                        }))
                      }
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:border-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={guestDetails.ContactNumber}
                      onChange={(e) =>
                        setGuestDetails((prev) => ({
                          ...prev,
                          ContactNumber: e.target.value,
                        }))
                      }
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:border-gray-300"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGuestSubmit}
                  disabled={guestSubmitting}
                  className="w-full mt-8 bg-gradient-to-r from-slate-600 to-slate-800 text-white py-4 rounded-2xl font-semibold hover:from-slate-700 hover:to-slate-900 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {guestSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader className="w-6 h-6 animate-spin mr-3" />
                      Saving Details...
                    </div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            )}

            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Delivery Address
                    </h2>
                    <p className="text-gray-600">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name, City */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        value={address.name || ""}
                        onChange={(e) =>
                          dispatch(updateAddress({ name: e.target.value }))
                        }
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Address
                      </label>
                      <input
                        type="text"
                        value={address.addressLine || ""}
                        onChange={(e) =>
                          dispatch(
                            updateAddress({ addressLine: e.target.value })
                          )
                        }
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                        placeholder="Your address"
                      />
                    </div>
                  </div>

                  {/* Address wide */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        City
                      </label>
                      <input
                        type="text"
                        value={address.city || ""}
                        onChange={(e) =>
                          dispatch(updateAddress({ city: e.target.value }))
                        }
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                        placeholder="Your city"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        State
                      </label>
                      <input
                        type="text"
                        value={address.state || ""}
                        onChange={(e) =>
                          dispatch(updateAddress({ state: e.target.value }))
                        }
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                        placeholder="Your state"
                      />
                    </div>
                  </div>

                  {/* PIN + Address Type */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        PIN Code
                      </label>
                      <input
                        type="number"
                        value={address.postCode || ""}
                        onChange={(e) =>
                          dispatch(updateAddress({ postCode: e.target.value }))
                        }
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                        placeholder="PIN Code"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Address Type
                      </label>
                      <select
                        value={address.addressType || ""}
                        onChange={(e) =>
                          dispatch(
                            updateAddress({ addressType: e.target.value })
                          )
                        }
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3"
                      >
                        <option value="">Select address type</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddressSubmit}
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2, 3, 4 – already same as tumhare code me hain */}

            {currentStep === 2 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Payment Method
                    </h2>
                    <p className="text-gray-600">
                      Choose your preferred payment option
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => handlePaymentMethodSelect("ONLINE")}
                    className="w-full border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 group"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          Online Payment
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pay instantly using UPI, Net Banking, or Cards
                        </p>
                        <div className="flex items-center mt-2">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            Most Popular
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePaymentMethodSelect("COD")}
                    className="w-full border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-green-500 hover:bg-green-50 transition-all duration-200 transform hover:scale-105 group"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          Cash on Delivery
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pay when your order arrives at your doorstep
                        </p>
                        <div className="flex items-center mt-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-xs text-gray-500">
                            Safe & Secure
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Pay Securely with Razorpay
                      </h2>
                      <p className="text-gray-600">
                        Complete your payment using UPI, Cards or NetBanking
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-6 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-2">Amount to Pay</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ₹{orderTotal.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      You will be redirected to Razorpay secure checkout
                    </p>
                  </div>
                  <button
                    onClick={handleCreateOrder}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Loader className="w-6 h-6 animate-spin mr-3" />
                        Initiating Payment...
                      </div>
                    ) : (
                      "Pay with Razorpay"
                    )}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && paymentMethod === "COD" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                <div className="text-center">
                  {/* Confirmation Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                    Confirm Your Order
                  </h2>

                  {/* Info Message */}
                  <p className="text-gray-600 mb-8 text-lg">
                    You have selected Cash on Delivery. Please confirm your
                    order to proceed.
                  </p>

                  {/* Payment Information Box */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-6 border border-orange-200">
                    <div className="flex items-center justify-center mb-2">
                      <Truck className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="font-medium text-orange-800">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pay ₹{orderTotal.toFixed(2)} when your order arrives
                    </p>
                  </div>

                  {/* COD Advance Payment Section */}
                  {!codAdvancePaid ? (
                    <div className="mb-6">
                      <p className="text-gray-700 mb-3">
                        To proceed with Cash on Delivery, please pay a
                        Non-Refundable
                        <span className="font-semibold text-orange-600">
                          {" "}
                          ₹50 Partial
                        </span>{" "}
                        payment.
                      </p>

                      {paymentMethod === "COD" && !codAdvancePaid && (
                        <div className="mt-4">
                          <button
                            onClick={handleCreateOrder}
                            className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-200"
                          >
                            Pay ₹50 (COD Advance)
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-3">
                      <p className="text-green-700 font-semibold">
                        ✔ ₹50 Delivery Charge Paid Successfully
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sticky top-8 border border-white/20">
              <div className="flex items-center mb-6">
                <ShoppingBag className="w-6 h-6 text-[#81190B] mr-3" />
                <h3 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h3>
              </div>

              {appliedCoupon && (
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-emerald-800">
                        🎉 Coupon Applied
                      </p>
                      <p className="text-xs text-emerald-600 font-mono bg-emerald-100 px-2 py-1 rounded-lg mt-1">
                        {appliedCoupon.code}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition-all duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Subtotal
                  </span>
                  <span className="font-semibold">
                    ₹{cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold">Free</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Discount ({appliedCoupon.code})
                    </span>
                    <span className="font-bold">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-300">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {currentStep >= 1 &&
                (address.houseNo || address.street || address.city) && (
                  <div className="mt-8 pt-6 border-t-2 border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-[#81190B]" />
                      Delivery Address
                    </h4>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>{address.name} </strong>
                        <br />
                        {address?.addressLine || "Null"}, {address?.state},{" "}
                        {address?.city}-{address?.postCode}, India
                        <br />
                        {address.addressType && (
                          <>
                            Type: {address.addressType}
                            <br />
                          </>
                        )}
                        <span className="flex items-center mt-2">
                          <Phone className="w-4 h-4 mr-2 text-[#81190B]" />
                          {user?.ContactNumber}
                        </span>
                        <span className="flex items-center mt-2">
                          <Mail className="w-4 h-4 mr-2 text-[#81190B]" />
                          {user?.Email}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

              {paymentMethod && (
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                    Payment Method
                  </h4>
                  <div
                    className={`rounded-2xl p-4 border-2 ${
                      paymentMethod === "ONLINE"
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
                        : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-800 flex items-center">
                      {paymentMethod === "ONLINE" ? (
                        <>
                          <Smartphone className="w-4 h-4 mr-2 text-[#81190B]" />
                          Online Payment
                        </>
                      ) : (
                        <>
                          <Truck className="w-4 h-4 mr-2 text-green-600" />
                          Cash on Delivery
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-1 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
