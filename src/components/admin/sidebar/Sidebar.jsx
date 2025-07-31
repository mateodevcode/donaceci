"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { IoFastFoodSharp, IoSettingsOutline } from "react-icons/io5";
import {
  MdHelpOutline,
  MdOutlineAccountBalance,
  MdOutlineArrowBackIos,
  MdOutlineInventory2,
  MdRestaurantMenu,
} from "react-icons/md";
import {
  RiDashboardHorizontalLine,
  RiFileList2Line,
  RiTeamLine,
} from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { PiChartBarDuotone } from "react-icons/pi";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { AdminContext } from "@/context/AdminContext";
import { TbHome } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { HiOutlineQrcode } from "react-icons/hi";

const Sidebar = ({ setRutaSeleccionada, rutaSeleccionada }) => {
  const router = useRouter();
  const { usuario } = useContext(MainfudContext);
  const {
    openModalSidebar,
    setOpenModalSidebar,
    openModalPerfilAdmin,
    setOpenModalPerfilAdmin,
  } = useContext(AdminContext);

  const rutas = [
    {
      nombre: "Dashboard",
      icono: <RiDashboardHorizontalLine />,
      ruta: "dashboard",
    },
    {
      nombre: "Ordenes",
      icono: <RiFileList2Line />,
      ruta: "ordenes",
    },
    // {
    //   nombre: "Productos",
    //   icono: <HiOutlineSquaresPlus />,
    //   ruta: "productos",
    // },
    {
      nombre: "Contabilidad",
      icono: <BiSolidPieChartAlt2 />,
      ruta: "contabilidad",
    },
    // {
    //   nombre: "Analitica",
    //   icono: <PiChartBarDuotone />,
    //   ruta: "analitica",
    // },
    {
      nombre: "Inventario",
      icono: <MdOutlineInventory2 />,
      ruta: "inventario",
    },
    {
      nombre: "Codigos QR",
      icono: <HiOutlineQrcode />,
      ruta: "generar-codigo-qr",
    },
    {
      nombre: "Equipo de trabajo",
      icono: <RiTeamLine />,
      ruta: "equipo-trabajo",
    },
    {
      nombre: "Configuracion",
      icono: <IoSettingsOutline />,
      ruta: "configuracion",
    },
    {
      nombre: "Ayuda",
      icono: <MdHelpOutline />,
      ruta: "ayuda",
    },
  ];

  const rutasEnd = [
    {
      nombre: "Pagina de inicio",
      icono: <TbHome />,
      ruta: "/",
    },
    {
      nombre: "Menú",
      icono: <MdRestaurantMenu />,
      ruta: "/menu",
    },
    {
      nombre: "Master de ordenes",
      icono: <IoFastFoodSharp />,
      ruta: "/master",
    },
  ];

  return (
    <AnimatePresence>
      {openModalSidebar && (
        <>
          {/* Web */}
          <motion.div
            layout
            className="bg-gray-100 flex-col justify-between h-svh p-4 w-full md:w-64 hidden md:flex"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between gap- py-1.5 w-full">
                <div className="flex items-center gap-2">
                  <MdOutlineAccountBalance className="text-xl" />
                  <span className="font-semibold">Doña Ceci.</span>
                </div>
                <div
                  className="text-xs text-zinc-500 bg-black/10 cursor-pointer rounded-lg p-1 hover:bg-gray-200 w-8 h-8 flex items-center justify-center"
                  onClick={() => setOpenModalSidebar(!openModalSidebar)}
                >
                  <MdOutlineArrowBackIos className="text-base" />
                </div>
              </div>
              <div className="">
                {rutas.map((ruta) => (
                  <div
                    key={ruta.ruta}
                    className={`relative flex items-center gap-2 cursor-pointer select-none px-3 py-1.5 rounded-md mt-2 overflow-hidden
                        ${
                          ruta.ruta === rutaSeleccionada
                            ? "bg-blue-800/50 text-white"
                            : "text-zinc-800 hover:bg-black/10"
                        }`}
                    onClick={() => setRutaSeleccionada(ruta.ruta)}
                  >
                    {/* Contenedor del icono con brillo */}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      {/* Brillo solo si está seleccionado */}
                      {ruta.ruta === rutaSeleccionada && (
                        <span
                          className="absolute w-10 h-10 rounded-full blur-md opacity-60 z-0"
                          style={{
                            background:
                              "radial-gradient(circle, #155DFC 0%, transparent 70%)",
                          }}
                        ></span>
                      )}
                      <span className="relative z-10">{ruta.icono}</span>
                    </div>
                    {/* Texto */}
                    <span className="relative z-10">{ruta.nombre}</span>
                    {ruta.ruta === rutaSeleccionada && (
                      <span className="absolute w-1 h-6 z-0 right-0 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {rutasEnd.map((ruta) => (
                <div
                  key={ruta.ruta}
                  className={`relative flex items-center gap-2 cursor-pointer select-none px-3 py-1.5 rounded-md mt-2 overflow-hidden
                        text-zinc-800 hover:bg-black/10`}
                  onClick={() => router.push(ruta.ruta)}
                >
                  {/* Contenedor del icono con brillo */}
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {/* Brillo solo si está seleccionado */}
                    {ruta.ruta === rutaSeleccionada && (
                      <span
                        className="absolute w-10 h-10 rounded-full blur-md opacity-60 z-0"
                        style={{
                          background:
                            "radial-gradient(circle, #fff 0%, transparent 70%)",
                        }}
                      ></span>
                    )}
                    <span className="relative z-10">{ruta.icono}</span>
                  </div>

                  {/* Texto */}
                  <span className="relative z-10">{ruta.nombre}</span>
                </div>
              ))}

              <div
                className="flex items-center justify-between gap-2 bg-black/10 rounded-md p-2 cursor-pointer select-none active:scale-95 transition-all duration-200"
                onClick={() => setOpenModalPerfilAdmin(!openModalPerfilAdmin)}
              >
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
                  <div className="flex flex-col text-xs text-zinc-800">
                    <span className="font-semibold">
                      {tomarDosPrimerosNombres(usuario?.name)}
                    </span>
                    <span>{usuario?.email}</span>
                  </div>
                </div>
                <VscSettings className="mx-1 hover:text-zinc-500" />
              </div>
            </div>
          </motion.div>

          {/* Movil */}
          <motion.div
            layout
            className="bg-gray-100 flex md:hidden flex-col justify-between h-svh p-4 w-full md:w-64"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between gap- py-1.5 w-full">
                <div className="flex items-center gap-2">
                  <MdOutlineAccountBalance className="text-xl" />
                  <span className="font-semibold">Doña Ceci.</span>
                </div>
                <div
                  className="text-xs text-zinc-500 bg-black/10 cursor-pointer rounded-lg p-1 hover:bg-gray-200 w-8 h-8 flex items-center justify-center"
                  onClick={() => setOpenModalSidebar(!openModalSidebar)}
                >
                  <MdOutlineArrowBackIos className="text-base" />
                </div>
              </div>
              <div className="">
                {rutas.map((ruta) => (
                  <div
                    key={ruta.ruta}
                    className={`relative flex items-center gap-2 cursor-pointer select-none
    px-3 py-1.5 rounded-md mt-4 overflow-hidden
    ${
      ruta.ruta === rutaSeleccionada
        ? "bg-blue-800/50 text-white"
        : "text-zinc-800 hover:bg-black/10"
    }`}
                    onClick={() => {
                      setRutaSeleccionada(ruta.ruta);
                      setOpenModalSidebar(false);
                    }}
                  >
                    {/* Contenedor del icono con brillo */}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      {/* Brillo solo si está seleccionado */}
                      {ruta.ruta === rutaSeleccionada && (
                        <span
                          className="absolute w-10 h-10 rounded-full blur-md opacity-60 z-0"
                          style={{
                            background:
                              "radial-gradient(circle, #155DFC 0%, transparent 70%)",
                          }}
                        ></span>
                      )}
                      <span className="relative z-10">{ruta.icono}</span>
                    </div>
                    {/* Texto */}
                    <span className="relative z-10">{ruta.nombre}</span>
                    {ruta.ruta === rutaSeleccionada && (
                      <span className="absolute w-1 h-6 z-0 right-0 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {rutasEnd.map((ruta) => (
                <div
                  key={ruta.ruta}
                  className={`relative flex items-center gap-2 cursor-pointer select-none
    px-3 py-1.5 rounded-md mt-4 overflow-hidden
    ${
      ruta.ruta === rutaSeleccionada
        ? "bg-black text-white"
        : "text-zinc-800 hover:bg-black/10"
    }`}
                  onClick={() => setRutaSeleccionada(ruta.ruta)}
                >
                  {/* Contenedor del icono con brillo */}
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {/* Brillo solo si está seleccionado */}
                    {ruta.ruta === rutaSeleccionada && (
                      <span
                        className="absolute w-10 h-10 rounded-full blur-md opacity-60 z-0"
                        style={{
                          background:
                            "radial-gradient(circle, #fff 0%, transparent 70%)",
                        }}
                      ></span>
                    )}
                    <span className="relative z-10">{ruta.icono}</span>
                  </div>

                  {/* Texto */}
                  <span className="relative z-10">{ruta.nombre}</span>
                </div>
              ))}

              <div
                className="flex items-center justify-between gap-2 bg-black/10 rounded-md p-2 cursor-pointer select-none active:scale-95 transition-all duration-200"
                onClick={() => setOpenModalPerfilAdmin(!openModalPerfilAdmin)}
              >
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
                  <div className="flex flex-col text-xs text-zinc-800">
                    <span className="font-semibold">
                      {tomarDosPrimerosNombres(usuario?.name)}
                    </span>
                    <span>{usuario?.email}</span>
                  </div>
                </div>
                <VscSettings className="mx-1 hover:text-zinc-500" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
