// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// const banners = [
//   {
//     imgLeft: "/banner-promocion/banner-promocional-6.png",
//     imgRight: "/banner-promocion/banner-promocional-5.png",
//     buttonText: "Ordena ahora",
//   },
//   {
//     imgLeft: "/banner-promocion/banner-promocional-1.png",
//     imgRight: "/banner-promocion/banner-promocional-2.png",
//     buttonText: "Compra ya",
//   },
// ];

// export default function BannerSlider() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % banners.length);
//     }, 5000); // cambia cada 5 segundos
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-4 w-full">
//       <div className="w-full bg-gradient-to-r from-amber-100 via-white to-amber-100 h-40 md:h-80 mt-4 rounded-lg flex items-center justify-between relative shadow-lg overflow-hidden transition-all duration-700">
//         <div className="h-full w-full relative">
//           <Image
//             src={banners[index].imgRight}
//             alt="Banner Derecho"
//             width={500}
//             height={200}
//             priority
//             className="w-40 md:w-80 absolute right-0 top-0 transition-all duration-500"
//           />
//           <Image
//             src={banners[index].imgLeft}
//             alt="Banner Izquierdo"
//             width={500}
//             height={200}
//             priority
//             className="w-52 md:w-96 absolute left-0 top-0 transition-all duration-500"
//           />
//           <button className="absolute bottom-6 md:bottom-12 left-10 md:left-32 text-xs bg-red-600 rounded-full px-4 py-2 text-white font-semibold hover:bg-red-500 transition-colors cursor-pointer select-none active:scale-95">
//             {banners[index].buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
