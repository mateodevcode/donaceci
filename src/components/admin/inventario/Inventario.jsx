"use client";

import React, { useState } from "react";
import TablaInventarios from "./TablaInventarios";
import ArqueoDiario from "./ArqueoDiario";
import TodosArqueo from "./TodosArqueo";
import { MdToday } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiFileList3Line } from "react-icons/ri";

const Inventario = () => {
  const [verOpciones, setVerOpciones] = useState("arqueo-diario");

  return (
    <div className="w-full px-4 py-2">
      <div className="flex justify-end items-center w-full">
        <div className="flex gap-2 flex-row items-center">
          <button
            className={`p-2 rounded-lg text-sm cursor-pointer select-none active:scale-95 duration-300 flex items-center gap-2 ${
              verOpciones === "arqueo-diario"
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black border border-gray-300"
            }`}
            onClick={() => setVerOpciones("arqueo-diario")}
          >
            <MdToday className="text-xl" />{" "}
            <span className="hidden md:flex">Arqueo diario</span>
          </button>
          <button
            className={`p-2 rounded-lg text-sm cursor-pointer select-none active:scale-95 duration-300 flex items-center gap-2 ${
              verOpciones === "inventario-completo"
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black border border-gray-300"
            }`}
            onClick={() => setVerOpciones("inventario-completo")}
          >
            <RiFileList3Line className="text-xl" />{" "}
            <span className="hidden md:flex">Inventario completo</span>
          </button>
          <button
            className={`p-2 rounded-lg text-sm cursor-pointer select-none active:scale-95 duration-300 flex items-center gap-2 ${
              verOpciones === "todos-arqueos"
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black border border-gray-300"
            }`}
            onClick={() => setVerOpciones("todos-arqueos")}
          >
            <LiaClipboardListSolid className="text-xl" />{" "}
            <span className="hidden md:flex">Todos los arqueos</span>
          </button>
        </div>
      </div>
      {verOpciones === "inventario-completo" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold p-4">Inventario completo</h2>
          <TablaInventarios />
        </div>
      )}
      {verOpciones === "arqueo-diario" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold p-4">Arqueo diario</h2>
          <ArqueoDiario />
        </div>
      )}
      {verOpciones === "todos-arqueos" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold p-4">Todos los arqueos</h2>
          <TodosArqueo />
        </div>
      )}
    </div>
  );
};

export default Inventario;
