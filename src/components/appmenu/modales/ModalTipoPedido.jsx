"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { toast } from "sonner";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoClose } from "react-icons/io5";

const ModalTipoPedido = () => {
  const {
    openMondalTipoPedido,
    setOpenModalTipoPedido,
    tipoPedido,
    setTipoPedido,
    setOpenModalDireccionTelefono,
    setOpenModalQRMesaNombre,
    formDatos,
    usuario,
  } = useContext(MainfudContext);
  const { actualizarCampoOrden } = useLocalStorage();

  useEffect(() => {
    if (openMondalTipoPedido) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openMondalTipoPedido]);

  const handleclickTipoPedido = (tipo) => {
    if (tipoPedido === "") {
      toast.error("Por favor, selecciona un tipo de pedido.", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return; // No hacer nada si no se ha seleccionado un tipo de pedido
    }

    if (usuario) {
      if (tipoPedido === "para_comer_aqui") {
        actualizarCampoOrden("para_llevar", false);
        setOpenModalTipoPedido(false);
        setOpenModalQRMesaNombre(true);
      }

      if (tipoPedido === "para_llevar") {
        actualizarCampoOrden("para_llevar", true);
        setOpenModalTipoPedido(false);
        if (usuario.direccion === "" || usuario.telefono === "") {
          setOpenModalDireccionTelefono(true);
        }
      }
    }

    if (!usuario) {
      if (tipoPedido === "para_comer_aqui") {
        actualizarCampoOrden("para_llevar", false);
        setOpenModalTipoPedido(false);
        if (formDatos.name === "" || formDatos.mesa === null) {
          setOpenModalQRMesaNombre(true);
        }
      }

      if (tipoPedido === "para_llevar") {
        actualizarCampoOrden("para_llevar", true);
        setOpenModalTipoPedido(false);
        if (formDatos.direccion === "" || formDatos.telefono === "") {
          setOpenModalDireccionTelefono(true);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {openMondalTipoPedido && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="relative z-10 w-11/12 md:w-[600px] flex flex-col items-start p-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -top-6 right-4 cursor-pointer rounded-md bg-black/10 hover:bg-black/20 transition-colors duration-200 p-2"
              onClick={() => setOpenModalTipoPedido(false)}
            >
              <IoClose className="text-xl text-white" />
            </div>
            <div className="flex items-center justify-center w-full md:h-96 mb-4 gap-4">
              <div
                className="w-1/2 md:h-96 p-4 flex flex-col items-center justify-center bg-red-600 rounded-md border-[1px] border-black text-zinc-100 -rotate-12 hover:scale-105 transition-transform duration-300 cursor-pointer active:scale-95 select-none"
                onClick={() => setTipoPedido("para_llevar")}
              >
                <Image
                  src="/realizar-pedido/para-llevar.png"
                  alt="Empanada"
                  width={600}
                  height={600}
                  className="w-54 h-auto rounded-md"
                />
                <span className="font-extrabold text-3xl md:text-5xl text-center">
                  !Para llevar¡
                </span>
                <div
                  className={`w-4 h-4 border-[1px] rounded-full mt-5 ${
                    tipoPedido === "para_llevar"
                      ? "bg-black border-white"
                      : "bg-white border-white"
                  }`}
                ></div>
              </div>
              <div
                className="w-1/2 md:h-96 p-4 flex flex-col items-center justify-center bg-amber-50 rounded-md border-[1px] border-black rotate-12 hover:scale-105 transition-transform duration-300 cursor-pointer active:scale-95 text-zinc-800 select-none"
                onClick={() => setTipoPedido("para_comer_aqui")}
              >
                <span className="font-extrabold text-2xl md:text-4xl text-center">
                  !Para comer aquí¡
                </span>
                <Image
                  src="/realizar-pedido/para-comer-aqui.png"
                  alt="Empanada"
                  width={600}
                  height={600}
                  className="w-52 h-auto rounded-md"
                />
                <div
                  className={`w-4 h-4 border-[1px] rounded-full mt-5 ${
                    tipoPedido === "para_comer_aqui"
                      ? "bg-black border-white"
                      : "bg-white border-white"
                  }`}
                ></div>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-lg px-4 py-3 flex flex-col items-center border-[1px] border-zinc-100 mt-4">
              {tipoPedido === "" && (
                <p className="my-5 text-center font-semibold text-2xl md:text-4xl text-zinc-800">
                  Selecciona una opción
                </p>
              )}
              {tipoPedido === "para_llevar" && (
                <span className="my-5 text-center font-semibold text-3xl md:text-4xl text-zinc-800">
                  Para llevar
                </span>
              )}
              {tipoPedido === "para_comer_aqui" && (
                <span className="my-5 text-center font-semibold text-3xl md:text-4xl text-zinc-800">
                  {" "}
                  Para comer aquí
                </span>
              )}
              <button
                className={`w-full bg-amber-400 text-white px-4 py-2 rounded-md font-semibold select-none flex items-center justify-center gap-2 ${
                  tipoPedido === ""
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer hover:bg-amber-400/50 transition-colors duration-200  active:scale-95"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleclickTipoPedido();
                }}
              >
                Siguiente <HiArrowSmRight className="text-2xl" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalTipoPedido;
