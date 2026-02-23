import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Male from './male.jpg'
import Female from './female.jpeg'

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [isMobile, setIsMobile] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: "Krishan Gupta",
      title: "Taste That Feels Like Home",
      review: "Using Grand Masala Haldi makes my meals comforting and flavorful. The quality and purity are outstanding. It not only adds vibrant color to my curries but also enhances the aroma.",
      product: "Haldi – 100% Natural",
      image: Male,
    },
    {
      id: 2,
      name: "Aehmad",
      title: "Pure Aroma, Authentic Taste!",
      review: "The Garam Masala gives my cooking a rich, authentic flavor. The freshness is remarkable and it blends so well with my dishes. My family often compliments the aroma.",
      product: "Garam Masala – 100% Natural",
      image: Male,
    },
    {
      id: 3,
      name: "Anish Patel",
      title: "Perfect Balance of Heat & Flavor",
      review: "Grand Masala Lal Mirch has the right spice level without losing its authentic taste. Unlike other chilli powders, it does not overpower the food—it brings out a bold, yet balanced heat.",
      product: "Lal Mirch – 100% Natural",
      image: Female,
    },
    {
      id: 4,
      name: "Rajendra Singh",
      title: "Freshness You Can Smell",
      review: "The Dhania powder is so aromatic and fresh, it transforms my curries instantly. It feels like the spices have just been ground, and it gives a homemade touch to every dish.",
      product: "Dhania – 100% Natural",
      image: Male,
    },
    {
      id: 5,
      name: "Safaraz",
      title: "Authentic Flavor Every Time",
      review: "I've tried many spice brands, but nothing comes close to the authentic flavor of Grand Masala. It's become a staple in my kitchen for all my Indian dishes.",
      product: "Grand Masala Pack",
      image: Female,
    },
    {
      id: 6,
      name: "Imrana Ansari",
      title: "Consistent Quality",
      review: "Grand Masala has always been my go-to for consistent quality and amazing flavor. I can't count how many times people have complimented the authentic taste of the curries—it’s one of the reasons I keep coming back!",
      product: "Commercial Pack",
      image: Male,
    },
  ];

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      // setIsMobile(mobile);
      setSlidesToShow(mobile ? 1 : 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= testimonials.length - slidesToShow) {
        return 0; // Loop back to start
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return testimonials.length - slidesToShow; // Loop to end
      }
      return prev - 1;
    });
  };

  const goToSlide = (index) => {
    // Ensure we don't go beyond the last possible slide
    if (index > testimonials.length - slidesToShow) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  // Calculate visible slides
  // const getVisibleSlides = () => {
  //   const visibleSlides = [];
  //   for (let i = 0; i < slidesToShow; i++) {
  //     const slideIndex = (currentSlide + i) % testimonials.length;
  //     visibleSlides.push(testimonials[slideIndex]);
  //   }
  //   return visibleSlides;
  // };

  return (
    // <div className="w-full bg-gradient-to-b from-amber-50 to-orange-50 py-12 px-4 md:px-8 lg:px-16">
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2 text-center">
          What Our Customers Say
        </h2>
        <p className="text-amber-700 text-center mb-10">Discover why our customers love our products</p>

        {/* Carousel Container */}
        <div className="relative overflow-hidden mb-8">
          {/* Slides */}
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full md:w-1/3 px-4 mb-4"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-full border border-amber-100">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-300 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg text-amber-900 mb-2">{testimonial.title}</h3>
                  <div className="flex justify-center text-amber-400 mb-3">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {testimonial.review}
                  </p>
                  <p className="font-bold text-gray-900 mt-auto">{testimonial.name}</p>
                  <p className="text-sm text-amber-700 font-medium">{testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-700 text-white p-2 rounded-full shadow-md hover:bg-amber-800 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-700 text-white p-2 rounded-full shadow-md hover:bg-amber-800 transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: testimonials.length - slidesToShow + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-amber-700' : 'bg-amber-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Special Offer Banner */}
        {/* <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl p-6 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-2">Get flat 24% off</h3>
          <p className="mb-4">On your first order with code WELCOME24</p>
         <Link
  to="/shop"
  className="bg-white text-amber-700 font-semibold py-2 px-6 rounded-full hover:bg-amber-100 transition-colors inline-block"
>
  Shop Now
</Link> 
        </div> */}
      </div>
    </div>
  );
};

export default TestimonialCarousel;