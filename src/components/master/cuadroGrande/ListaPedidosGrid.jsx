"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import useOrdenesMaster from "@/hooks/useOrdenesMaster";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoFecha, formatoHora } from "@/utils/formatoFecha";
import Image from "next/image";
import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

const ListaPedidosGrid = ({ listaOrdenes }) => {
  const {
    setOpenModalPedidoSeleccionado,
    setPedidoSeleccionadoMaster,
    setOpenModalEditarPedido,
  } = useContext(MasterContext);
  const { setItemsSeleccionados, setPedidoAEditar, setOrdenId, pedidoAEditar } =
    useContext(MainfudContext);
  const { handleCancelOrder, handleTerminarOrder } = useOrdenesMaster();

  async function guardarAsientoContable(asiento) {
    const res = await fetch("/api/asientos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orden: asiento, // Aquí pasamos el objeto de orden completo
      }),
    });

    if (!res.ok) {
      throw new Error("Error al guardar el asiento");
    }

    return await res.json();
  }

  async function registrarMovimientoInventario(items, usuario) {
    const res = await fetch("/api/movimiento-inventario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        usuario,
      }),
    });

    if (!res.ok) {
      throw new Error("Error al registrar el movimiento de inventario");
    }

    return await res.json();
  }

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {listaOrdenes.map((orden, index) => (
          <div
            key={index}
            onClick={() => {
              setPedidoSeleccionadoMaster(orden);
              setOpenModalPedidoSeleccionado(true);
            }}
            className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800 cursor-pointer select-none relative ${
              orden.estado === "pendiente"
                ? "border-l-2 border-amber-500/50 hover:border-amber-500/70"
                : orden.estado === "terminado"
                ? "border-l-2 border-green-500/50 hover:border-green-500/70"
                : "border-l-2 border-red-300/50 hover:border-red-300/70"
            }`}
          >
            {orden.estado === "pendiente" && (
              <div className="w-full flex items-center justify-end absolute -top-2 -right-2">
                <button
                  className="flex items-center gap-2 bg-zinc-50 rounded-full shadow-md p-3 hover:bg-zinc-200 transition-colors cursor-pointer select-none active:scale-95 duration-150 text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModalEditarPedido(true);
                    setOrdenId(orden._id);
                    localStorage.removeItem("idOrdenCreadaPendiente");
                  }}
                >
                  <FiEdit className="" />
                </button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="">
                <h3 className="text-sm font-semibold">
                  Orden #<span>{orden.pedido}</span>
                </h3>
                <span className="text-xs text-zinc-500">
                  {formatoFecha(orden.createdAt)},{" "}
                  {formatoHora(orden.createdAt)}
                </span>
              </div>
              {orden.mesa !== null ? (
                <span className="bg-amber-400 px-3 py-2 rounded-lg text-black font-semibold text-sm w-10 h-10 flex items-center justify-center">
                  {orden.mesa}
                </span>
              ) : (
                <span className="bg-rose-400 px-3 py-2 rounded-lg text-white font-semibold text-sm">
                  <MdDeliveryDining className="text-xl" />
                </span>
              )}
            </div>
            <div className="h-24 mt-6">
              {orden.items.slice(0, 2).map((producto, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-start mt-2 border-b-[2px] border-dashed border-zinc-300 pb-2 gap-2"
                >
                  <Image
                    src={producto.image}
                    alt={producto.nombre}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col items-start justify-start w-full">
                    <span className="text-xs font-semibold">
                      {producto.nombre}
                    </span>
                    <div className="text-sm w-full flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-800">
                        {formatoDinero(producto.precio)}
                      </span>
                      <span className="text-sm font-semibold">
                        <span className="text-xs">Cantidad:</span>{" "}
                        {producto.cantidad}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                <RiFileList2Line />
                <span>Comentarios:</span>
              </div>
              <p className="text-xs text-zinc-500 break-words whitespace-pre-line">
                {orden.comentarios ? orden.comentarios : "Sin comentarios"}
              </p>
            </div>

            <div className="w-full flex items-center justify-between p-2 rounded-lg mt-4">
              <div className="flex flex-col items-start justify-start">
                <div className="text-xs text-zinc-500">
                  {orden.unidades}x <span>Items</span>
                </div>
                <span className="text-sm font-semibold text-zinc-800">
                  {formatoDinero(orden.total)}
                </span>
              </div>
              {orden.estado === "pendiente" && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOrder(orden);
                    }}
                  >
                    <IoClose className="text-lg text-zinc-800 cursor-pointer" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600/50"
                    onClick={async (e) => {
                      e.stopPropagation();
                      handleTerminarOrder(orden);
                      await guardarAsientoContable(orden);
                      await registrarMovimientoInventario(
                        orden.items,
                        orden.usuario
                      );
                    }}
                  >
                    <FaCheck className="text-lg text-zinc-800 cursor-pointer" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPedidosGrid;
