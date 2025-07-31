"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import IniciarSesion from "../../iniciar-sesion/IniciarSesion";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

const ModalIniciarSesion = () => {
  const { openModalIniciarSesion, setOpenModalIniciarSesion } =
    useContext(MainfudContext);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (openModalIniciarSesion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    if (openModalIniciarSesion) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [openModalIniciarSesion]);

  const handleClose = () => {
    setOpenModalIniciarSesion(false);

    // Remueve los search params manteniendo la misma ruta
    router.replace(pathname);
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalIniciarSesion ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalIniciarSesion ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalIniciarSesion(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-white shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalIniciarSesion ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute top-4 right-4 cursor-pointer rounded-md bg-black/10 hover:bg-black/20 transition-colors duration-200 p-2"
          onClick={handleClose}
        >
          <IoClose className="text-xl text-white" />
        </div>
        <IniciarSesion />
      </div>
    </div>,
    document.body
  );
};

export default ModalIniciarSesion;
