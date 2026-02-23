import React from 'react';
import { Link } from 'react-router-dom';
import haldiImg from './haldi.png';
import lalMirchImg from './lal-mirch.png';
import dhaniaImg from './dhania.png';
import garamMasalaImg from './garam-masala.png';

// 👇 add product IDs here (from your backend DB)
const categories = [
  { name: 'Haldi', image: haldiImg, productId: '685ba0ff4deb208604e627cb' },
  { name: 'Lal Mirch', image: lalMirchImg, productId: '685b9fc44deb208604e627a6' },
  { name: 'Dhania', image: dhaniaImg, productId: '685b9dd14deb208604e62788' },
  { name: 'Garam Masala', image: garamMasalaImg, productId: '685b9e7e4deb208604e62792' },
];

const ShopByCategory = () => {
  const primaryColor = '81190B'; // your brand color

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-black text-[#81190B] mb-14 text-center">
          Shop By Category
        </h2>

        {/* Category Circles */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {categories.map((category, index) => (
            <Link
              to={`/product-page/${category.productId}`} // 👈 direct to product detail
              key={index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className="w-34 h-34 md:w-40 md:h-40 rounded-full flex items-center justify-center mb-4 relative overflow-hidden shadow-lg"
                style={{ backgroundColor: `#${primaryColor}` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-center text-lg font-semibold text-gray-700 group-hover:text-gray-900">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
