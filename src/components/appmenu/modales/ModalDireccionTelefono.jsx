"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { validarNumeroTelefono } from "@/validations/validarNumeroTelefono";
import useConfetti from "@/hooks/useConfetti";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoClose } from "react-icons/io5";
import { actualizar_usuario } from "@/lib/socket/usuario_socket";

const ModalDireccionTelefono = () => {
  const {
    openMondalDireccionTelefono,
    setOpenModalDireccionTelefono,
    setOpenModalIniciarSesion,
    usuario,
  } = useContext(MainfudContext);
  const { actualizarCampoOrden, actualizarCampoUsuario } = useLocalStorage();
  const { handleConfetti } = useConfetti();
  const [datosEnviados, setDatosEnviados] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (openMondalDireccionTelefono) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openMondalDireccionTelefono]);

  useEffect(() => {
    if (datosEnviados) {
      setTimeout(() => {
        setOpenModalDireccionTelefono(false);
      }, 5000); // Cierra el modal después de 15 segundos
    }
  }, [datosEnviados, setOpenModalDireccionTelefono]);

  const actualizarDatos = async () => {
    if (direccion.trim() === "") {
      toast.error("Por favor, ingresa una dirección para enviarte el pedido", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }
    if (telefono.trim() === "") {
      toast.error("Por favor, ingresa un número de teléfono para contactarte", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }

    if (validarNumeroTelefono(telefono) === false) {
      toast.error("Por favor, ingresa un número de teléfono válido", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }

    if (usuario) {
      actualizar_usuario(usuario._id, {
        direccion: direccion,
        telefono: telefono,
      });
      actualizarCampoOrden("direccion", direccion);
      actualizarCampoUsuario("direccion", direccion);
      actualizarCampoOrden("telefono", telefono);
      actualizarCampoUsuario("telefono", telefono);
      setDatosEnviados(true);
      handleConfetti();
      toast.success("Datos guardados correctamente.", {
        position: "bottom-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
      setOpenModalDireccionTelefono(false);
    }

    if (!usuario) {
      actualizarCampoOrden("direccion", direccion);
      actualizarCampoUsuario("direccion", direccion);
      actualizarCampoOrden("telefono", telefono);
      actualizarCampoUsuario("telefono", telefono);
      setOpenModalDireccionTelefono(false);
      setDatosEnviados(true);
      setOpenModalIniciarSesion(true);
      setTimeout(() => {
        toast.error("Debes iniciar sesión para continuar con tu pedido", {
          duration: 2000,
          position: "bottom-center",
          style: {
            background: "#DBEAFE",
            color: "#1B42A8",
            borderColor: "#1B42A8",
          },
        });
      }, 700);
    }

    return;
  };

  return (
    <AnimatePresence>
      {openMondalDireccionTelefono && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="relative z-10 flex flex-col items-start"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!datosEnviados && (
              <div className="flex flex-col items-center justify-end gap-4 w-80 h-[350px] bg-white rounded-md p-4 shadow-lg text-zinc-800">
                <div
                  className="absolute top-4 right-4 cursor-pointer rounded-md bg-black/10 hover:bg-black/20 transition-colors duration-200 p-2"
                  onClick={() => setOpenModalDireccionTelefono(false)}
                >
                  <IoClose className="text-xl text-white" />
                </div>
                <p className="text-xl font-semibold">
                  Completa los datos de envio
                </p>
                <div className="flex items-start flex-col justify-center">
                  <span className="text-sm font-semibold mt-2">
                    Direccion de envio
                  </span>
                  <input
                    type="text"
                    placeholder="Ejemplo: Calle Falsa 123"
                    value={direccion}
                    required
                    className="px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-0 w-60 border-[1px] border-gray-300"
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                  <span className="text-sm font-semibold mt-2">Telefono</span>
                  <input
                    type="text"
                    placeholder="Ejemplo: 300 288 8529"
                    value={telefono}
                    required
                    className="px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-0 w-60 border-[1px] border-gray-300"
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    actualizarDatos();
                  }}
                  className="bg-amber-400 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-300 mt-5 select-none mb-5"
                >
                  Guardar
                </button>
              </div>
            )}
            {/* {datosEnviados && <ConfirmacionPedido />} */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalDireccionTelefono;
