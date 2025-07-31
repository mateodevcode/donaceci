"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";
import { subDays, format, isAfter, parseISO } from "date-fns";

const Rangos = [
  { label: "7 días", dias: 7 },
  { label: "30 días", dias: 30 },
  { label: "90 días", dias: 90 },
];

export default function GraficaVentas({ pedidos }) {
  const [dias, setDias] = useState(30);

  // Procesar pedidos para agrupar ventas por fecha, considerando sólo pedidos terminados
  const data = useMemo(() => {
    // Obtenemos la fecha límite según el rango seleccionado
    const fechaLimite = subDays(new Date(), dias);

    // Objeto para acumular ventas por fecha
    const ventasPorFecha = {};

    pedidos.forEach((pedido) => {
      // Convertir fecha creada a Date
      const fechaCreacion = parseISO(pedido.createdAt);

      // Filtrar por fecha dentro del rango y estado terminado
      if (
        isAfter(fechaCreacion, fechaLimite) &&
        pedido.estado === "terminado"
      ) {
        const fechaStr = format(fechaCreacion, "yyyy-MM-dd");
        const total = Number(pedido.total) || 0;

        if (!ventasPorFecha[fechaStr]) {
          ventasPorFecha[fechaStr] = 0;
        }
        ventasPorFecha[fechaStr] += total;
      }
    });

    // Convertir el objeto en array ordenado por fecha
    const resultado = [];

    for (let i = dias; i >= 0; i--) {
      const fecha = format(subDays(new Date(), i), "yyyy-MM-dd");
      resultado.push({
        fecha,
        ventas: ventasPorFecha[fecha] || 0,
      });
    }

    return resultado;
  }, [pedidos, dias]);

  return (
    <div className="bg-white rounded-xl shadow-md w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="py-4">
          <h2 className="text-lg font-semibold">Ventas por Día</h2>
          <p className="text-sm text-gray-500">
            Totales del período seleccionado
          </p>
        </div>
        <div className="flex gap-2">
          <span className="md:flex hidden">últimos</span>
          {Rangos.map((r) => (
            <button
              key={r.dias}
              onClick={() => setDias(r.dias)}
              className={`px-3 py-1 rounded-md text-sm ${
                dias === r.dias ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300} className={"p-2 h-96"}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#000000" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="fecha"
            tickFormatter={(str) => format(new Date(str), "MMM d")}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(v) => `$${v}`}
            labelFormatter={(l) => `Fecha: ${l}`}
          />
          <Area
            type="monotone"
            dataKey="ventas"
            stroke="#000"
            fillOpacity={1}
            fill="url(#colorVentas)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
