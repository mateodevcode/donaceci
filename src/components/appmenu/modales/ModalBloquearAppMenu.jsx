"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { LiaStopwatchSolid } from "react-icons/lia";

const ModalBloquearAppMenu = () => {
  const { openModalBloquearAppMenu, setOpenModalBloquearAppMenu } =
    useContext(MainfudContext);

  return (
    <AnimatePresence>
      {openModalBloquearAppMenu && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalBloquearAppMenu(false)}
          >
            <div className="flex flex-col items-center justify-center text-[#1B42A8] bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#1B42A8] rounded-xl shadow-lg p-6 gap-4 w-72 h-auto relative transform transition-all duration-300">
              {/* Icono de confirmación */}
              <LiaStopwatchSolid className="text-7xl text-[#1B42A8] animate-pulse" />

              {/* Título */}
              <div className="text-2xl font-bold text-center flex flex-col items-center">
                <span>¡ups!</span>
                <span>Estamos cerrados</span>
              </div>

              {/* Nombre del cliente */}
              <div className="flex flex-col items-center text-sm text-gray-700">
                <span className="text-sm">Abrimos de lunes a Domingos</span>
                <span className="font-semibold">11:30 AM a 3:00 PM</span>
                <span className="font-semibold">y de 5:00 PM a 11:00 PM</span>
              </div>

              {/* Mensaje de confirmación adicional */}

              <p className="text-sm text-center text-gray-600 mt-2">
                Te esperamos en nuestro horario habitual. ¡Gracias por tu
                comprensión!
              </p>

              {/* Botón de cierre */}
              <button
                onClick={() => setOpenModalBloquearAppMenu(false)}
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

export default ModalBloquearAppMenu;
