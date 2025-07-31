"use client";

import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar/Sidebar";
import Contenido from "./Contenido";
import { motion } from "framer-motion";
import ModalPerfilAdmin from "./sidebar/ModalPerfilAdmin";
import { useSession } from "next-auth/react";
import Loading from "./loading/Loading";
import ModalConfirmarEliminarProductoInventario from "./inventario/ModalConfirmarEliminarProductoInventario";

const Administracion = () => {
  const [rutaSeleccionada, setRutaSeleccionada] = useState("dashboard");
  const { status } = useSession();
  return (
    <div className="w-full h-svh">
      <motion.div className="w-full fixed md:flex" layout>
        <Sidebar
          setRutaSeleccionada={setRutaSeleccionada}
          rutaSeleccionada={rutaSeleccionada}
        />
        <Contenido rutaSeleccionada={rutaSeleccionada} />
      </motion.div>
      {/* <ToastContainer /> */}

      {/* Modales */}
      <ModalPerfilAdmin />
      <ModalConfirmarEliminarProductoInventario />

      {status === "loading" && <Loading />}

      <style jsx global>{`
        /* Scrollbar diferente para /menu */
        * {
          scrollbar-width: thin;
          scrollbar-color: #000 #fff;
        }

        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        *::-webkit-scrollbar-track {
          background: #483d03;
        }

        *::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #000;
        }
      `}</style>
    </div>
  );
};

export default Administracion;
