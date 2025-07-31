"use client";

import { MainfudContext } from "@/context/MainfudContext";
import Image from "next/image";
import React, { useContext } from "react";

const Categoria = ({ setBusqueda }) => {
  const {
    setCategoriaSeleccionada,
    categoriaSeleccionada,
    categoriasFiltradas,
  } = useContext(MainfudContext);

  const categoriasOrdenadas = [...(categoriasFiltradas || [])].sort(
    (a, b) => a.position - b.position
  );

  return (
    <div className="w-11/12 mt-4 flex flex-col overflow-x-auto">
      <h3
        className="text-lg font-semibold text-zinc-800 dark:text-zinc-800"
        id="menu"
      >
        Categorias
      </h3>
      <div className="flex gap-6 min-w-max mt-2">
        {categoriasOrdenadas?.map((item, index) => (
          <div
            onClick={() => {
              setCategoriaSeleccionada(item.nombreFormateado.toLowerCase());
              setBusqueda("");
            }}
            key={index}
            className="flex-none w-20 flex flex-col items-center justify-center gap-2 cursor-pointer select-none pb-2"
          >
            <div
              className={`w-16 h-16 bg-white  rounded-full flex items-center justify-center ${
                item.nombre.toLowerCase() === categoriaSeleccionada
                  ? "shadow-amber-200 shadow-2xl border-2 border-amber-400 dark:border-amber-500"
                  : " shadow-lg"
              }`}
            >
              <Image
                src={item.imagen}
                alt={item.nombre}
                width={100}
                height={100}
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-800 text-sm text-center h-10">
              {item.nombre}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
