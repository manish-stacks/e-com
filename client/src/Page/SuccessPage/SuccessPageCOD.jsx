"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Truck,
  Phone,
  X,
  ShoppingBag,
  CreditCard,
  Mail,
} from "lucide-react";
import axios from "axios";

const API_BASE = "https://api.grandmasala.in/api/v1";

function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  } catch {
    return "₹" + (amount ?? 0);
  }
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString();
}

export default function SuccessPageCOD() {
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Load token once
  useEffect(() => {
    const t = sessionStorage.getItem("token_login");
    setToken(t);
  }, []);

  // STEP 1 → GET id FROM URL
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      if (!id) {
        setError("Order ID missing in URL");
        setLoading(false);
        return;
      }

      setOrderId(id);
    } catch (err) {
      setError("Failed to read URL");
      setLoading(false);
    }
  }, []);

  // STEP 2 → FETCH ORDER USING THE id
  useEffect(() => {
    // Don’t run until token + orderId are available
    if (!orderId || !token) return;

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("TOKEN USED:", token);

        const url = `${API_BASE}/my-recent-cod-order/${encodeURIComponent(orderId)}`;

        const resp = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (resp.data?.success && resp.data?.data) {
          setOrder(resp.data.data);
        } else {
          setError(resp.data?.message || "Order not found");
        }
      } catch (err) {
        console.error("fetchOrder error:", err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("You are not logged in. Please login to view this order.");
        } else {
          setError(err.response?.data?.message || "Failed to load order.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);


  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-14 w-14 border-t-4 border-green-600 rounded-full"></div>
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-red-100">
          <X className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-red-700">Error!</h1>
          <p className="text-gray-700 mt-2">{error}</p>
          <a
            href="/"
            className="mt-6 inline-block bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (!order) return null;

  // ---- TOTALS ----
  const itemsTotal =
    order.items?.reduce((s, it) => s + it.quantity * it.price, 0) ?? 0;

  const codFee = order.codFeeAmount ?? 0;

  const grandTotal = itemsTotal + order?.shippingAmount - codFee//itemsTotal + codFee;

  // -----------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
          <div className="p-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Order Confirmed!
                </h1>
                <p className="mt-1 text-gray-600">
                  Order ID:
                  <span className="ml-2 font-mono text-gray-800">
                    {order.orderId}
                  </span>
                </p>
              </div>
            </div>

            {/* Order Basic Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border p-4 rounded-2xl">
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-medium text-gray-900">{order.orderId}</p>
              </div>

              <div className="bg-blue-50 border p-4 rounded-2xl">
                <p className="text-xs text-gray-500">Payment Type</p>
                <p className="font-medium text-gray-900">Cash on Delivery</p>
              </div>

              <div className="bg-gray-50 border p-4 rounded-2xl">
                <p className="text-xs text-gray-500">Placed On</p>
                <p className="font-medium text-gray-900">
                  {formatDate(order.orderDate)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#81190B]" /> Items in this order
              </h3>

              <div className="mt-4 space-y-4">
                {order.items.map((it, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-4 rounded-xl border flex justify-between"
                  >
                    <div>
                      <div className="text-gray-900 font-medium">{it.name}</div>
                      <div className="text-gray-500 text-sm">
                        Size: {it.size}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty: {it.quantity}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatCurrency(it.quantity * it.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ₹{it.price} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mt-10 bg-gray-50 p-6 rounded-2xl border">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-500" /> Payment Summary
              </h4>

              <div className="mt-4 space-y-2 text-gray-600 text-sm">
                <div className="flex justify-between">
                  <span>Payment Type</span>
                  <b>COD (Cash on Delivery)</b>
                </div>



                <div className="flex justify-between">
                  <span>Total Items Price</span>
                  <b>{formatCurrency(itemsTotal)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <b>{order?.shippingAmount > 0 ? formatCurrency(order?.shippingAmount) : "Free"}</b>
                </div>
                <div className="flex justify-between">
                  <span>COD Advance</span>
                  <b>-{formatCurrency(codFee)}</b>
                </div>
                <div className="border-t mt-2 pt-3 flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
                <div className="flex justify-between text-amber-600 text-semibold">
                  <span>Amount to Pay at Delivery</span>
                  <b>{formatCurrency(itemsTotal + order?.shippingAmount - codFee)}</b>
                </div>

                <p className="text-xs text-emerald-700 mt-2">
                  Please keep the cash ready when your order arrives.
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-10 bg-white border p-6 rounded-2xl">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" /> Delivery Details
              </h4>

              <div className="mt-3 text-gray-700 text-sm">

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

            {/* Footer */}
            <div className="mt-10 text-center">
              <a
                href="/shop"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow font-semibold"
              >
                Continue Shopping
              </a>
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-4 text-center text-sm">
            © {new Date().getFullYear()} Grand Masala — COD Order Confirmed
          </div>
        </div>
      </div>
    </div>
  );
}
