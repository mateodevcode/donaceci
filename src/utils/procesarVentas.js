import { format, parseISO, isSameDay, isSameWeek, isSameMonth } from "date-fns";

export const agruparVentas = (pedidos, filtro = "dia") => {
  const agrupado = {};

  pedidos.forEach((p) => {
    if (p.estado === "terminado") {
      const fecha = parseISO(p.createdAt);

      let key;
      if (filtro === "dia") {
        key = format(fecha, "yyyy-MM-dd");
      } else if (filtro === "semana") {
        key = format(fecha, "yyyy-'W'II"); // Semana del año
      } else if (filtro === "mes") {
        key = format(fecha, "yyyy-MM");
      }

      if (!agrupado[key]) agrupado[key] = 0;
      agrupado[key] += Number(p.total);
    }
  });

  return Object.entries(agrupado).map(([fecha, total]) => ({
    fecha,
    total,
  }));
};
