"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useContext } from "react";
import Switch from "react-switch";

export default function SwitchParaLlevar() {
  const { formDatos } = useContext(MainfudContext);
  const { actualizarCampoOrden } = useLocalStorage();

  return (
    <div className="flex flex-col items-center justify-center w-10/12 md:w-[450px] px-6 gap-8">
      <p className="font-semibold text-lg text-zinc-600">Opciones de pedido</p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-4">
          <span className="flex flex-row items-center justify-between py-4 border-l-4 border-amber-400">
            {" "}
          </span>
          <span className="text-zinc-800 font-semibold text-base">
            Para llevar
          </span>
        </div>
        <Switch
          checked={formDatos?.para_llevar ?? false}
          onChange={() =>
            actualizarCampoOrden("para_llevar", !formDatos?.para_llevar)
          }
          handleDiameter={14}
          offColor="#000"
          onColor="#ffb900"
          offHandleColor="#ffb900"
          onHandleColor="#F4F4F5"
          height={20}
          width={35}
          className="react-switch"
          id="small-radius-switch"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-4">
          <span className="flex flex-row items-center justify-between py-4 border-l-4 border-amber-400">
            {" "}
          </span>
          <span className="text-zinc-800 font-semibold text-base">
            Para comer aquí
          </span>
        </div>

        <Switch
          checked={formDatos?.para_llevar === false}
          onChange={() =>
            actualizarCampoOrden("para_llevar", !formDatos?.para_llevar)
          }
          handleDiameter={14}
          offColor="#000"
          onColor="#ffb900"
          offHandleColor="#ffb900"
          onHandleColor="#F4F4F5"
          height={20}
          width={35}
          className="react-switch"
          id="small-radius-switch"
        />
      </div>
    </div>
  );
}
