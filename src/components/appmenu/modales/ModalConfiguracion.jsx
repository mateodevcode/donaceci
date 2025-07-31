"use client";

import { MainfudContext } from "@/context/MainfudContext";
import React, { useContext, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SwitchSonido from "../switchSonido/SwitchSonido";
import SwitchParaLlevar from "../para-llevar/SwitchParaLlevar";
import { createPortal } from "react-dom";

const ModalConfiguracion = () => {
  const { openModalConfiguracion, setOpenModalConfiguracion, isConnected } =
    useContext(MainfudContext);

  useEffect(() => {
    if (openModalConfiguracion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalConfiguracion]);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalConfiguracion ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalConfiguracion ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalConfiguracion(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalConfiguracion ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setOpenModalConfiguracion(false)}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800">Configuración</h3>
          <div></div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-10/12 md:w-[450px] px-8 py-4 flex items-center justify-between text-zinc-800 mt-10 font-semibold">
            {isConnected ? <span>Conectado</span> : <span>Desconectado</span>}
            <div
              className={`w-4 h-4 rounded-full ${
                isConnected
                  ? "bg-green-600 border-[2px] border-green-200"
                  : "bg-red-600 border-[2px] border-red-200"
              }`}
            ></div>
          </div>
          <SwitchSonido />
          <SwitchParaLlevar />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalConfiguracion;
