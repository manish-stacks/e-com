// app/Receipt/SuccessPage.jsx  (or pages/Receipt/order-confirmed.jsx depending on your setup)
"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  CreditCard,
  Calendar,
  Phone,
  X,
  ShoppingBag,
  Mail,
} from "lucide-react";
import axios from "axios";

const API_BASE = "https://api.grandmasala.in/api/v1";

function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
  } catch {
    return "₹" + (amount ?? 0);
  }
}

function formatDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString();
}

export default function SuccessPage() {
  const [orderId, setOrderId] = useState(null); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);



  useEffect(() => {
    // extract query params from current url
    try {
      const params = new URLSearchParams(window.location.search);
      // prefer the data param (example you provided)
      const dataParam = params.get("data") || params.get("orderId") || params.get("id");

      console.log('dataParam', dataParam)
      if (dataParam) {
        setOrderId(dataParam);
      } else {
        setError("Order id not found in URL.");
        setLoading(false);
      }

      const t = sessionStorage.getItem("token_login") || null;
      setToken(t);
    } catch (err) {
      console.error(err);
      setError("Unable to read URL parameters.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('token', token)
        // use your protected endpoint — adjust path if your route differs
        const url = `${API_BASE}/my-recent-order/${encodeURIComponent(orderId)}`;

        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const resp = await axios.get(url, { headers });

        if (resp.data?.success && resp.data?.data) {
          setOrder(resp.data.data);
        } else {
          // show backend message if any
          setError(resp.data?.message || "Order not found");
        }
      } catch (err) {
        console.error("fetchOrder error:", err);

        // If 401/403, tell user to login
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError("You are not logged in. Please login to view this order.");
        } else if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to load order. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  // UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-green-600 mb-4" />
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-6">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-red-100">
          <div className="flex items-center justify-center mb-4">
            <X className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <a
              href="/login"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Login
            </a>
            <a
              href="/"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  // compute totals
  const itemsTotal = order.items?.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0) ?? 0;
  const shippingFee = (order.shippingAmount ?? 0) || 0; // shippingCost field optional
  const grandTotal = order.payAmt ?? itemsTotal + shippingFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Thank you — Order Confirmed!</h1>
                <p className="text-gray-600 mt-1">
                  We've received your order <span className="font-mono text-gray-800 ml-1">{order.orderId}</span>.
                </p>
              </div>
            </div>

            {/* Order meta */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-medium text-gray-900 mt-1">{order.orderId}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <p className="text-xs text-gray-500">Status</p>
                <p className="font-medium text-gray-900 mt-1">{order.status}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500">Placed on</p>
                <p className="font-medium text-gray-900 mt-1">{formatDate(order.orderDate)}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#81190B]" /> Items in your order
              </h3>

              <div className="space-y-3">
                {order.items?.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900">{it.name}</div>
                      <div className="text-sm text-gray-500">
                        Size: {it.size || "—"} {it.color ? `• ${it.color}` : ""}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Qty: {it.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(it.price * it.quantity)}</div>
                      <div className="text-xs text-gray-500">₹{it.price} each</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Shipping */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-500" /> Payment
                </h4>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between py-1">
                    <span>Payment Method</span>
                    <strong>{order.payment?.method || order.paymentType || "—"}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Payment Status</span>
                    <strong>{order.payment?.isPaid ? "Paid" : order.payment?.status || "Pending"}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Transaction ID</span>
                    <span className="font-mono text-xs text-gray-700">{order.payment?.transactionId || order.transactionId || "—"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Total Paid</span>
                    <strong>{formatCurrency(order.payAmt)}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-500" /> Shipping
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>
                      {order?.shipping?.name}{" "}
                    </strong>
                    <br />
                    {order?.shipping?.addressLine || "Null"}, {order?.shipping?.state}, {order?.shipping?.city}-{order?.shipping?.postCode}, India

                    <br />
                    {order?.shipping?.addressType && (
                      <>
                        Address Type: {order?.shipping?.addressType}
                        <br />
                      </>
                    )}
                    <span className="flex items-center mt-2">
                      <Phone className="w-4 h-4 mr-2 text-[#81190B]" />
                      {order?.shipping?.mobileNumber}
                    </span>
                    <span className="flex items-center mt-2">
                      <Mail className="w-4 h-4 mr-2 text-[#81190B]" />
                      {order?.shipping?.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items subtotal</span>
                <span>{formatCurrency(itemsTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Shipping</span>
                <span>{shippingFee ? formatCurrency(shippingFee) : <span className="text-emerald-600 font-medium">Free</span>}</span>
              </div>

              {order.offerId && (
                <div className="flex justify-between text-sm text-green-600 mt-2">
                  <span>Discount ({order.offerId.code || "Promo"})</span>
                  <span>-{formatCurrency(((order.totalAmount - order.payAmt) || 0))}</span>
                </div>
              )}

              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Grand Total</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(grandTotal)}</div>
                </div>
                {/* <div>
                  <a
                    href={`/orders/${order.orderId}`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transform transition"
                  >
                    View Order
                  </a>
                </div> */}
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-sm text-gray-500">
                If you need help, contact support at{" "}
                <a href="mailto:info.grandmasala.in" className="text-blue-600 underline">
                  info.grandmasala.in
                </a>
              </div>

              <div className="flex gap-3">
                {/* <a
                  href="/shop"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Continue Shopping
                </a> */}
                <a
                  href={`/shop`}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white text-sm">
            <div className="max-w-4xl mx-auto flex justify-between">
              <div>© {new Date().getFullYear()} Grand Masala</div>
              <div>Estimated delivery: {order.estimatedDeliveryDate ? formatDate(order.estimatedDeliveryDate) : "Calculated after dispatch"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
