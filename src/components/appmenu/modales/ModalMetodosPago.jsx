"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { BsCreditCard } from "react-icons/bs";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { createPortal } from "react-dom";
import { metodos_de_pago } from "@/data/metodos_de_pago";

const ModalMetodosPago = () => {
  const { openModalMetodosPago, setOpenModalMetodosPago } =
    useContext(MainfudContext);

  useEffect(() => {
    if (openModalMetodosPago) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalMetodosPago]);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalMetodosPago ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalMetodosPago ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalMetodosPago(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalMetodosPago ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setOpenModalMetodosPago(false)}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800">
            Metodos de Pago
          </h3>
          <div></div>
        </div>
        <div className="w-full p-4">
          <div className="flex flex-wrap w-full p-2 gap-4">
            {metodos_de_pago.map((metodo, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 w-20 h-20 rounded-lg items-center justify-center  ${
                  metodo.id === "tarjeta_debito" ||
                  metodo.id === "tarjeta_credito"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <div
                  className={`rounded-full bg-amber-400/50 ${
                    metodo.id === "efectivo"
                      ? "p-4"
                      : metodo.id === "nequi"
                      ? "p-3"
                      : "p-4"
                  }
                                                              ${
                                                                metodo.id ===
                                                                  "tarjeta_debito" ||
                                                                metodo.id ===
                                                                  "tarjeta_credito"
                                                                  ? "pointer-events-none opacity-50"
                                                                  : ""
                                                              } `}
                >
                  {metodo.icono}
                </div>
                <span className="text-xs font-semibold">{metodo.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalMetodosPago;
