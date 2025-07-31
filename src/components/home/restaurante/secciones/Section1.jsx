import { datosDonaCeci } from "@/data/donaceci";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Section1 = () => {
  return (
    <div className="w-full lg:w-7/12 h-[550px] md:h-[900px] flex flex-col mb-44 md:mb-24 smd:mb-44 lg:mb-0 justify-center lg:justify-start">
      <span className="text-[#965511] font-semibold">
        Deliciosas Empanadas, Platos Gourmet y Artesanales
      </span>
      <h2 className={`font-extrabold text-6xl mb-4 text-black`}>Doña Ceci</h2>
      <Image
        src="/section/crepes-section-1.png"
        alt="Empanadas"
        width={500}
        height={500}
        className="w-full object-cover"
      />
      <div className="flex flex-col items-center justify-center mt-5">
        <Link
          href="https://wa.me/573225248703?text=Hola,%20me%20gustaría%20hacer%20un%20pedido."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#eec802] w-80 h-28 p-5 flex flex-col items-center justify-center -mt-20 text-[#965511] shadow-2xl shadow-amber-300 hover:scale-110 transition-transform duration-500 cursor-pointer select-none active:scale-95"
        >
          <p className="text-2xl font-semibold text-black font-roboto">
            Pide el tuyo
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-2xl">
            <FaWhatsapp className="" />
            <span className="font-semibold font-roboto">
              {datosDonaCeci.telefono}
            </span>
          </div>
        </Link>
      </div>
      
    </div>
  );
};

export default Section1;
