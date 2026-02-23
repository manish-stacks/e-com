import React from "react";
import Hero from "../../Components/Hero/Hero";
import Features from "../../Components/Features/Features";
import FeatureProduct from "../../Components/FeatureProduct/FeatureProduct";
import FeaturePost from "../../Components/FeaturePost/FeaturePost";
// import Newsletter from '../../Components/Newsletter/Newsletter'
import Testimonial from "../../Components/Testimonial/Testimonial";
// import SpiceFeatures from '../../Components/SpicesFeatures/SpiceFeatures'
import SpiceQuality from "../../Components/SpiceQuality/SpiceQuality";
// import SpiceCornerCarousel from '../../Components/SpiceCorner/SpiceCorner'
import Blog from "../../Components/Blog/Blog";
import "./home.css";
// import PromiseSection from '../../Components/SpicesPromise/SpicesPromise'
import StatsCounter from "../../Components/Counter/Counter";
import Marquee from "../../Components/Marquee/Marquee";
import BgMoving from "../../Components/BgSec/BgMoving";
import ShopByCategory from "../../Components/Category/Category";

const Home = () => {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeatureProduct />
      <SpiceQuality />
      <Marquee />
      <Features />
      <BgMoving />
      <StatsCounter />
      <FeaturePost />
      <Testimonial />
      <Blog />
      {/* <SpiceFeatures /> */}
      {/* <SpiceCornerCarousel /> */}
      {/* <PromiseSection/> */}

      {/* <Newsletter /> */}
    </>
  );
};

export default Home;
