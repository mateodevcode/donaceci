"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { datosDonaCeci } from "@/data/donaceci";
import { MainfudContext } from "@/context/MainfudContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { setOpenModalContacto } = useContext(MainfudContext);
  const pathName = usePathname();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <nav className="w-11/12 md:w-10/12 lg:w-8/12 flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex gap-4">
          <Link href={datosDonaCeci.redes_sociales.facebook} target="_blank">
            <FaFacebook className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
          <Link href={datosDonaCeci.redes_sociales.instagram} target="_blank">
            <FaInstagram className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
          <Link href={datosDonaCeci.redes_sociales.tiktok} target="_blank">
            <FaTiktok className="w-5 h-5 text-white hover:text-[#eec802] cursor-pointer" />
          </Link>
        </div>
        {/* Menu Items */}
        <div className="hidden lg:flex items-center gap-8 text-white font-roboto">
          <Link
            href="/"
            className={`hover:text-[#eec802] transition-colors active:scale-95 duration-75 ${
              pathName === "/" ? "text-[#eec802] font-semibold" : ""
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/nosotros"
            className={`hover:text-[#eec802] transition-colors active:scale-95 duration-75 ${
              pathName === "/nosotros" ? "text-[#eec802] font-semibold" : ""
            }`}
          >
            El Restaurante
          </Link>
          <Link
            href="/menu"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            Menu
          </Link>
          <button
            onClick={() => {
              setOpenModalContacto(true);
            }}
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none cursor-pointer"
          >
            Contacto
          </button>
        </div>
        <Link
          href="/menu"
          className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 text-sm cursor-pointer select-none active:scale-95 transition-colors duration-300 animate-pulse"
        >
          Realizar Pedido
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
