"use client";

import { MasterContext } from "@/context/MasterContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useRef } from "react";
import { IoClose, IoPrintOutline } from "react-icons/io5";
import Ticket from "../cuadroGrande/Ticket";

const ModalTicketImprimir = () => {
  const { openModalTicket, setOpenModalTicket, datosTicket } =
    useContext(MasterContext);

  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // opcional, para evitar problemas de render
  };

  return (
    <AnimatePresence>
      {openModalTicket && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalTicket(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer select-none relative"
            >
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white absolute -top-12 right-0 z-10"
                onClick={() => {
                  setOpenModalTicket(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800 max-h-svh overflow-y-auto`}
                ref={printRef}
              >
                <Ticket datos={datosTicket} />
              </div>
              <button
                onClick={handlePrint}
                className="w-full bg-rose-500 border-rose-500 border-[1px] text-white py-2 rounded-xl flex items-center gap-2 transition-colors duration-200 justify-center cursor-pointer select-none active:scale-95 hover:bg-rose-600 hover:text-white absolute -bottom-12"
              >
                <IoPrintOutline />
                <span className="text-sm">Imprimir</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalTicketImprimir;
