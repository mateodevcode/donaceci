"use client";

import React from "react";
import { BiMapPin, BiPhone } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import { TbMail } from "react-icons/tb";
import Logo from "../principal/logo/Logo";
import Link from "next/link";
import Image from "next/image";
import AvisoFooter from "./AvisoFooter";
import Ubicacion from "./Ubicacion";
import { datosDonaCeci } from "@/data/donaceci";

const Footer = () => {
  const phoneNumber = "+573225248103"; // Número de teléfono de Doña Ceci
  // Correo electrónico de Doña Ceci
  const email = "congeladosdonaceci@gmail.com";
  const subject = "Información sobre Dona Ceci";
  const body = "Hola, me gustaría obtener más información.";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full">
      <footer className="w-full relative flex items-center justify-center">
        <div className="relative z-10 pb-5 pt-20 w-8/12 md:w-11/12 lg:w-8/12">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div>
              <Logo />
            </div>
          </div>

          {/* Footer Content */}
          <div className="container mx-auto px:12 md:px-0 z-10 mt-20 font-roboto">
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center justify-around text-white gap-8 md:gap-12 ">
              {/* Horarios */}
              <div className="text-center w-80">
                <div className="w-12 h-12 bg-[#eec802] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Horarios</h3>
                <div className="space-y-2">
                  <div>
                    <div className="font-medium">Lunes a Domingo</div>
                    <div className="text-sm text-gray-300"> 
                      11:30 AM - 03:00 PM
                    </div>
                    <div className="text-sm text-gray-300">
                      05:00 PM - 11:00 PM
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* Contacto */}
              <div className="text-center w-80">
                <div className="w-12 h-12 bg-[#eec802] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BiPhone className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Contacto</h3>
                <div className="space-y-2">
                  <div
                    className="flex items-center justify-center gap-2 cursor-pointer"
                    onClick={handleCall}
                  >
                    <BiPhone className="w-4 h-4" />
                    <span>{datosDonaCeci.telefono}</span>
                  </div>
                  <div
                    className="flex items-center justify-center gap-2 cursor-pointer"
                    onClick={handleEmail}
                  >
                    <TbMail className="w-4 h-4" />
                    <span>{datosDonaCeci.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BiMapPin className="w-4 h-4" />
                    <div className="flex flex-col items-center">
                      <span>{datosDonaCeci.direccion}</span>
                      <span>Sabanalarga, Atlántico</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dónde Encontrarnos */}
              <div className="text-center w-80">
                <div className="w-12 h-12 bg-[#eec802] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BiMapPin className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Dónde Encontrarnos
                </h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <Ubicacion />
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-white mt-12 pt-8 border-t border-white/20 ">
              <p className="text-sm">
                © 2025 Doña Ceci. Todos los derechos reservados.
              </p>
              <p className="text-sm mt-2">
                Desarrollado por{" "}
                <Link
                  href="https://seventwo.tech"
                  target="_blank"
                  className="font-semibold hover:text-[#eec802] transition-colors"
                >
                  seventwo
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 w-full">
          <Image
            src="/footer/fondoFooter2.jpg"
            width={1920}
            height={1080}
            alt="Fondo del footer"
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/70 w-full"></div>
        {/* Legal Links */}

        <div className="flex absolute -top-1 items-center justify-center w-full z-20 rotate-180">
          <Image
            src={"/divisor/divisor.png"}
            alt={"divisor"}
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
          />
        </div>
      </footer>
      <AvisoFooter />
    </div>
  );
};

export default Footer;
