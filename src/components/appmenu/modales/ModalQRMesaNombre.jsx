"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PaginaQR from "@/components/appmenu/QRScanner/PaginaQR";
import { toast } from "sonner";
import { capitalizarFrase } from "@/utils/capitalizarFrase";
import { validarNombre } from "@/validations/validarNombre";
import ConfirmacionPedido from "@/components/appmenu/confirmacion-pedidos/ConfirmacionPedido";
import useConfetti from "@/hooks/useConfetti";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoClose } from "react-icons/io5";

const ModalQRMesaNombre = () => {
  const {
    setOpenModalIniciarSesion,
    formDatos,
    openModalQRMesaNombre,
    setOpenModalQRMesaNombre,
    formDatosUsuario,
  } = useContext(MainfudContext);
  const { handleConfetti } = useConfetti();
  const { actualizarCampoOrden, actualizarCampoUsuario } = useLocalStorage();
  const eleccionRef = useRef(null);
  const [tipoPedido, setTipoPedido] = useState("");
  const router = useRouter();
  const { status } = useSession();
  const [esperandoAutenticacion, setEsperandoAutenticacion] = useState(false);
  const [nombre, setNombre] = useState("");
  const [datosEnviados, setDatosEnviados] = useState(false);

  useEffect(() => {
    if (tipoPedido === "para_comer_aqui" && eleccionRef.current) {
      gsap.fromTo(
        eleccionRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.5, ease: "bounce.out" }
      );
    }
  }, [tipoPedido]);

  useEffect(() => {
    if (esperandoAutenticacion && status === "authenticated") {
      router.push("/menu");
      setOpenModalIniciarSesion(false);
      setEsperandoAutenticacion(false);
    }
  }, [status, esperandoAutenticacion, router, setOpenModalIniciarSesion]);

  useEffect(() => {
    if (openModalQRMesaNombre) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalQRMesaNombre]);

  useEffect(() => {
    if (datosEnviados) {
      setTimeout(() => {
        setOpenModalQRMesaNombre(false);
      }, 5000); // Cierra el modal después de 15 segundos
    }
  }, [datosEnviados, setOpenModalQRMesaNombre]);

  const handleGuardarNombre = () => {
    if (nombre.trim() === "") {
      toast.error("Por favor, ingresa tu nombre.", {
        position: "bottom-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }

    if (validarNombre(nombre) === false) {
      toast.error(
        "El nombre debe tener entre 3 y 30 caracteres y no puede contener números ni caracteres especiales.",
        {
          position: "bottom-center",
          style: {
            background: "#DBEAFE",
            color: "#1B42A8",
            borderColor: "#1B42A8",
          },
        }
      );
      return;
    }
    actualizarCampoOrden("name", capitalizarFrase(nombre));
    actualizarCampoUsuario("name", capitalizarFrase(nombre));
    setDatosEnviados(true);
    handleConfetti();
    toast.success("Nombre guardado correctamente.", {
      position: "bottom-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    setTimeout(() => {
      handleConfetti();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {openModalQRMesaNombre && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-20"
          onClick={(e) => {
            if (
              formDatos.para_llevar !== null &&
              formDatos.mesa !== null &&
              formDatosUsuario?.name !== ""
            ) {
              setOpenModalQRMesaNombre(false);
            }
          }}
        >
          <motion.div
            className="relative z-10 w-9/12 md:w-[600px] flex flex-col items-start"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-full">
              {formDatos.para_llevar === false && formDatos.mesa === null && (
                <div className="flex flex-col items-center justify-center gap-4 w-60 h-52 bg-white rounded-md p-4 shadow-lg">
                  <h2 className="font-semibold text-base">
                    Presiona para escanear
                  </h2>
                  <PaginaQR
                    classname={
                      "flex items-center justify-center cursor-pointer select-none text-black hover:text-blue-600 active:scale-95 duration-75 text-6xl"
                    }
                  />
                  <p className="text-base">El codigo QR de la mesa</p>
                </div>
              )}
              {!datosEnviados &&
                formDatos.name === "" &&
                formDatos.mesa !== null && (
                  <div className="flex flex-col items-center justify-center gap-4 py-5 bg-white rounded-lg shadow-lg w-full h-60">
                    <div
                      className="absolute top-4 right-4 cursor-pointer rounded-md bg-black/10 hover:bg-black/20 transition-colors duration-200 p-2"
                      onClick={() => setOpenModalQRMesaNombre(false)}
                    >
                      <IoClose className="text-xl text-white" />
                    </div>
                    <p className="text-xl">Agrega tu nombre</p>
                    <input
                      type="text"
                      placeholder="Ejemplo: Juan Perez"
                      value={nombre}
                      required
                      className="px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-0 w-48 border-[1px] border-gray-300"
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGuardarNombre();
                      }}
                      className="bg-amber-400 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-300 select-none w-48"
                    >
                      Guardar
                    </button>
                  </div>
                )}
            </div>
            {datosEnviados &&
              formDatos.mesa !== null &&
              formDatos.name !== "" &&
              formDatos.para_llevar !== null && <ConfirmacionPedido />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalQRMesaNombre;
