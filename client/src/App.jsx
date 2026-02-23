import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Page/Home/Home'
import Shop from './Page/Shop/Shop'
import About from './Page/About/About'
import Contact from './Page/Contact/Contact'
import Register from './Page/Auth/Register'
import Privacy from './Page/Privacy/Privacy'
import Term from './Page/Term/Term'
import Login from './Page/Auth/Login'
import Forget from './Page/Auth/Forget'
import VerifyOtp from './Page/Auth/VerifyOtp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './Page/ProductDetail/ProductDetail'
import CartPage from './Page/Cart/Cart'
import CheckoutFlow from './Page/Cart/CheckoutFlow'
import Profile from './Page/Profile/Profile'
import TrackYourOrder from './Page/TrackYourOrder/TrackYourOrder'
import { Provider } from 'react-redux'
import { store } from './Page/store/store'
import Blogs from './Page/Blogs/Blog'
import BlogsDetals from './Components/Blog/Blog-details' 
import Refund from './Page/Refund/RefundPolicy'
import Shipping from './Page/Shippingpolicy/ShippingPolicy'
import Return from './Page/ReturnPolicy/ReturnPolicy'
import SignupPopup from './Components/PopUp/PopUp'
import CheckOutWithoutLogin from './Page/Cart/CheckOutWithoutLogin';
import SuccessPage from './Page/SuccessPage/SuccessPage';
import SuccessPageCOD from './Page/SuccessPage/SuccessPageCOD';

const App = () => {
  return (
    <HelmetProvider>
    <Provider store={store}>
    <Router>
      <Header />
      <SignupPopup />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/Verify-Otp' element={<VerifyOtp />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms' element={<Term />} />
        <Route path='/refund' element={<Refund  />} />
        <Route path='/shipping' element={<Shipping  />} />
        <Route path='/return' element={<Return  />} />
        <Route path='/product-page/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutFlow />} />
        <Route path="/checkout-flow" element={<CheckOutWithoutLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-your-order" element={<TrackYourOrder />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs-details" element={<BlogsDetals />} />
        <Route path="/Receipt/order-confirmed" element={<SuccessPage />} />
        <Route path="/receipt-cod/order-confirmed" element={<SuccessPageCOD />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
    </Provider>
    </HelmetProvider>
  )
}

export default App
