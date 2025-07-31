"use client";

import { MainfudContext } from "@/context/MainfudContext";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { signOut } from "next-auth/react";

const ConfirmarEliminarCuenta = ({ id }) => {
  const { setOpenModalPerfilMenu, setUsuario, usuario } =
    useContext(MainfudContext);
  const [openModalEliminarCuenta, setOpenModalEliminarCuenta] = useState(false);

  const eliminarCuenta = async () => {
    if (!id) {
      toast.error("No se pudo eliminar la cuenta", {
        position: "top-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
      return;
    }
    const respuesta = await fetch(`/api/usuarios/${id}`, {
      method: "DELETE",
    });
    if (respuesta.ok) {
      setUsuario(null);
      setOpenModalPerfilMenu(false);
      setOpenModalEliminarCuenta(false);
      signOut({
        callbackUrl: "/menu",
      });
    } else {
      console.error("Error al eliminar la cuenta");
      toast.error("Error al eliminar la cuenta", {
        position: "top-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
    }
  };

  return (
    <>
      <button
        className="w-full bg-amber-400 text-white py-2 rounded-full font-semibold hover:bg-amber-300 transition-colors shadow-lg cursor-pointer select-none active:scale-95 duration-75"
        onClick={() => setOpenModalEliminarCuenta(true)}
      >
        Eliminar cuenta
      </button>

      <AnimatePresence>
        {openModalEliminarCuenta && (
          <div
            className="fixed inset-0 flex items-center bg-black/30 justify-center z-20 h-screen w-screen"
            onClick={() => {
              setOpenModalEliminarCuenta(false);
            }}
          >
            <motion.div
              initial={{ scale: 1, x: -400 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ scale: 1, x: -400 }}
              className="absolute w-full h-svh left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-80 bg-white rounded-lg shadow-lg p-2 flex flex-col items-center justify-center">
                <span className="p-4 text-zinc-800 text-sm">
                  <strong>{tomarDosPrimerosNombres(usuario?.name)}</strong>,
                  estas seguro de que deseas eliminar tu cuenta? Esta acción no
                  se puede deshacer.
                </span>
                <div className="flex flex-row items-center justify-center h-full p-4 gap-2 w-full">
                  <button
                    className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-400 transition-colors shadow-lg text-sm cursor-pointer select-none active:scale-95 duration-75 font-semibold"
                    onClick={() => eliminarCuenta()}
                  >
                    Confirmar
                  </button>
                  <button
                    className="w-full bg-black text-white py-2 rounded-full hover:bg-black/80 transition-colors shadow-lg text-sm cursor-pointer select-none active:scale-95 duration-75 font-semibold"
                    onClick={() => setOpenModalEliminarCuenta(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConfirmarEliminarCuenta;
