"use client";

import { MainfudContext } from "@/context/MainfudContext";
import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { LuFilter, LuFilterX } from "react-icons/lu";

const Buscar = ({ setBusqueda, busqueda }) => {
  const { setCategoriaSeleccionada, categorias } = useContext(MainfudContext);
  const primeraOrden = categorias?.sort((a, b) => a.position - b.position)[0];

  return (
    <div className="w-11/12 mt-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-4 py-3 flex items-center border-[1px] border-zinc-100">
        <button className="cursor-pointer select-none">
          <BiSearch className="text-lg text-zinc-800" />
        </button>
        <input
          type="text"
          placeholder="Pasta Carbonara..."
          onChange={(e) => {
            setBusqueda(e.target.value);
            setCategoriaSeleccionada(
              primeraOrden?.nombreFormateado || "ejecutivos"
            );
          }}
          value={busqueda}
          className="w-40 border-none outline-none text-zinc-800 ml-2 text-sm"
        />
      </div>
      {busqueda ? (
        <button
          className="p-3 bg-amber-400 hover:bg-amber-400/50 rounded-md flex items-center justify-center shadow-lg cursor-pointer select-none ml-2 active:scale-95 duration-75"
          onClick={() => {
            setBusqueda("");
            setCategoriaSeleccionada(
              primeraOrden?.nombreFormateado || "ejecutivos"
            );
          }}
        >
          <LuFilterX className="text-lg text-white" />
        </button>
      ) : (
        <button
          className="p-3 bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-400/50 hover:bg-amber-400/50 rounded-md flex items-center justify-center shadow-lg cursor-pointer select-none ml-2 active:scale-95 duration-75"
          onClick={() => {
            setBusqueda("");
            setCategoriaSeleccionada(
              primeraOrden?.nombreFormateado || "ejecutivos"
            );
          }}
        >
          <LuFilter className="text-lg text-white" />
        </button>
      )}
    </div>
  );
};

export default Buscar;
