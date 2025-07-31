"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CarritoVacio from "./CarritoVacio";
import HeaderCarritoCompra from "./HeaderCarritoCompra";
import DetalleCarritoCompra from "./DetalleCarritoCompra";

const ModalCarritoCompras = () => {
  const {
    itemsSeleccionados,
    openModalCarritoCompras,
    setOpenModalCarritoCompras,
  } = useContext(MainfudContext);

  useEffect(() => {
    if (openModalCarritoCompras) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalCarritoCompras]);

  return (
    <AnimatePresence>
      {openModalCarritoCompras && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 h-svh"
          onClick={() => setOpenModalCarritoCompras(!openModalCarritoCompras)}
        >
          <motion.div
            className="fixed z-10 w-full flex flex-col items-center bg-zinc-50 shadow-lg rounded-md overflow-y-auto max-h-[70vh] bottom-0"
            initial={{ scale: 1, y: 400 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ scale: 1, y: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            {itemsSeleccionados.length > 0 ? (
              <div className="w-full">
                {/* Header */}
                <HeaderCarritoCompra />
                {/* Detalle del carrito de compra */}
                <DetalleCarritoCompra />
              </div>
            ) : (
              <CarritoVacio />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalCarritoCompras;
