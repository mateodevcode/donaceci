"use client";

import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { MainfudContext } from "@/context/MainfudContext";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbMailFilled } from "react-icons/tb";
import { datosDonaCeci } from "@/data/donaceci";

const MenuHamburguesa = () => {
  const {
    openModalMenuHamburguesaPrincipal,
    setOpenModalMenuHamburguesaPrincipal,
    setOpenModalContacto,
  } = useContext(MainfudContext);
  const phoneNumber = "+573225248703";
  const email = "congeladosdonaceci@gmail.com";
  const subject = "Información sobre Dona Ceci";
  const body = "Hola, me gustaría obtener más información.";

  const enlaces = [
    {
      nombre: "Inicio",
      link: "/",
    },
    {
      nombre: "Menú",
      link: "/menu",
    },
    {
      nombre: "El Restaurante",
      link: "/nosotros",
    },
  ];

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AnimatePresence>
      {openModalMenuHamburguesaPrincipal && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 h-screen w-screen"
          onClick={() => setOpenModalMenuHamburguesaPrincipal(false)}
        >
          <motion.div
            className="relative z-10 w-96 h-96 flex flex-col items-start justify-between bg-black shadow-lg rounded-md p-4 font-roboto text-white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div
              className="flex items-center gap-2 text-white justify-start"
              onClick={handleCall}
            >
              <div className="w-8 h-8 bg-[#eec802] rounded-full flex items-center justify-center mr-2">
                <BiSolidPhoneCall className="w-4 h-4 text-amber-800" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Teléfono:</span>
                <div className="font-medium">{datosDonaCeci.telefono}</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 w-full px-4">
              {enlaces.map((enlace, index) => (
                <Link
                  key={index}
                  href={enlace.link}
                  className="w-full text-left py-2 hover:text-[#eec802] transition-colors active:scale-95 duration-75"
                  onClick={() => setOpenModalMenuHamburguesaPrincipal(false)}
                >
                  {enlace.nombre}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpenModalContacto(true);
                  setOpenModalMenuHamburguesaPrincipal(false);
                }}
                className="hover:text-[#eec802] transition-colors active:scale-95 duration-75 select-none cursor-pointer"
              >
                Contacto
              </button>
            </div>
            <div
              className="flex items-center gap-2 text-white justify-start"
              onClick={handleEmail}
            >
              <div className="w-8 h-8 bg-[#eec802] rounded-full flex items-center justify-center mr-2">
                <TbMailFilled className="w-4 h-4 text-amber-800" />
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium">{datosDonaCeci.email}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuHamburguesa;
