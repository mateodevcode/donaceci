"use client";

import { MainfudContext } from "@/context/MainfudContext";
import React, { useContext } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ConfirmacionPedido = () => {
  const { setOpenModalDireccionTelefono, setOpenModalQRMesaNombre } =
    useContext(MainfudContext);

  return (
    <div className="flex flex-col items-center justify-center text-[#1D723D] bg-gradient-to-br from-green-50 to-green-100 border-2 border-[#1D723D] rounded-xl shadow-lg p-6 gap-4 w-72 h-auto relative transform transition-all duration-300">
      {/* Icono de confirmación */}
      <IoIosCheckmarkCircle className="text-7xl text-green-600 animate-pulse" />

      {/* Título */}
      <h2 className="text-2xl font-bold text-center">¡Felicidades!</h2>

      {/* Nombre del cliente */}
      <p className="text-lg font-medium text-gray-800 text-center">
        Puedes realizar tu pedido.
      </p>

      {/* Mensaje de confirmación adicional */}
      <p className="text-sm text-center text-gray-600 mt-2">
        Disfruta de nuestro menu.
      </p>

      {/* Botón de cierre */}
      <button
        onClick={() => {
          setOpenModalDireccionTelefono(false);
          setOpenModalQRMesaNombre(false);
        }}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer select-none active:scale-95"
        aria-label="Cerrar"
      >
        <IoClose className="text-2xl" />
      </button>
    </div>
  );
};

export default ConfirmacionPedido;
