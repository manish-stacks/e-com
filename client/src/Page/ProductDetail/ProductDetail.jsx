"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchProduct,
  setSelectedImage,
  setSelectedVariant,
  incrementQuantity,
  decrementQuantity,
  // toggleWishlist,
  resetProductState,
} from "../store/slices/productSlice"
import { addToCart } from "../store/slices/cartSlice"
import { fetchUserDetails } from "../store/slices/userSlice"
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  // const { user } = useSelector((state) => state.user)
  const { product, loading, selectedImage, selectedVariant, quantity } = useSelector(
    (state) => state.product,
  )

  // Related products state
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const token = sessionStorage.getItem("token_login")
    if (token) {
      dispatch(fetchUserDetails())
    }
    console.log(relatedProducts)
  }, [dispatch])

  useEffect(() => {
    dispatch(resetProductState())
    dispatch(fetchProduct(id))
  }, [dispatch, id])

  // Fetch related products when product is loaded
  useEffect(() => {
    if (product?.category?._id && product?._id) {
      fetch(
        `https://api.grandmasala.in/api/v1/products?category=${product.category._id}&exclude=${product._id}`
      )
        .then((res) => res.json())
        .then((data) => setRelatedProducts(data.products || []))
        .catch(() => setRelatedProducts([]))
    }
  }, [product])
  useEffect(() => {
  if (product?._id) {
    fetch("https://api.grandmasala.in/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        // Filter out the current product
        const filtered = (data.products || []).filter(
          (p) => p._id !== product._id
        );
        setRelatedProducts(filtered);
      })
      .catch(() => setRelatedProducts([]));
  }
}, [product]);

  // Get all product images
  const getProductImages = () => {
    if (!product) return []
    const images = []
    if (product.ProductMainImage?.url) images.push(product.ProductMainImage.url)
    if (product.SecondImage?.url) images.push(product.SecondImage.url)
    if (product.ThirdImage?.url) images.push(product.ThirdImage.url)
    if (product.FourthImage?.url) images.push(product.FourthImage.url)
    if (product.FifthImage?.url) images.push(product.FifthImage.url)
    return images
  }

  const images = getProductImages()
  const currentVariant = product.Varient?.[selectedVariant]

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      dispatch(incrementQuantity())
    } else if (type === "decrement") {
      dispatch(decrementQuantity())
    }
  }

  const handleAddToCart = () => {
    // Validation
    if (!currentVariant) {
      alert("Please select a size")
      return
    }

    const cartData = {
      product: product._id,
      product_name: product.product_name,
      image: product.ProductMainImage?.url || "",
      size: currentVariant.quantity,
      price: currentVariant.price_after_discount,
      quantity: quantity,
      variantId: currentVariant._id,
    }

    dispatch(addToCart(cartData))
    // toast.success("Item added to cart successfully!");
  }

  const handleBuyNow = () => {
    // Validation
    if (!currentVariant) {
      alert("Please select a size")
      return
    }

    const cartData = {
      product: product._id,
      product_name: product.product_name,
      image: product.ProductMainImage?.url || "",
      size: currentVariant.quantity,
      price: currentVariant.price_after_discount,
      quantity: quantity,
      variantId: currentVariant._id,
    }

    dispatch(addToCart(cartData))
    //toast.success("Item added to cart successfully!");
    window.location.href ="/cart"
  }


  const handleImageNavigation = (direction) => {
    if (direction === "prev") {
      dispatch(setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1))
    } else {
      dispatch(setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0))
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#81190B]"></div>
      </div>
    )
  }
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {images.length > 0 && (
                  <img
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.product_name}
                    className="w-full h-full object-contain"
                  />
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNavigation("prev")}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleImageNavigation("next")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => dispatch(setSelectedImage(index))}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-[#81190B] ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Category and Name */}
              <div>
                {product.category?.name && (
                  <p className="text-[#81190B] font-medium text-sm uppercase tracking-wide">{product.category.name}</p>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.product_name}</h1>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                {currentVariant ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">₹{currentVariant.price_after_discount}</span>
                    {currentVariant.price > currentVariant.price_after_discount && (
                      <>
                        <span className="text-xl text-gray-500 line-through">₹{currentVariant.price}</span>
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                          {currentVariant.discount_percentage}% OFF
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-gray-500">Price not available</span>
                )}
              </div>

              {/* Variants */}
              {product.isVarient && product.Varient && product.Varient.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.Varient.map((variant, index) => (
                      <button
                        key={variant._id}
                        onClick={() => dispatch(setSelectedVariant(index))}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedVariant === index
                            ? "border-[#81190B] bg-blue-50 text-[#81190B]"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {variant.quantity}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold min-w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#81190B] hover:bg-[#81190B] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!currentVariant}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#FFB229] hover:bg-[#FFB229] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!currentVariant}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>
                {/* <button
                  onClick={() => dispatch(toggleWishlist())}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-gray-300 hover:border-gray-400 text-gray-600"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button> */}
              </div>

              {/* Stock Status */}
              {/* {currentVariant && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 font-medium">✓ In Stock ({currentVariant.stock_quantity} available)</p>
                </div>
              )} */}

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto text-[#81190B] mb-2" />
                  <p className="text-sm text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto text-[#81190B] mb-2" />
                  <p className="text-sm text-gray-600">Easy Returns</p>
                </div>
                {/* <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-[#81190B] mb-2" />
                  <p className="text-sm text-gray-600">Warranty</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t border-gray-200 p-6 lg:p-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="space-y-4">
                {product.product_description && (
                  <p className="text-gray-700 leading-relaxed">{product.product_description}</p>
                )}
                {product.extra_description && (
                  <p className="text-gray-700 leading-relaxed">{product.extra_description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.length === 0 ? (
              <p className="text-gray-500 col-span-full">No related products found.</p>
            ) : (
              relatedProducts.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                  <img
                    src={item.ProductMainImage?.url || "/placeholder.svg"}
                    alt={item.product_name}
                    className="w-32 h-32 object-contain mb-4 rounded-lg"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{item.product_name}</h3>
                  <p className="text-[#81190B] font-bold mb-2">
                    ₹{item.Varient?.[0]?.price_after_discount || item.price}
                  </p>
                  <a
                    href={`/product/${item._id}`}
                    className="bg-[#81190B] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A41C0F] transition-colors"
                  >
                    View Details
                  </a>
                </div>
              ))
            )}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ProductDetail