"use client";

import React, { useState } from "react";
import LibroDiarioMovimientos from "./LibroDiarioMovimientos";
import CierreDiario from "./CierreDiario";

const Contabilidad = () => {
  const [verOpciones, setVerOpciones] = useState("libro_diario");


  return (
    <div className="w-full px-4 py-2">
      <div className="flex justify-end items-center w-full">
        <div className="flex gap-2 flex-row items-center">
          <button
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer select-none active:scale-95 duration-300 ${
              verOpciones === "libro_diario"
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black border border-gray-300"
            }`}
            onClick={() => setVerOpciones("libro_diario")}
          >
            Libro Diario
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-sm cursor-pointer select-none active:scale-95 duration-300 ${
              verOpciones === "cierre_diario"
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black border border-gray-300"
            }`}
            onClick={() => setVerOpciones("cierre_diario")}
          >
            Cierre Diario
          </button>
        </div>
      </div>
      {verOpciones === "libro_diario" && <LibroDiarioMovimientos />}
      {verOpciones === "cierre_diario" && <CierreDiario />}
    </div>
  );
};

export default Contabilidad;
