"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ModalConfirmacionPedido = () => {
  const {
    formDatos,
    openModalConfirmacionPedido,
    setOpenModalConfirmacionPedido,
  } = useContext(MainfudContext);

  useEffect(() => {
    if (openModalConfirmacionPedido) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalConfirmacionPedido]);

  useEffect(() => {
    if (openModalConfirmacionPedido) {
      setTimeout(() => {
        setOpenModalConfirmacionPedido(false);
      }, 5000); // Cierra el modal después de 5 segundos
    }
  }, [openModalConfirmacionPedido, setOpenModalConfirmacionPedido]);

  return (
    <AnimatePresence>
      {openModalConfirmacionPedido && (
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
            onClick={() => setOpenModalConfirmacionPedido(false)}
          >
            <div className="flex flex-col items-center justify-center text-[#1D723D] bg-gradient-to-br from-green-50 to-green-100 border-2 border-[#1D723D] rounded-xl shadow-lg p-6 gap-4 w-72 h-auto relative transform transition-all duration-300">
              {/* Icono de confirmación */}
              <IoIosCheckmarkCircle className="text-7xl text-green-600 animate-pulse" />

              {/* Título */}
              <h2 className="text-2xl font-bold text-center">¡Felicidades!</h2>

              {/* Nombre del cliente */}
              <p className="text-lg font-medium text-gray-800 text-center">
                <strong>
                  {tomarDosPrimerosNombres(formDatos.name) || "Usuario"}
                </strong>
                , tu pedido ha sido realizado.
              </p>

              {/* Mensaje de confirmación adicional */}
              {formDatos.para_llevar === true && (
                <p className="text-sm text-center text-gray-600 mt-2">
                  Tu pedido será entregado en la dirección{" "}
                  <strong>{formDatos.direccion}</strong>.
                </p>
              )}
              {formDatos.para_llevar === false && (
                <p className="text-sm text-center text-gray-600 mt-2">
                  En unos momentos un mesero te lo traerá a tu mesa.
                </p>
              )}

              {/* Botón de cierre */}
              <button
                onClick={() => setOpenModalConfirmacionPedido(false)}
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

export default ModalConfirmacionPedido;
