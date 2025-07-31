"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import {
  MdDeliveryDining,
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import BadgeEstado from "../../badges/BadgeEstado";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoFechaCorta, formatoHora } from "@/utils/formatoFecha";
import HistorialVacio from "../modalCarritoCompras/HistorialVacio";
import { IoClose } from "react-icons/io5";
import { calcularAdicionales } from "@/utils/calcularAdicionales";
import { getTotalProductosDeUnaOrden } from "@/utils/getTotalProductosDeUnaOrden";
import { createPortal } from "react-dom";
import Image from "next/image";

const ModalHistorialPedidos = () => {
  const {
    openModalHistorialPedidos,
    setOpenModalHistorialPedidos,
    setOpenModalPedido,
    ordenes,
    usuario,
  } = useContext(MainfudContext);
  const [detallePedidoIndex, setDetallePedidoIndex] = useState(null);

  const ordenesr = [...ordenes].reverse();

  const ordenesFiltradas = ordenesr.filter(
    (orden) => orden.id_usuario === usuario?._id
  );

  useEffect(() => {
    if (openModalHistorialPedidos) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalHistorialPedidos]);

  const getProductosYTotal = (ordenesReverse) => {
    const items = ordenesReverse.flatMap((pedido) => pedido.items || []);
    const total = items.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    return { items, total };
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-700 ${
        openModalHistorialPedidos ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          openModalHistorialPedidos ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModalHistorialPedidos(false)}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-amber-50 shadow-xl transition-transform duration-700 ease-in-out w-screen ${
          openModalHistorialPedidos ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4">
          <button
            onClick={() => {
              setOpenModalHistorialPedidos(false);
              setOpenModalPedido(false);
              setDetallePedidoIndex(null);
            }}
            className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
          >
            <MdOutlineKeyboardArrowLeft className="text-2xl" />
          </button>
          <h3 className="text-xl font-semibold text-zinc-800">
            Historial de Pedidos
          </h3>
          <div></div>
        </div>
        {ordenesFiltradas.length > 0 ? (
          <div className="w-full flex flex-col items-center justify-start gap-4 p-8 h-[86svh] overflow-y-auto">
            {ordenesFiltradas.map((orden, index) => {
              // Extraemos los items y total de este pedido
              const { items, total } = getProductosYTotal(orden.listaPedidos);
              const { valorEnvio, servicioVoluntario, precioTotal } =
                calcularAdicionales(
                  orden.createdAt,
                  orden.para_llevar,
                  orden.total
                );

              return (
                <div key={index}>
                  {/* Tarjeta del pedido */}
                  <div className="p-4 border-[1px] border-zinc-100 rounded-lg w-80 bg-white">
                    <div className="flex items-center justify-between">
                      <BadgeEstado estado={orden.estado} />
                      {orden.para_llevar && orden.estado === "terminado" && (
                        <div className="flex items-center gap-2 rounded-full px-3 py-0.5 bg-amber-100">
                          <MdDeliveryDining className="text-2xl text-zinc-800" />
                          <span className="text-xs text-zinc-800 font-semibold">
                            Enviado
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Resumen de productos */}
                    <div className="text-zinc-800 flex flex-row items-center justify-between mt-4">
                      <span className="text-sm">
                        {getTotalProductosDeUnaOrden(orden.listaPedidos)}x
                        Productos
                      </span>
                      <span className="text-sm">
                        {formatoDinero(orden.total)}
                      </span>
                    </div>
                    {/* Detalle de total */}
                    {orden.para_llevar ? (
                      <div className="text-zinc-800 flex flex-row items-center justify-between mt-4">
                        <span className="text-sm">Valor de envío</span>
                        <span className="text-sm">
                          {formatoDinero(valorEnvio)}
                        </span>
                      </div>
                    ) : (
                      <div className="text-zinc-800 flex flex-row items-center justify-between mt-4">
                        <span className="text-sm">
                          Servicio voluntario (10%)
                        </span>
                        <span className="text-sm">
                          {formatoDinero(servicioVoluntario)}
                        </span>
                      </div>
                    )}

                    {/* Total */}
                    <div className="text-zinc-800 flex flex-row items-center justify-between mt-4">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-sm font-semibold">
                        {formatoDinero(precioTotal)}
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-300 mt-2" />
                    <div className="w-full flex items-center justify-between mt-2 text-sm">
                      <span className="text-zinc-800">
                        Orden: {formatoFechaCorta(orden.createdAt)},{" "}
                        {formatoHora(orden.createdAt)}
                      </span>
                      {/* Botón de detalle */}
                      <div
                        className="flex items-center justify-center cursor-pointer select-none text-red-500 hover:text-red-400 active:scale-95 duration-75"
                        onClick={() => {
                          if (orden.estado === "pendiente") {
                            setOpenModalHistorialPedidos(false);
                            setOpenModalPedido(true);
                          } else {
                            setDetallePedidoIndex(
                              detallePedidoIndex === index ? null : index
                            );
                          }
                        }}
                      >
                        <span className="text-xs">
                          {detallePedidoIndex === index ? "Cerrar" : "Detalle"}
                        </span>
                        {detallePedidoIndex === index ? (
                          <IoClose className="text-xl ml-1" />
                        ) : (
                          <MdKeyboardArrowRight className="text-xl ml-1" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Modal de detalle */}
                  <AnimatePresence>
                    {detallePedidoIndex === index && (
                      <motion.div
                        className="relative z-10 flex flex-col items-start self-center mt-2"
                        initial={{ opacity: 1, scale: 1, x: -350 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 1, scale: 1, x: -350 }}
                        transition={{ duration: 0.6 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col items-center gap-4 w-80 bg-white rounded-md p-4 shadow-lg text-zinc-800 overflow-y-auto">
                          <h3 className="text-xl font-semibold mt-4 text-left w-full px-2">
                            Productos
                          </h3>

                          {/* Lista de productos */}
                          {items.length > 0 ? (
                            items.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center justify-between w-full p-2 border-b-[1px] border-zinc-100"
                              >
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={item.image}
                                    alt={item.nombre}
                                    width={200}
                                    height={200}
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                  <div className="flex flex-row-reverse items-center gap-2">
                                    <p className="text-xs">{item.nombre}</p>
                                    <p className="text-xs text-zinc-800 bg-amber-400 rounded-full px-2 py-1">
                                      x{item.cantidad}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm">
                                  {formatoDinero(item.precio * item.cantidad)}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p>No hay productos en este pedido.</p>
                          )}

                          {/* Detalle de total */}
                          <div className="w-full px-2">
                            {orden.para_llevar ? (
                              <div className="text-zinc-800 flex flex-row items-center justify-between">
                                <span className="text-sm">Valor de envío</span>
                                <span className="text-sm">
                                  {formatoDinero(valorEnvio)}
                                </span>
                              </div>
                            ) : (
                              <div className="text-zinc-800 flex flex-row items-center justify-between">
                                <span className="text-sm">
                                  Servicio voluntario (10%)
                                </span>
                                <span className="text-sm">
                                  {formatoDinero(servicioVoluntario)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Total */}
                          <div className="w-full p-2 font-bold text-right">
                            Total: {formatoDinero(total + total * 0.19)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <HistorialVacio />
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalHistorialPedidos;
