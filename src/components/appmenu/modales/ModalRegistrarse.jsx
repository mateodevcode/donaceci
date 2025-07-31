"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Registrarse from "@/components/registrarse/Registrarse";
import { createPortal } from "react-dom";

const ModalRegistrarse = () => {
  const { openModalRegistrarse, setOpenModalRegistrarse } =
    useContext(MainfudContext);

  useEffect(() => {
    if (openModalRegistrarse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalRegistrarse]);

  // return (
  //   <AnimatePresence>
  //     {openModalRegistrarse && (
  //       <div
  //         className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
  //         onClick={() => setOpenModalRegistrarse(false)}
  //       >
  //         <motion.div
  //           className="relative z-10 w-full h-svh flex flex-col items-center bg-amber-50"
  //           initial={{ opacity: 0, scale: 0 }}
  //           animate={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.3 }}
  //           exit={{ opacity: 0, scale: 0 }}
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           <div
  //             className="absolute top-4 right-4 cursor-pointer rounded-md bg-black/10 hover:bg-black/20 transition-colors duration-200 p-2"
  //             onClick={() => setOpenModalRegistrarse(false)}
  //           >
  //             <IoClose className="text-xl text-white" />
  //           </div>
  //           <Registrarse />
  //         </motion.div>
  //       </div>
  //     )}
  //   </AnimatePresence>
  // );

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalRegistrarse ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalRegistrarse ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalRegistrarse(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalRegistrarse ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute top-4 right-4 cursor-pointer rounded-md bg-black/10 hover:bg-black/20 transition-colors duration-200 p-2"
          onClick={() => setOpenModalRegistrarse(false)}
        >
          <IoClose className="text-xl text-white" />
        </div>
        <Registrarse />
      </div>
    </div>,
    document.body
  );
};

export default ModalRegistrarse;
