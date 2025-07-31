"use client";

import { AdminContext } from "@/context/AdminContext";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { useContext } from "react";
import { LuPanelLeft } from "react-icons/lu";
import { MdOutlineArrowBackIos } from "react-icons/md";

const HeaderPanel = ({ rutaSeleccionada }) => {
  const { openModalSidebar, setOpenModalSidebar } = useContext(AdminContext);
  return (
    <div className="border-b-[1px] border-zinc-300 px-4 py-2 sticky top-0 z-10 bg-white">
      <div className="flex items-center gap-4 pr-3 py-1.5">
        {!openModalSidebar && (
          <div
            className="text-xs text-zinc-500 bg-black/10 cursor-pointer rounded-lg p-1 hover:bg-gray-200 w-8 h-8 flex items-center justify-center"
            onClick={() => setOpenModalSidebar(!openModalSidebar)}
          >
            <MdOutlineArrowBackIos className="text-base rotate-180" />
          </div>
        )}
        <LuPanelLeft className="text-xl" />
        <div className="w-[1px] h-5 bg-zinc-300" />
        <span className="font-semibold">
          {tomarDosPrimerosNombres(rutaSeleccionada)}
        </span>
      </div>
    </div>
  );
};

export default HeaderPanel;
