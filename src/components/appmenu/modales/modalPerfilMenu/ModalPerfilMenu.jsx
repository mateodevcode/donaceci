"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import InformacionUsuario from "./InformacionUsuario";
import { createPortal } from "react-dom";

const ModalPerfilMenu = () => {
  const { openModalPerfilMenu, setOpenModalPerfilMenu } =
    useContext(MainfudContext);

  useEffect(() => {
    if (openModalPerfilMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalPerfilMenu]);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalPerfilMenu ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalPerfilMenu ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalPerfilMenu(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalPerfilMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setOpenModalPerfilMenu(false)}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl text-zinc-800">Perfil</h3>
          <div></div>
        </div>

        {/* Contenido */}

        <div className="flex flex-col items-center justify-start h-full">
          <InformacionUsuario />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalPerfilMenu;
