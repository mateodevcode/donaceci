import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const GraficaProductos = ({ data }) => {
  const productosVendidos = {};
  const chartColors = ["#1D4ED8", "#EA580C", "#16A34A", "#F59E0B", "#DC2626"];
  const [colorIndex, setColorIndex] = useState(0);

  data.forEach((pedido) => {
    if (pedido.estado === "terminado") {
      pedido.listaPedidos.forEach((lp) => {
        lp.items.forEach((item) => {
          if (!productosVendidos[item.nombre]) {
            productosVendidos[item.nombre] = 0;
          }
          productosVendidos[item.nombre] += item.cantidad;
        });
      });
    }
  });

  // Convertir en array para la gráfica
  const dataGrafica = Object.entries(productosVendidos).map(
    ([nombre, cantidad]) => ({
      nombre,
      cantidad,
    })
  );

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row justify-between items-center p-2 md:gap-0 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4 md:px-8 mt-2 md:mt-8 text-zinc-800">
            Productos Más Vendidos
          </h2>
          <span className="text-sm text-zinc-600 md:px-8 mb-4">
            Esta gráfica muestra los productos más vendidos en los pedidos
            terminados.
          </span>
        </div>
        <div className="flex items-center gap-2 md:px-8">
          {chartColors.map((color, index) => (
            <span
              key={index}
              style={{ backgroundColor: color }}
              onClick={() => {
                setColorIndex(index);
              }}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none active:scale-95 transition-transform duration-200"
            ></span>
          ))}
        </div>
      </div>
      <div className="w-full h-[200px] md:h-[400px] md:p-8 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataGrafica}
            // margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill={chartColors[colorIndex]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
