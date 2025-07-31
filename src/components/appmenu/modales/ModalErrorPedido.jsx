"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ModalErrorPedido = () => {
  const { openModalErrorPedido, setOpenModalErrorPedido } =
    useContext(MainfudContext);

  useEffect(() => {
    if (openModalErrorPedido) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalErrorPedido]);

  useEffect(() => {
    if (openModalErrorPedido) {
      const timer = setTimeout(() => {
        setOpenModalErrorPedido(false);
      }, 10000); // Cierra el modal después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [openModalErrorPedido, setOpenModalErrorPedido]);

  return (
    <AnimatePresence>
      {openModalErrorPedido && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalErrorPedido(false)}
          >
            <div className="flex flex-col items-center justify-center text-red-700 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-600 rounded-xl shadow-lg p-6 gap-4 w-72 h-auto relative transform transition-all duration-300">
              {/* Icono de error */}
              <IoIosCloseCircle className="text-7xl text-red-500 animate-pulse" />

              {/* Título */}
              <h2 className="text-2xl font-bold text-center">
                Ha ocurrido un error
              </h2>

              {/* Mensaje principal */}
              <p className="text-lg font-medium text-gray-800 text-center">
                Lo sentimos, no pudimos procesar tu pedido.
              </p>

              {/* Mensaje adicional */}
              <p className="text-sm text-center text-gray-600 mt-2">
                Por favor, vuelve a intentarlo o acércate a la barra.
              </p>

              {/* Botón de cierre */}
              <button
                onClick={() => setOpenModalErrorPedido(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer select-none active:scale-95"
                aria-label="Cerrar"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalErrorPedido;
