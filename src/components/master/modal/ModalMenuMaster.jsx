"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import { rutas_master, rutas_master_end } from "@/data/rutas_master";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const ModalMenuMaster = () => {
  const {
    rutaSelect,
    setRutaSelect,
    openModalMenuMaster,
    setOpenModalMenuMaster,
  } = useContext(MasterContext);
  const { usuario } = useContext(MainfudContext);
  const router = useRouter();

  return (
    <AnimatePresence>
      {openModalMenuMaster && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 1, x: -400 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 1, x: -400 }}
            onClick={() => setOpenModalMenuMaster(false)}
          >
            <div
              className="w-full h-full bg-[#252235] rounded-lg shadow-lg px-8 py-2 text-white flex-shrink-0 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center gap-3 justify-start p-4 select-none">
                  <Image
                    src={usuario?.imageUrl || "/perfil/avatar.png"}
                    alt={usuario?.name || "Usuario"}
                    width={100}
                    height={100}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold">
                    {tomarDosPrimerosNombres(usuario?.name || "Usuario")}
                  </span>
                </div>
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-white/80 transition-colors cursor-pointer select-none active:scale-95 duration-150"
                  onClick={() => setOpenModalMenuMaster(false)}
                >
                  <IoClose className="text-zinc-800" />
                </button>

                {/* Items */}
                <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
                  {rutas_master.map((ruta, index) => (
                    <div
                      onClick={() => {
                        setRutaSelect(ruta.ruta);
                        setOpenModalMenuMaster(false);
                      }}
                      key={index}
                      className={`flex items-center gap-3 justify-between p-3 rounded-full cursor-pointer select-none active:scale-95 duration-150 ${
                        ruta.ruta === rutaSelect
                          ? "bg-white/10 border-[1px] border-white/10"
                          : "border-[1px] border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 mx-2">
                        {ruta.icono}
                        <span>{ruta.nombre}</span>
                      </div>
                      <MdKeyboardArrowRight className="text-2xl" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 gap-2 flex flex-col py-4">
                {rutas_master_end.map((ruta, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(`${ruta.ruta}`)}
                    className={`flex items-center gap-3 justify-between p-3 rounded-lg cursor-pointer select-none active:scale-95 duration-150 bg-white/10 border-[1px] border-white/10 hover:bg-white/20`}
                  >
                    <div className="flex items-center gap-2 mx-2">
                      <span>{ruta.nombre}</span>
                    </div>
                    <MdKeyboardArrowRight className="text-2xl" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalMenuMaster;
