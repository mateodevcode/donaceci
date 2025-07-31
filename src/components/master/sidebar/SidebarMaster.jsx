"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import { rutas_master, rutas_master_end } from "@/data/rutas_master";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const SidebarMaster = () => {
  const router = useRouter();
  const { rutaSelect, setRutaSelect } = useContext(MasterContext);
  const { usuario } = useContext(MainfudContext);

  return (
    <div className="w-[280px] sr h-full bg-[#252235] rounded-lg shadow-lg px-4 py-2 pb-4 text-white flex-shrink-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 justify-start p-4">
          <Image
            src={usuario?.imageUrl || "/perfil/avatar.png"}
            alt={usuario?.name || "Usuario"}
            width={100}
            height={100}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold">{usuario?.name}</span>
        </div>

        <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
          {rutas_master.map((ruta, index) => (
            <div
              onClick={() => setRutaSelect(ruta.ruta)}
              key={index}
              className={`flex items-center gap-3 justify-between p-3 rounded-full cursor-pointer select-none active:scale-95 duration-150 ${
                ruta.ruta === rutaSelect
                  ? "bg-white/10 border-[1px] border-white/10"
                  : "border-[1px] border-white/10"
              }`}
            >
              <div className="flex items-center gap-2 mx-2">
                {ruta.icono}
                <span>{ruta.nombre}</span>
              </div>
              <MdKeyboardArrowRight className="text-2xl" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 gap-2 flex flex-col">
        {rutas_master_end.map((ruta, index) => (
          <div
            key={index}
            onClick={() => router.push(`${ruta.ruta}`)}
            className={`flex items-center gap-3 justify-between p-3 rounded-lg cursor-pointer select-none active:scale-95 duration-150 bg-white/10 border-[1px] border-white/10 hover:bg-white/20`}
          >
            <div className="flex items-center gap-2 mx-2">
              <span>{ruta.nombre}</span>
            </div>
            <MdKeyboardArrowRight className="text-2xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarMaster;
