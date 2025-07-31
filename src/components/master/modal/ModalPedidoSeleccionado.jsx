"use client";

import { MasterContext } from "@/context/MasterContext";
import useOrdenesMaster from "@/hooks/useOrdenesMaster";
import { calcularAdicionales } from "@/utils/calcularAdicionales";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoFecha, formatoHora } from "@/utils/formatoFecha";
import { formatoNombre } from "@/utils/formatoNombre";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaCheck, FaPhone } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdDeliveryDining, MdHome } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

const ModalPedidoSeleccionado = () => {
  const {
    openModalPedidoSeleccionado,
    setOpenModalPedidoSeleccionado,
    pedidoSeleccionadoMaster,
  } = useContext(MasterContext);
  const { handleCancelOrder, handleTerminarOrder } = useOrdenesMaster();
  const [servicioVoluntario, setServicioVoluntario] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [valorEnvio, setValorEnvio] = useState(0);

  useEffect(() => {
    if (openModalPedidoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalPedidoSeleccionado]);

  useEffect(() => {
    if (!pedidoSeleccionadoMaster) return;
    const { valorEnvio, servicioVoluntario, precioTotal } = calcularAdicionales(
      pedidoSeleccionadoMaster.createdAt,
      pedidoSeleccionadoMaster.para_llevar,
      pedidoSeleccionadoMaster.total
    );
    setValorEnvio(valorEnvio);
    setServicioVoluntario(servicioVoluntario);
    setPrecioTotal(precioTotal);
  }, [pedidoSeleccionadoMaster]);

  return (
    <AnimatePresence>
      {openModalPedidoSeleccionado && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalPedidoSeleccionado(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-96 cursor-pointer select-none relative"
            >
              {pedidoSeleccionadoMaster.comentarios && (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-400 absolute -top-12 right-12 z-10"
                  onClick={() => {
                    setOpenModalPedidoSeleccionado(false);
                  }}
                >
                  <RiFileList2Line className="text-lg text-white cursor-pointer" />
                </div>
              )}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white absolute -top-12 right-0 z-10"
                onClick={() => {
                  setOpenModalPedidoSeleccionado(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800 max-h-svh overflow-y-auto`}
              >
                <div className="flex items-center justify-between">
                  <div className="">
                    <h3 className="text-sm font-semibold">
                      Orden #<span>{pedidoSeleccionadoMaster.pedido}</span>
                    </h3>
                    <span className="text-xs text-zinc-500">
                      {formatoFecha(pedidoSeleccionadoMaster.createdAt)},{" "}
                      {formatoHora(pedidoSeleccionadoMaster.createdAt)}
                    </span>
                    {pedidoSeleccionadoMaster.para_llevar && (
                      <div className="text-xs text-zinc-500 flex flex-col gap-1">
                        <div className="text-xs text-zinc-700 flex items-center gap-2">
                          <BsPersonFill />{" "}
                          <span>
                            {formatoNombre(pedidoSeleccionadoMaster.nombre)}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-700 flex items-center gap-2">
                          <MdHome />
                          <span>{pedidoSeleccionadoMaster.direccion}</span>
                        </div>
                        <div className="text-xs text-zinc-700 flex items-center gap-2">
                          <FaPhone />{" "}
                          <span>
                            {formatoNombre(pedidoSeleccionadoMaster.telefono)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {!pedidoSeleccionadoMaster.para_llevar ? (
                    <span className="bg-amber-400 px-3 py-2 rounded-lg text-black font-semibold text-sm w-10 h-10 flex items-center justify-center">
                      {pedidoSeleccionadoMaster.mesa}
                    </span>
                  ) : (
                    <span className="bg-rose-400 px-3 py-2 rounded-lg text-white font-semibold text-sm">
                      <MdDeliveryDining className="text-xl" />
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  {pedidoSeleccionadoMaster.items.map((producto, index) => (
                    <div
                      key={index}
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
                          <span className="text-sm font-semibold">
                            <span className="text-xs bg-zinc-300 px-2 py-1 rounded-full">
                              X {producto.cantidad}
                            </span>{" "}
                          </span>
                          <span className="text-sm font-semibold text-zinc-800">
                            {formatoDinero(producto.precio * producto.cantidad)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                    <RiFileList2Line />
                    <span>Comentarios:</span>
                  </div>
                  <p className="text-xs text-zinc-500 break-words whitespace-pre-line">
                    {pedidoSeleccionadoMaster.comentarios
                      ? pedidoSeleccionadoMaster.comentarios
                      : "Sin comentarios"}
                  </p>
                </div>

                {pedidoSeleccionadoMaster.para_llevar && (
                  <div className="flex flex-col items-end justify-end mt-4">
                    <span className="text-xs text-zinc-500">
                      Valor de Envío:
                    </span>
                    <span className="text-sm font-semibold text-zinc-800">
                      {formatoDinero(valorEnvio)}
                    </span>
                  </div>
                )}
                {!pedidoSeleccionadoMaster.para_llevar && (
                  <div className="flex flex-col items-end justify-end mt-4">
                    <span className="text-xs text-zinc-500">
                      Servicio Voluntario (10%)
                    </span>
                    <span className="text-sm font-semibold text-zinc-800">
                      {formatoDinero(servicioVoluntario)}
                    </span>
                  </div>
                )}

                <div className="w-full flex items-center justify-between p-2 rounded-lg mt-4">
                  <div className="flex flex-col items-start justify-start">
                    <div className="text-xs text-zinc-500">
                      {pedidoSeleccionadoMaster.unidades}x{" "}
                      <span>
                        {Number(pedidoSeleccionadoMaster) > 0
                          ? "Productos"
                          : "Productos"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
                      <span>Total: </span>
                      <span className="">
                        {formatoDinero(
                          pedidoSeleccionadoMaster.total +
                            valorEnvio +
                            servicioVoluntario
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600/50"
                      onClick={() => {
                        handleCancelOrder(pedidoSeleccionadoMaster._id);
                        setOpenModalPedidoSeleccionado(false);
                      }}
                    >
                      <IoClose className="text-lg text-zinc-800 cursor-pointer" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600/50"
                      onClick={() => {
                        handleTerminarOrder(pedidoSeleccionadoMaster._id);
                        setOpenModalPedidoSeleccionado(false);
                      }}
                    >
                      <FaCheck className="text-lg text-zinc-800 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalPedidoSeleccionado;
