import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import { agruparVentas } from "@/utils/procesarVentas";

export const GraficaVentas = ({ pedidos }) => {
  const [filtro, setFiltro] = useState("dia");

  const data = agruparVentas(pedidos, filtro);

  return (
    <div className="w-full h-[400px] bg-white rounded-xl p-4 shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ventas por {filtro}</h2>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="dia">Día</option>
          <option value="semana">Semana</option>
          <option value="mes">Mes</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
