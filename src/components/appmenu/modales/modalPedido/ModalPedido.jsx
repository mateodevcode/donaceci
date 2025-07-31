"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Orden from "@/components/appmenu/modales/modalPedido/Orden";
import PedidoVacio from "./PedidoVacio";
import { createPortal } from "react-dom";

const ModalPedido = () => {
  const { openModalPedido, setOpenModalPedido, idOrdenCreadaPendiente } =
    useContext(MainfudContext);

  useEffect(() => {
    if (openModalPedido) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalPedido]);

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalPedido ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalPedido ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalPedido(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalPedido ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="z-10 flex items-center justify-between px-4 py-4 relative">
          <button
            onClick={() => setOpenModalPedido(false)}
            className="text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-300 hover:text-zinc-600 cursor-pointer select-none"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Pedido Actual
          </h3>
          <div></div>
        </div>
        <Orden />
        {!idOrdenCreadaPendiente && <PedidoVacio />}
      </div>
    </div>,
    document.body
  );
};

export default ModalPedido;
