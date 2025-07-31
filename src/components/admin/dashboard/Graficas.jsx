"use client";

import { useState } from "react";
import { PiChartLineUp } from "react-icons/pi";
import { GraficaProductos } from "./graficas/GraficaProductos";
import GraficaVentas from "./graficas/GraficaVentas";

const Graficas = ({ ordenes }) => {
  const [tipo_grafica, setTipoGrafica] = useState("ventas");
  return (
    <div className="w-full px-4 py-2">
      <div className="h-12 flex items-center justify-start gap-4">
        <button
          onClick={() => setTipoGrafica("ventas")}
          className={`text-sm flex items-center gap-2 cursor-pointer select-none active:scale-95 duration-150 ${
            tipo_grafica === "ventas" ? "text-blue-600" : "text-zinc-800"
          }`}
        >
          <PiChartLineUp className="text-sm" />
          Ventas
        </button>
        <button
          onClick={() => setTipoGrafica("productos")}
          className={`text-sm flex items-center gap-2 cursor-pointer select-none active:scale-95 duration-150 ${
            tipo_grafica === "productos" ? "text-blue-600" : "text-zinc-800"
          }`}
        >
          <PiChartLineUp className="text-sm" />
          Productos más vendidos
        </button>
      </div>
      <div className="w-full h-full border-[1px] rounded-md border-zinc-300">
        {tipo_grafica === "productos" && <GraficaProductos data={ordenes} />}
        {tipo_grafica === "ventas" && <GraficaVentas pedidos={ordenes} />}
      </div>
    </div>
  );
};

export default Graficas;
