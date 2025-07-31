"use client";

import { formatoDinero } from "@/utils/formatoDinero";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { useContext, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { getTotalProductosDeUnaOrden } from "@/utils/getTotalProductosDeUnaOrden";
import { MainfudContext } from "@/context/MainfudContext";

const Rangos = [
  { label: "Hoy", dias: 0 },
  { label: "Últimos 7 días", dias: 7 },
  { label: "Últimos 30 días", dias: 30 },
];

const TablaOrdenes = () => {
  const { ordenes: ordenesSinReversed } = useContext(MainfudContext);
  const ordenes = [...ordenesSinReversed].reverse();

  const [estadoOrden, setEstadoOrden] = useState(null);
  const [filtroDias, setFiltroDias] = useState(0);

  const filtrarOrdenes = (listaOrdenes, filtroEstado, filtroFecha) => {
    // Si no hay filtro de fecha, devolvemos todas las órdenes
    if (!filtroFecha) {
      return listaOrdenes.filter((orden) =>
        filtroEstado ? orden.estado === filtroEstado : true
      );
    }

    // Convertimos la fecha del filtro a milisegundos (inicio del día)
    const fechaFiltroMs = new Date(filtroFecha).setHours(0, 0, 0, 0);

    return listaOrdenes.filter((orden) => {
      const coincideEstado = filtroEstado
        ? orden.estado === filtroEstado
        : true;

      // Parseamos la fecha del pedido
      const fechaOrdenMs = new Date(orden.createdAt).setHours(0, 0, 0, 0);
      const coincideFecha = fechaOrdenMs >= fechaFiltroMs;
      return coincideEstado && coincideFecha;
    });
  };

  // Obtiene la fecha de hace X días
  const getFechaHaceXDias = (dias = 0) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  };

  const filtroGeneral = filtrarOrdenes(
    ordenes,
    estadoOrden,
    getFechaHaceXDias(filtroDias)
  );

  return (
    <div className="w-full px-4 py-2">
      <div className="h-20 md:h-12 flex flex-col md:flex-row items-start md:items-center justify-between">
        <ul className="flex items-center text-sm font-semibold justify-between md:justify-start gap-1 p-0.5 rounded-md bg-zinc-100 border-[1px] border-zinc-300 w-full md:w-max">
          <li
            className={`px-2 md:px-4 py-1 rounded-md cursor-pointer select-none hover:bg-white active:scale-95 duration-150 ${
              estadoOrden === null ? "bg-white" : ""
            }`}
            onClick={() => setEstadoOrden(null)}
          >
            Todo
          </li>
          <li
            className={`px-2 md:px-4 py-1 rounded-md cursor-pointer select-none hover:bg-white active:scale-95 duration-150 ${
              estadoOrden === "pendiente" ? "bg-white" : ""
            }`}
            onClick={() => setEstadoOrden("pendiente")}
          >
            Pendientes
          </li>
          <li
            className={`px-2 md:px-4 py-1 rounded-md cursor-pointer select-none hover:bg-white active:scale-95 duration-150 ${
              estadoOrden === "terminado" ? "bg-white" : ""
            }`}
            onClick={() => setEstadoOrden("terminado")}
          >
            Terminados
          </li>
          <li
            className={`px-2 md:px-4 py-1 rounded-md cursor-pointer select-none hover:bg-white active:scale-95 duration-150 ${
              estadoOrden === "cancelado" ? "bg-white" : ""
            }`}
            onClick={() => setEstadoOrden("cancelado")}
          >
            Cancelados
          </li>
        </ul>
        <div className="flex gap-2">
          {Rangos.map((r) => (
            <button
              key={r.dias}
              onClick={() => setFiltroDias(r.dias)}
              className={`px-3 py-1 rounded-md text-sm ${
                filtroDias === r.dias ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tabla de pedidos */}
      <div className="w-full h-full border-[1px] rounded-md border-zinc-300 mt-4">
        <div className="w-full bg-gray-100 h-10 rounded-t-md flex items-center justify-between text-sm font-semibold gap-4">
          <div className="w-24 text-center">Pedido</div>
          <div className="w-40 text-center hidden md:flex">Tipo de Pedido</div>
          <div className="w-20 text-center hidden md:flex">Cantidad</div>
          <div className="w-28 text-center">Total</div>
          <div className="w-24 text-center hidden md:flex">Fecha</div>
          <div className="w-48 text-center hidden md:flex">Cliente</div>
          <div className="w-32 text-center">Estado</div>
        </div>
        <div>
          {filtroGeneral.map((orden, index) => (
            <div
              key={index}
              className={`w-full h-12 flex items-center justify-between border-zinc-300 text-sm gap-4 ${
                index === ordenes.length - 1 ? "" : "border-b-[1px]"
              }`}
            >
              <div className="w-24 text-center text-blue-600 font-semibold">
                {orden.pedido}
              </div>
              <div className="w-40 text-center hidden md:flex">
                <span className="border-[1px] border-zinc-300 px-3 py-1 rounded-full text-xs">
                  {orden.para_llevar ? "Para llevar" : "Para comer aquí"}
                </span>
              </div>
              <div className="w-20 text-center">
                {getTotalProductosDeUnaOrden(orden.listaPedidos)}
              </div>
              <div className="w-28 text-center font-semibold hidden md:flex">
                {formatoDinero(orden.total)}
              </div>
              <div className="w-24 text-center text-xs hidden md:flex">
                <span className="px-2 py-1 rounded-full bg-zinc-200 text-zinc-800">
                  {new Date(orden.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <div className="w-48 text-center hidden md:flex">
                {tomarDosPrimerosNombres(orden.nombre)}
              </div>
              <div className="w-32 text-center text-xs flex items-center justify-center">
                {orden.estado === "terminado" && (
                  <div className="flex items-center justify-center border-[1px] border-green-600 text-green-600 rounded-full py-1 gap-2 w-max px-3 bg-green-200">
                    <FaCircleCheck className="text-green-500" />
                    {orden.estado}
                  </div>
                )}
                {orden.estado === "pendiente" && (
                  <div className="flex items-center justify-center border-[1px] border-blue-600 text-blue-600 rounded-full py-1 gap-2 w-max px-3 bg-blue-200">
                    <FiLoader className="text-blue-500" />
                    {orden.estado}
                  </div>
                )}
                {orden.estado === "cancelado" && (
                  <div className="flex items-center justify-center border-[1px] border-red-600 text-red-600 rounded-full py-1 gap-2 w-max px-3 bg-red-200">
                    <IoCloseCircleSharp className="text-red-500" />
                    {orden.estado}
                  </div>
                )}
              </div>
            </div>
          ))}
          {filtroGeneral.length === 0 && (
            <div className="w-full h-12 flex items-center justify-center text-sm text-zinc-500">
              No hay órdenes para mostrar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablaOrdenes;
