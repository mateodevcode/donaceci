"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import React, { useContext } from "react";

const Saludo = () => {
  const { usuario } = useContext(MainfudContext);
  const name = usuario?.name || "CeciLover´s";
  return (
    <div className="w-11/12 flex flex-col items-start justify-center px-4 mt-4">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
        Hola, {tomarDosPrimerosNombres(name)}
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center w-full dark:text-gray-300">
        ¿Qué te gustaría comer hoy?
      </p>
    </div>
  );
};

export default Saludo;
