"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { actualizar_orden } from "@/lib/socket/orden_socket";
import { calcularAdicionales } from "@/utils/calcularAdicionales";
import { formatoDinero } from "@/utils/formatoDinero";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const ModalSolicitarCuenta = () => {
  const { openModalSolicitarCuenta, setOpenModalSolicitarCuenta, ordenes } =
    useContext(MainfudContext);
  const [ordenesConCuenta, setOrdenesConCuenta] = useState([]);
  const [servicioVoluntario, setServicioVoluntario] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [valorEnvio, setValorEnvio] = useState(0);

  useEffect(() => {
    const ordenesFiltradas = ordenes.filter(
      (orden) =>
        orden.cuenta_solicitada === true &&
        orden.estado === "pendiente" &&
        orden.para_llevar === false
    );

    if (ordenesFiltradas.length > 0) {
      setOrdenesConCuenta(ordenesFiltradas);
      setOpenModalSolicitarCuenta(true);
    } else {
      setOrdenesConCuenta([]);
      setOpenModalSolicitarCuenta(false);
    }
  }, [ordenes, setOpenModalSolicitarCuenta]);

  useEffect(() => {
    if (!ordenesConCuenta) return;

    for (const orden of ordenesConCuenta) {
      const {
        valorEnvio: ve,
        servicioVoluntario: sv,
        precioTotal: pt,
      } = calcularAdicionales(orden.createdAt, orden.para_llevar, orden.total);
      setValorEnvio(ve);
      setServicioVoluntario(sv);
      setPrecioTotal(pt);
    }
  }, [ordenesConCuenta]);

  const solicitarCuenta = async () => {
    if (!ordenesConCuenta) {
      console.error("No se encontró una orden pendiente.");
      return;
    }

    try {
      for (const orden of ordenesConCuenta) {
        const payload = {
          ...orden,
          cuenta_solicitada: false,
        };

        actualizar_orden(orden._id, payload);
      }
      setOpenModalSolicitarCuenta(false);
    } catch (error) {
      toast.error("Error al cobrar la cuenta", {
        position: "bottom-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
      console.error("Error de red al cobrar la cuenta:", error);
    }
  };

  return (
    <AnimatePresence>
      {openModalSolicitarCuenta && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="relative z-10 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalSolicitarCuenta(false)}
          >
            <div className="flex flex-col items-center justify-center text-amber-400 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#1B42A8] rounded-xl shadow-lg p-6 gap-4 w-72 h-auto relative transform transition-all duration-300">
              {/* Icono de confirmación */}
              <HiOutlineDocumentCurrencyDollar className="text-7xl text-[#1B42A8] animate-pulse" />

              {/* Título */}
              {ordenesConCuenta.map((orden, index) => (
                <div
                  key={index}
                  className="text-2xl text-center flex flex-col items-center text-zinc-800"
                >
                  <span className="font-semibold">Mesa {orden.mesa}</span>
                  <span className="text-lg">Ha solicitado la cuenta</span>
                  <span className="text-sm">Pedido N°: {orden.pedido}</span>
                  <span className="font-semibold">
                    Total: {formatoDinero(precioTotal)}
                  </span>
                </div>
              ))}

              <p className="text-sm text-center text-gray-600 mt-2">
                Por favor, proceda a cobrar la cuenta. Si necesita más
                información, consulte con el personal.
              </p>

              {/* Botón de cierre */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none cursor-pointer select-none active:scale-95"
                aria-label="Cerrar"
                onClick={solicitarCuenta}
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

export default ModalSolicitarCuenta;
