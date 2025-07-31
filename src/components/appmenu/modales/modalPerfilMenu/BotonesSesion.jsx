"use client";

import { MainfudContext } from "@/context/MainfudContext";
import React, { useContext } from "react";

const BotonesSesion = () => {
  const { setOpenModalPerfilMenu, setOpenModalIniciarSesion, usuario } =
    useContext(MainfudContext);

  return (
    <>
      {!usuario && (
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="bg-amber-400 w-full text-white py-2 rounded-full hover:bg-amber-300 transition-colors shadow-lg border-[1px] border-amber-400 font-semibold cursor-pointer select-none active:scale-95 duration-75"
            onClick={() => {
              setOpenModalIniciarSesion(true);
              setOpenModalPerfilMenu(false);
            }}
          >
            Iniciar sesión
          </button>
          <button
            className="w-full text-black dark:text-zinc-200 py-2 rounded-full hover:bg-white bg-white transition-colors shadow-lg border-[1px] border-white cursor-pointer select-none active:scale-95 duration-75"
            onClick={() => setOpenModalPerfilMenu(false)}
          >
            Crea una cuenta
          </button>
        </div>
      )}
    </>
  );
};

export default BotonesSesion;
