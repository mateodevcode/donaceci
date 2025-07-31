"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiArrowRightSLine, RiFileList3Line } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { createPortal } from "react-dom";

const ModalSoporte = () => {
  const { usuario, openModalSoporte, setOpenModalSoporte } =
    useContext(MainfudContext);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [numeroWhatsapp, setNumeroWhatsapp] = useState("");

  useEffect(() => {
    if (openModalSoporte) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalSoporte]);

  const numeroSoporte = "34675464502";
  const numeroAtencion = "573225248703";

  const handleEnviarMensaje = (numero, mensaje) => {
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    setMensaje(""); // Clear the input field after sending
    setOpenModalSoporte(false); // Close the modal after sending
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalSoporte ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalSoporte ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalSoporte(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalSoporte ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setOpenModalSoporte(false)}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
          >
            <MdOutlineKeyboardArrowLeft className="text-xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800">Soporte</h3>
          <div></div>
        </div>

        {/* Busqueda */}
        <div className="relative z-10 flex flex-col items-center mt-10">
          <h3 className="text-zinc-800">¿Cómo podemos ayudarte?</h3>
          <div className="w-10/12 mt-4 flex items-center justify-center">
            <div className="w-10/12 max-w-md bg-white rounded-lg shadow-lg px-4 py-3 flex items-center border-[1px] border-zinc-100">
              <button className="cursor-pointer select-none">
                <BiSearch className="text-lg text-zinc-800" />
              </button>
              <input
                type="text"
                placeholder="Necesito ayuda con un pedido..."
                onChange={(e) => {
                  setBusqueda(e.target.value);
                }}
                value={busqueda}
                className="w-60 border-none outline-none text-zinc-800 ml-2 text-sm"
              />
            </div>
            <button
              className="p-3 bg-amber-400 rounded-md flex items-center justify-center shadow-lg cursor-pointer select-none ml-2 hover:bg-amber-400/50 transition-colors duration-700 active:scale-95"
              onClick={() => {
                setBusqueda("");
              }}
            >
              <MdSend className="text-lg text-white" />
            </button>
          </div>
        </div>

        {/* Opciones */}
        <div className="flex flex-col items-center justify-center mt-10 text-zinc-800 gap-2">
          <div
            className="flex items-center justify-between w-10/12 bg-white p-4 text-zinc-800 rounded-md shadow-lg cursor-pointer select-none active:scale-95 hover:bg-zinc-50 duration-75 text-sm"
            onClick={() => handleEnviarMensaje(numeroAtencion, "Hola")}
          >
            <div className="flex items-center gap-2">
              <IoChatbubbleEllipsesOutline className="text-xl" />
              <span>Chat whatsApp</span>
            </div>
            <RiArrowRightSLine className="text-xl" />
          </div>
          <div
            className="flex items-center justify-between w-10/12 bg-white p-4 text-zinc-800 rounded-md shadow-lg cursor-pointer select-none active:scale-95 hover:bg-zinc-50 duration-75 text-sm"
            onClick={() => {
              handleEnviarMensaje(
                numeroAtencion,
                "Hola, necesito ayuda con mi pedido."
              );
            }}
          >
            <div className="flex items-center gap-2">
              <RiFileList3Line className="text-xl" />
              <span>Ayuda con mi pedido</span>
            </div>
            <RiArrowRightSLine className="text-xl" />
          </div>
          <div
            className="flex items-center justify-between w-10/12 bg-white p-4 text-zinc-800 rounded-md shadow-lg cursor-pointer select-none active:scale-95 hover:bg-zinc-50 duration-75 text-sm"
            onClick={() =>
              handleEnviarMensaje(numeroSoporte, "Olvidé mi contraseña")
            }
          >
            <div className="flex items-center gap-2">
              <TbLockPassword className="text-xl" />
              <span>Olvide mi contraseña</span>
            </div>
            <RiArrowRightSLine className="text-xl" />
          </div>
          <div
            className="flex items-center justify-between w-10/12 bg-white p-4 text-zinc-800 rounded-md shadow-lg cursor-pointer select-none active:scale-95 hover:bg-zinc-50 duration-75 text-sm"
            onClick={() =>
              handleEnviarMensaje(
                numeroSoporte,
                "Necesito ayuda con otra cosa."
              )
            }
          >
            <div className="flex items-center gap-2">
              <LuSettings className="text-xl" />
              <span>Ayuda con otra cosa</span>
            </div>
            <RiArrowRightSLine className="text-xl" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalSoporte;
