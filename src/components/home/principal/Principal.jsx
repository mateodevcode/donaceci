"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import DescubreLaCarta from "./descubre-carta/DescubreLaCarta";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import MenuHamburguesa from "./header/MenuHamburguesa";
import { MainfudContext } from "@/context/MainfudContext";
import Logo from "./logo/Logo";
import Contacto from "./navbar/contacto/Contacto";
import { usePathname } from "next/navigation";

gsap.registerPlugin(MotionPathPlugin);

const Principal = ({ fondo = "/principal/fondo-1.png" }) => {
  const { setOpenModalContacto } = useContext(MainfudContext);
  const pathName = usePathname();

  return (
    <>
      <div className="w-full relative h-min  ">
        {/* Transición de fondos con desvanecimiento */}
        <div className="absolute inset-0 -z-10 w-full">
          <Image
            src={fondo}
            alt={`Fondo`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 z-0"
            priority
          />
          {/* Overlay solo visible en lg, xl y 2xl */}
          <div className="hidden lg:block absolute inset-0 bg-black/50 w-full h-full"></div>
        </div>

        <div className="absolute inset-0 bg-black/50 -z-10 w-full h-screen lg:hidden"></div>
        <div className="w-full md:flex lg:hidden hidden items-center justify-center pt-10">
          <Logo />
        </div>
        <Header />
        <div className="h-[1px] bg-zinc-300/50 my-5" />
        <Navbar />
        <div className="hidden md:flex lg:hidden items-center gap-8 text-white font-roboto w-full justify-center md:mt-12">
          <a
            href={"/"}
            className={`hover:text-[#eec802] transition-colors active:scale-95 duration-75 ${
              pathName === "/" ? "text-[#eec802] font-semibold" : ""
            }`}
          >
            Inicio
          </a>
          <a
            href="/nosotros"
            className={`hover:text-[#eec802] transition-colors active:scale-95 duration-75 ${
              pathName === "/nosotros" ? "text-[#eec802] font-semibold" : ""
            }`}
          >
            El Restaurante
          </a>
          <a
            href="/menu"
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          >
            Menu
          </a>
          <button
            onClick={() => {
              setOpenModalContacto(true);
            }}
            className="hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none cursor-pointer"
          >
            Contacto
          </button>
        </div>
        <DescubreLaCarta />

        {/* Divisor inferior */}
        <div className="absolute bottom-0 flex items-center justify-center w-full lg:mt-24">
          <Image
            src={"/divisor/divisor.png"}
            alt={"divisor"}
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
          />
        </div>
        <MenuHamburguesa />
      </div>

      <Contacto />
    </>
  );
};

export default Principal;
