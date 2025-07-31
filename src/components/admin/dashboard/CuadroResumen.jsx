import { formatoDinero } from "@/utils/formatoDinero";
import { formatoHora } from "@/utils/formatoFecha";
import React from "react";
import { PiChartLineDown, PiChartLineUp } from "react-icons/pi";

const CuadroResumen = ({ ordenes }) => {
  function filtrarPorFecha(data, fecha) {
    return data.filter((pedido) => pedido.createdAt.startsWith(fecha));
  }

  function totalVentas(data) {
    return data.reduce((total, pedido) => {
      if (pedido.estado !== "terminado") return total;

      const subtotal = pedido.listaPedidos.reduce((sum, lista) => {
        return (
          sum +
          lista.items.reduce(
            (acc, item) => acc + item.precio * item.cantidad,
            0
          )
        );
      }, 0);

      return total + subtotal;
    }, 0);
  }

  function productoMasVendido(data) {
    const productos = {};
    data.forEach((pedido) => {
      pedido.listaPedidos.forEach((lista) => {
        lista.items.forEach((item) => {
          productos[item.nombre] =
            (productos[item.nombre] || 0) + item.cantidad;
        });
      });
    });

    const entries = Object.entries(productos);
    if (entries.length === 0) return null;
    return entries.reduce((a, b) => (a[1] > b[1] ? a : b)); // Devuelve [nombre, cantidad]
  }

  function totalPorEstado(data, estado) {
    return data.filter((pedido) => pedido.estado === estado).length;
  }

  function calcularCambioPorcentual(hoy, ayer) {
    return ((hoy - ayer) / (ayer || 1)) * 100;
  }

  function compararKPIs(ordenes) {
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().slice(0, 10);

    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    const fechaAyer = ayer.toISOString().slice(0, 10);

    // Datos por día
    const pedidosHoy = filtrarPorFecha(ordenes, fechaHoy);
    const pedidosAyer = filtrarPorFecha(ordenes, fechaAyer);

    // KPIs
    const ventasHoy = totalVentas(pedidosHoy);
    const ventasAyer = totalVentas(pedidosAyer);

    const prodHoy = productoMasVendido(pedidosHoy);
    const prodAyer = productoMasVendido(pedidosAyer);

    const ordenesTerminadasHoy = totalPorEstado(pedidosHoy, "terminado");
    const ordenesTerminadasAyer = totalPorEstado(pedidosAyer, "terminado");

    const ordenesCanceladasHoy = totalPorEstado(pedidosHoy, "cancelado");
    const ordenesCanceladasAyer = totalPorEstado(pedidosAyer, "cancelado");

    return {
      totalVentas: {
        hoy: ventasHoy,
        ayer: ventasAyer,
        cambio: calcularCambioPorcentual(ventasHoy, ventasAyer),
      },
      productoMasVendido: {
        nombre: prodHoy ? prodHoy[0] : "N/A",
        hoy: prodHoy ? prodHoy[1] : 0,
        ayer: prodAyer ? prodAyer[1] : 0,
        cambio: calcularCambioPorcentual(
          prodHoy ? prodHoy[1] : 0,
          prodAyer ? prodAyer[1] : 0
        ),
      },
      ordenesTerminadas: {
        hoy: ordenesTerminadasHoy,
        ayer: ordenesTerminadasAyer,
        cambio: calcularCambioPorcentual(
          ordenesTerminadasHoy,
          ordenesTerminadasAyer
        ),
      },
      ordenesCanceladas: {
        hoy: ordenesCanceladasHoy,
        ayer: ordenesCanceladasAyer,
        cambio: calcularCambioPorcentual(
          ordenesCanceladasHoy,
          ordenesCanceladasAyer
        ),
      },
    };
  }

  const resumen = compararKPIs(ordenes);
  const positivo = resumen.totalVentas.cambio >= 0;

  const cuadros_resumen = [
    {
      titulo: "Total Ventas",
      porcentaje: "1,234 %",
      valor: formatoDinero(resumen.totalVentas.hoy),
      mensaje: "Analisis de hoy",
      ultima_actualizacion: `Ultima actualizacion ${formatoHora(
        ordenes[ordenes?.length - 1]?.createdAt
      )}`,
      icono: <PiChartLineUp />,
      cambio: resumen.totalVentas.cambio,
    },
    {
      titulo: "Producto Top",
      porcentaje: "1,234 %",
      valor: `${resumen.productoMasVendido.hoy} Unidades`,
      mensaje: `${resumen.productoMasVendido.nombre}`,
      ultima_actualizacion: `Ultima actualizacion ${formatoHora(
        ordenes[ordenes?.length - 1]?.createdAt
      )}`,
      icono: <PiChartLineUp />,
      cambio: resumen.productoMasVendido.cambio,
    },
    {
      titulo: "Pedidos Terminados",
      porcentaje: "1,2 %",
      valor: `${resumen.ordenesTerminadas.hoy} Pedidos`,
      mensaje: "Analisis de hoy",
      ultima_actualizacion: `Ultima actualizacion ${formatoHora(
        ordenes[ordenes?.length - 1]?.createdAt
      )}`,
      icono: <PiChartLineUp />,
      cambio: resumen.ordenesTerminadas.cambio,
    },
    {
      titulo: "Pedidos cancelados",
      porcentaje: "1 %",
      valor: `${resumen.ordenesCanceladas.hoy} Pedidos`,
      mensaje: "Analisis de hoy",
      ultima_actualizacion: `Ultima actualizacion ${formatoHora(
        ordenes[ordenes?.length - 1]?.createdAt
      )}`,
      icono: <PiChartLineUp />,
      cambio: resumen.ordenesCanceladas.cambio,
    },
  ];
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cuadros_resumen.map((cuadro, index) => {
        const cambio = cuadro.cambio || 0; // Asegura que exista
        const positivo = cambio >= 0;

        return (
          <div
            key={index}
            className="h-40 bg-amber-300 rounded-md bg-gradient-to-b from-white to-zinc-200 border-[1px] border-zinc-300 p-4"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-zinc-600">{cuadro.titulo}</span>
              <div className="flex items-center gap-2 border-[1px] border-zinc-300 rounded-full px-2 py-1 bg-white">
                {/* {cuadro.icono} */}
                {positivo && cuadro.titulo !== "Pedidos cancelados" ? (
                  <PiChartLineUp className="text-green-600" />
                ) : (
                  <PiChartLineDown className="text-red-600" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    positivo ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(cambio).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="my-1">
              <span className="text-2xl font-bold">{cuadro.valor}</span>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <span className="font-semibold text-sm text-black">
                {cuadro.mensaje}
              </span>
              <span className="text-xs text-zinc-600">
                {cuadro.ultima_actualizacion}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CuadroResumen;
