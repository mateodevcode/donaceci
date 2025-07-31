"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { useContext } from "react";
import Dashboard from "./dashboard/Dashboard";
import HeaderPanel from "./header/HeaderDashboard";
import Ordenes from "./ordenes/Ordenes";
import { AnimatePresence, motion } from "framer-motion";
import Ayuda from "./ayuda/Ayuda";
import Contabildad from "./contabilidad/Contabildad";
import Inventario from "./inventario/Inventario";
import GenerarCodigosQR from "./codigos-qr/GenerarCodigosQR";

const Contenido = ({ rutaSeleccionada }) => {
  const { ordenes } = useContext(MainfudContext);

  return (
    <AnimatePresence>
      <motion.div
        layout
        className="flex-1 flex-col justify-between h-svh p-2 w-screen"
        transition={{ duration: 0.4 }}
      >
        <div className="border-[1px] border-gray-300 rounded-lg shadow-md bg-white overflow-y-auto h-[98svh]">
          {/* Header ruta */}
          <HeaderPanel rutaSeleccionada={rutaSeleccionada} />
          {/* cuadros resumen */}
          {rutaSeleccionada === "dashboard" && <Dashboard ordenes={ordenes} />}
          {rutaSeleccionada === "ordenes" && <Ordenes />}
          {rutaSeleccionada === "ayuda" && <Ayuda />}
          {rutaSeleccionada === "contabilidad" && <Contabildad />}
          {rutaSeleccionada === "inventario" && <Inventario />}
          {rutaSeleccionada === "generar-codigo-qr" && <GenerarCodigosQR />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Contenido;
