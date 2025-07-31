"use client";

import { AdminContext } from "@/context/AdminContext";
import { MainfudContext } from "@/context/MainfudContext";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const ModalPerfilAdmin = () => {
  const { openModalPerfilAdmin, setOpenModalPerfilAdmin } =
    useContext(AdminContext);
  const { usuario } = useContext(MainfudContext);
  const [rutaSelect, setRutaSelect] = useState("configuracion");

  useEffect(() => {
    if (openModalPerfilAdmin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalPerfilAdmin]);

  const rutasEnd = [
    {
      nombre: "Configuracion de cuenta",
      icono: <IoSettingsOutline />,
      ruta: "configuracion",
    },
    {
      nombre: "Cerrar sesion",
      icono: <FiLogOut />,
      ruta: "cerrar-sesion",
    },
  ];

  return (
    <AnimatePresence>
      {openModalPerfilAdmin && (
        <div
          className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto"
          onClick={() => setOpenModalPerfilAdmin(false)}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-full h-full flex flex-col rounded-t-2xl overflow-y-auto mx-auto"
            initial={{ opacity: 0, scale: 0, x: -800, y: 400 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0, x: -800, y: 400 }}
          >
            <div
              className="w-64 rounded-lg shadow-lg absolute bottom-28 md:bottom-20 left-28 md:left-72 p-4 bg-neutral-300 text-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 rounded-md p-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8">
                    <Image
                      src={usuario?.imageUrl || "/logo/logo.png"}
                      alt={usuario?.name || "Invitado"}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold">
                      {tomarDosPrimerosNombres(usuario?.name)}
                    </span>
                    <span>{usuario?.email}</span>
                  </div>
                </div>
              </div>

              {rutasEnd.map((ruta) => (
                <div
                  key={ruta.ruta}
                  className={`relative flex items-center gap-2 text-sm cursor-pointer select-none
    p-2 overflow-hidden
    ${
      ruta.ruta === "cerrar-sesion"
        ? "border-t-[1px] border-zinc-400 hover:text-blue-600"
        : "rounded-md"
    }`}
                  onClick={() => {
                    if (ruta.ruta === "cerrar-sesion") {
                      signOut({
                        callbackUrl: "/",
                      });
                    } else {
                      setRutaSelect(ruta.ruta);
                    }
                    setOpenModalPerfilAdmin(false);
                  }}
                >
                  {/* Contenedor del icono con brillo */}
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <span className="relative z-10">{ruta.icono}</span>
                  </div>

                  {/* Texto */}
                  <span className="relative z-10">{ruta.nombre}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalPerfilAdmin;
