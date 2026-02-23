// import React from "react";
// import Image2 from "./grand-masala.jpg";
// import Natural from "./hun-natural.png";
// import Trusted from "./trusted.png";
// import Madeinindia from "./made-in-india.png";
// import Quality from "./quality.png";

// export default function FeaturesSection() {
//   return (
//     <div className="w-full bg-white py-12 px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-2 gap-10 items-center">
//           {/* Left Image */}
//           <div className="flex justify-center">
//             <img
//               src={Image2}
//               alt="Spices"
//               className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-lg object-cover"
//             />
//           </div>

//           {/* Right Content */}
//           <div className="space-y-8">
//             <div className="flex items-start gap-4">
//               <img src={Natural} alt="Natural Spices" className="w-14 h-14" />
//               <div>
//                 <h3 className="text-xl font-bold text-[#81190B]">
//                   100% Natural Spices
//                 </h3>
//                 <p className="text-gray-600">
//                   We believe in pure taste. Our spices are free from artificial
//                   colors, preservatives, and additives, ensuring authenticity in
//                   every pack.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <img src={Trusted} alt="Trusted Brand" className="w-14 h-14" />
//               <div>
//                 <h3 className="text-xl font-bold text-[#81190B]">Trusted Worldwide</h3>
//                 <p className="text-gray-600">
//                   With decades of experience, we have earned trust across India
//                   and abroad, making us a recognized name in the spice industry.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <img src={Madeinindia} alt="Made in India" className="w-14 h-14" />
//               <div>
//                 <h3 className="text-xl font-bold text-[#81190B]">Made in India</h3>
//                 <p className="text-gray-600">
//                   All our spices are ethically sourced from local farms and
//                   processed in our factories with state-of-the-art technology.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <img src={Quality} alt="Quality Attested" className="w-14 h-14" />
//               <div>
//                 <h3 className="text-xl font-bold text-[#81190B]">
//                   Quality Attested
//                 </h3>
//                 <p className="text-gray-600">
//                   We are the first Spice Company in North India accredited with
//                   FSSC 22000 and ISO 22000:2005 Certification. Because of the
//                   quality norms and standards, we are preferred suppliers for
//                   many Indian and international brands.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import Image2 from "./grand-masala.jpg";
import Natural from "./hun-natural.png";
import Trusted from "./trusted.png";
import Madeinindia from "./made-in-india.png";
import Quality from "./quality.png";

export default function FeaturesSection() {
  return (
    <div className="w-full bg-gradient-to-b from-white to-[#fefaf6] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-[#81190B] mb-4">
            Why Choose Grand Masala?
          </h2> */}
          <h2 className="text-3xl lg:text-4xl font-black text-[#81190B] mb-4">
          Premium Quality Spices
        </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFB229] to-[#81190B] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            For generations, we've been committed to bringing you the finest quality spices with authenticity and care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image with frame */}
          <div className="flex justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FFB229]/20 to-[#81190B]/10 rounded-2xl -z-10"></div>
              <img
                src={Image2}
                alt="Spices"
                className="w-full rounded-xl shadow-lg object-cover transform transition-all duration-500 hover:scale-105"
              />
              {/* <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-[#f5e6d9]">
                <span className="text-sm font-medium text-[#81190B]">Since 2018</span>
              </div> */}
            </div>
          </div>

          {/* Right Content */}
     {/* Right Content */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Card 1 */}
  <div className="flex flex-col items-start p-6 bg-white rounded-xl border border-[#f5e6d9] shadow-sm hover:shadow-md transition-all duration-300 group sm:aspect-square">
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F4F1EA] to-[#f9ebdb] rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 mb-4">
      <img src={Natural} alt="Natural Spices" className="w-8 h-8" />
    </div>
    <h3 className="text-base sm:text-lg font-bold text-[#81190B] mb-2">100% Natural Spices</h3>
    <p className="text-gray-600 text-sm sm:text-base">
      We believe in pure taste. Our spices are free from artificial colors, preservatives, and additives.
    </p>
  </div>

  {/* Card 2 */}
  <div className="flex flex-col items-start p-6 bg-white rounded-xl border border-[#f5e6d9] shadow-sm hover:shadow-md transition-all duration-300 group sm:aspect-square">
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F4F1EA] to-[#f9ebdb] rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 mb-4">
      <img src={Trusted} alt="Trusted Brand" className="w-8 h-8" />
    </div>
    <h3 className="text-base sm:text-lg font-bold text-[#81190B] mb-2">Trusted Worldwide</h3>
    <p className="text-gray-600 text-sm sm:text-base">
      With decades of experience, we have earned trust across India and abroad.
    </p>
  </div>

  {/* Card 3 */}
  <div className="flex flex-col items-start p-6 bg-white rounded-xl border border-[#f5e6d9] shadow-sm hover:shadow-md transition-all duration-300 group sm:aspect-square">
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F4F1EA] to-[#f9ebdb] rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 mb-4">
      <img src={Madeinindia} alt="Made in India" className="w-8 h-8" />
    </div>
    <h3 className="text-base sm:text-lg font-bold text-[#81190B] mb-2">Made in India</h3>
    <p className="text-gray-600 text-sm sm:text-base">
      All our spices are ethically sourced from local farms with modern technology.
    </p>
  </div>

  {/* Card 4 */}
  <div className="flex flex-col items-start p-6 bg-white rounded-xl border border-[#f5e6d9] shadow-sm hover:shadow-md transition-all duration-300 group sm:aspect-square">
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F4F1EA] to-[#f9ebdb] rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 mb-4">
      <img src={Quality} alt="Quality Attested" className="w-8 h-8" />
    </div>
    <h3 className="text-base sm:text-lg font-bold text-[#81190B] mb-2">Quality Attested</h3>
    <p className="text-gray-600 text-sm sm:text-base">
      Accredited with FSSC 22000 and ISO 22000:2005 Certification ensuring top quality.
    </p>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}
