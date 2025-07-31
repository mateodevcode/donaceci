"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useContext } from "react";
import Switch from "react-switch";

export default function SwitchSonido() {
  const { usuarioStorage } = useContext(MainfudContext);
  const { actualizarCampoUsuario } = useLocalStorage();

  return (
    <div className="flex items-center justify-between w-10/12 md:w-[450px] p-6 mt-2">
      <div className="flex items-center justify-center gap-4">
        <span className="flex flex-row items-center justify-between py-4 border-l-4 border-amber-400">
          {" "}
        </span>
        <span className="text-zinc-800 font-semibold text-base">Sonidos</span>
      </div>
      <Switch
        checked={usuarioStorage?.activar_sonido}
        onChange={() =>
          actualizarCampoUsuario(
            "activar_sonido",
            !usuarioStorage?.activar_sonido
          )
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
  );
}
