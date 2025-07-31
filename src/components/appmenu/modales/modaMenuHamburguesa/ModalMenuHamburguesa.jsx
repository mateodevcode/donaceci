"use client";

import React, { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillPersonFill } from "react-icons/bs";
import { MainfudContext } from "@/context/MainfudContext";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { enalces } from "@/data/enlaces_menu";
import { createPortal } from "react-dom";

const ModalMenuHamburguesa = () => {
  const router = useRouter();
  const {
    openModalMenuHamburguesa,
    setOpenModalMenuHamburguesa,
    setOpenModalIniciarSesion,
    setOpenModalPerfilMenu,
    setOpenModalSoporte,
    setOpenModalPedido,
    setOpenModalConfiguracion,
    setOpenModalHistorialPedidos,
    setOpenModalMetodosPago,
  } = useContext(MainfudContext);
  const { status } = useSession();

  useEffect(() => {
    if (openModalMenuHamburguesa) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalMenuHamburguesa]);

  const handleMenuClick = (e, item) => {
    e.stopPropagation();

    if (item.text === "Menú") {
      setOpenModalMenuHamburguesa(false);
      router.push("/menu#menu");
    }
    if (item.text === "Perfil") {
      setOpenModalMenuHamburguesa(false);
      setOpenModalPerfilMenu(true);
    }
    if (item.text === "Soporte") {
      setOpenModalMenuHamburguesa(false);
      setOpenModalSoporte(true);
    }
    if (item.text === "Pedido") {
      setOpenModalMenuHamburguesa(false);
      setOpenModalPedido(true);
    }
    if (item.text === "Pagos") {
      setOpenModalMenuHamburguesa(false);
      setOpenModalMetodosPago(true);
    }
    if (item.text === "Historial de Pedidos") {
      setOpenModalMenuHamburguesa(false);
      setOpenModalHistorialPedidos(true);
    }
    if (item.text === "Configuración") {
      setOpenModalMenuHamburguesa(false);
      setOpenModalConfiguracion(true);
    }
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalMenuHamburguesa ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalMenuHamburguesa ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalMenuHamburguesa(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-[70vw] max-w-[500px] rounded-r-2xl p-4 ${
          openModalMenuHamburguesa ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div
          className="flex items-center gap-2 justify-start w-full cursor-pointer select-none text-zinc-800 dark:text-zinc-200  hover:text-amber-400 active:scale-95 duration-75"
          onClick={() => setOpenModalMenuHamburguesa(false)}
        >
          <IoClose className="text-xl" />{" "}
          <span className="text-base font-semibold">Cerrar</span>
        </div>

        {/* Contenido */}
        <div className="flex flex-col items-start justify-center h-[calc(100%-56px)] overflow-y-auto px-8">
          {enalces.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 cursor-pointer transition-colors active:scale-95 duration-75 select-none text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-300 py-1.5 rounded-md mb-2 hover:text-zinc-500 my-2"
              onClick={(e) => handleMenuClick(e, item)}
            >
              {item.icon} <span className="text-base">{item.text}</span>
            </div>
          ))}
        </div>
        <>
          {status === "authenticated" && (
            <div
              className="flex items-center gap-2 justify-start w-full cursor-pointer select-none text-zinc-800  dark:text-zinc-200 hover:text-amber-400 active:scale-95 duration-75"
              onClick={() => {
                signOut({
                  callbackUrl: "/menu",
                });
              }}
            >
              <FiLogOut className="text-xl" />{" "}
              <span className="font-semibold text-base">Cerrar sesión</span>
            </div>
          )}
          {status === "unauthenticated" && (
            <div
              className="flex items-center gap-2 justify-start w-full cursor-pointer select-none text-zinc-800 dark:text-zinc-200 hover:text-amber-400 active:scale-95 duration-75"
              onClick={() => {
                setOpenModalMenuHamburguesa(false);
                setOpenModalIniciarSesion(true);
              }}
            >
              <BsFillPersonFill className="text-xl" />{" "}
              <span className="font-semibold text-base">Iniciar sesión</span>
            </div>
          )}
        </>
      </div>
    </div>,
    document.body
  );
};

export default ModalMenuHamburguesa;
