"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import React, { useContext } from "react";

const ListaCategorias = () => {
  const { setCategoriaSeleccionada, categoriaSeleccionada } =
    useContext(MasterContext);
  const { categorias } = useContext(MainfudContext);

  const coloresRandom = [
    "bg-amber-400/50",
    "bg-green-600/50",
    "bg-red-600/50",
    "bg-blue-500/50",
    "bg-purple-500/50",
    "bg-pink-500/50",
    "bg-yellow-500/50",
    "bg-teal-500/50",
    "bg-indigo-500/50",
    "bg-gray-500/50",
    "bg-orange-500/50",
    "bg-lime-500/50",
    "bg-cyan-500/50",
    "bg-emerald-500/50",
    "bg-rose-500/50",
    "bg-violet-500/50",
    "bg-fuchsia-500/50",
    "bg-sky-500/50",
    "bg-amber-500/50",
  ];

  const getRandomColor = () => {
    return coloresRandom[Math.floor(Math.random() * coloresRandom.length)];
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {categorias?.map((categoria, index) => {
        const colorFondo = getRandomColor();
        return (
          <div
            onClick={() => {
              setCategoriaSeleccionada(categoria.nombreFormateado);
            }}
            key={index}
            className={`min-w-[150px] rounded-full shadow-lg px-4 gap-2 p-3 font-semibold flex items-center justify-center cursor-pointer select-none ${
              categoria.nombreFormateado === categoriaSeleccionada
                ? "bg-rose-400 text-white"
                : "bg-white"
            }`}
          >
            {categoria.nombre}
          </div>
        );
      })}
    </div>
  );
};

export default ListaCategorias;
