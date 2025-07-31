"use client";

import { MasterContext } from "@/context/MasterContext";
import { useContext } from "react";
import { IoPrintOutline } from "react-icons/io5";

const TicketView = ({ datos }) => {
  const { setOpenModalTicket, setDatosTicket } = useContext(MasterContext);
  const handleImprimir = () => {
    window.print();
  };

  return (
    <>
      <button
        onClick={() => {
          handleImprimir();
          setDatosTicket(datos);
          setOpenModalTicket(true);
        }}
        className="w-full border-rose-400 border-[1px] text-black py-2 rounded-xl flex items-center gap-2 transition-colors duration-200 justify-center cursor-pointer select-none active:scale-95 hover:bg-rose-500 hover:text-white"
      >
        <IoPrintOutline />
        <span className="text-sm">Imprimir Ticket</span>
      </button>
    </>
  );
};

export default TicketView;
