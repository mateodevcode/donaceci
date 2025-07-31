"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import useCarritoCompras from "@/hooks/useCarritoCompras";
import useOrden from "@/hooks/useOrden";
import useSonido from "@/hooks/useSonido";
import { calcularAdicionales } from "@/utils/calcularAdicionales";
import { formatoDinero } from "@/utils/formatoDinero";
import { normalizarOrden } from "@/utils/normalizarOrden";
import { normalizarOrdenes } from "@/utils/normalizarOrdenes";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TiMinus } from "react-icons/ti";

const DetalleNuevoPedido = () => {
  const { setOpenModalCarritoCompras, itemsSeleccionados } =
    useContext(MainfudContext);
  const { pedidoAEditar, setPedidoAEditar } = useContext(MainfudContext);
  const { agregarProducto, getCantidadEnCarrito, restarProducto } =
    useCarritoCompras();
  const { sonidoAgregarAlCarrito, sonidoRemoverDelCarrito } = useSonido();
  const [servicioVoluntario, setServicioVoluntario] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [valorEnvio, setValorEnvio] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const itemsSelecc = normalizarOrden(pedidoAEditar || []);

  useEffect(() => {
    if (!pedidoAEditar) return;

    const { valorEnvio, servicioVoluntario, precioTotal, subTotal } =
      calcularAdicionales(
        pedidoAEditar.createdAt,
        pedidoAEditar.para_llevar,
        pedidoAEditar.total
      );
    setSubTotal(subTotal);
    setValorEnvio(valorEnvio);
    setServicioVoluntario(servicioVoluntario);
    setPrecioTotal(precioTotal);
  }, [pedidoAEditar]);

  const agruparProductos = (productos) => {
    const mapa = new Map();

    productos.forEach((producto) => {
      if (mapa.has(producto._id)) {
        // Si ya existe, aumentamos la cantidad
        mapa.get(producto._id).cantidad += producto.cantidad;
      } else {
        // Si no existe, lo agregamos
        mapa.set(producto._id, { ...producto });
      }
    });

    // Devolvemos un array con los productos agrupados
    return Array.from(mapa.values());
  };

  const itemsAgrupados = agruparProductos(itemsSelecc.items || []);

  return (
    <>
      <div className="w-full p-4 flex flex-col items-center gap-2">
        {itemsAgrupados.map((pedido, index) => (
          <div
            key={index}
            onClick={() => {
              setOpenModalCarritoCompras(true);
            }}
            className="flex items-center justify-between gap-2 text-sm text-zinc-800 w-full px-2 py-4 select-none transition-colors duration-200 bg-white rounded-md"
          >
            <div className="flex items-center gap-2 w-80">
              <Image
                src={pedido.image}
                alt={pedido.nombre}
                width={250}
                height={250}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div className="text-xs bg-amber-400 text-black p-2 flex items-center gap-1 -ml-8 -mb-8 rounded-full">
                <span>x</span>{" "}
                <span className="font-semibold">{pedido.cantidad}</span>
              </div>
              <div className="flex flex-col items-start justify-start space-y-2 w-full">
                <span className="text-sm">{pedido.nombre}</span>
                <span className="text-black px-2 rounded-full font-semibold">
                  {formatoDinero(pedido.precio)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {itemsSeleccionados.map((pedido, index) => (
          <div
            key={index}
            onClick={() => {
              setOpenModalCarritoCompras(true);
            }}
            className="flex items-center justify-between gap-2 text-sm text-zinc-800 w-full px-2 py-4 select-none transition-colors duration-200 bg-white rounded-md"
          >
            <div className="flex items-center gap-2 w-80">
              <Image
                src={pedido.image}
                alt={pedido.nombre}
                width={250}
                height={250}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div className="text-xs bg-amber-400 text-black p-2 flex items-center gap-1 -ml-8 -mb-8 rounded-full">
                <span>x</span>{" "}
                <span className="font-semibold">{pedido.cantidad}</span>
              </div>
              <div className="flex flex-col items-start justify-start space-y-2 w-full">
                <span className="text-sm">{pedido.nombre}</span>
                <span className="text-black px-2 rounded-full font-semibold">
                  {formatoDinero(pedido.precio)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-6 h-6 bg-zinc-200 hover:bg-zinc-300 p-1 rounded-full flex items-center justify-center cursor-pointer select-none active:scale-95 duration-75"
                onClick={() => {
                  sonidoRemoverDelCarrito();
                  restarProducto(pedido._id);
                }}
              >
                <TiMinus className="text-xl text-black" />
              </button>
              <span className="font-semibold font-roboto">
                {getCantidadEnCarrito(pedido._id)}
              </span>
              <button
                className="w-6 h-6 bg-amber-400 hover:bg-amber-500 p-1 rounded-full flex items-center justify-center cursor-pointer select-none active:scale-95 duration-75"
                onClick={() => {
                  sonidoAgregarAlCarrito();
                  agregarProducto(pedido);
                }}
              >
                <FiPlus className="text-xl text-black" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 w-full">
        <div className="w-full p-2 bg-white rounded-md">
          <div className="flex items-center justify-between gap-1 text-sm text-black w-full p-2 border-b-[1px] border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {itemsSelecc?.unidades}{" "}
                {itemsSelecc?.unidades > 1
                  ? "productos seleccionados"
                  : "producto seleccionado"}
              </span>
            </div>
          </div>
          {/* Subtotal */}
          <div className="flex items-center justify-between gap-1 text-sm text-zinc-800 w-full p-2">
            <span className="text-sm text-zinc-800">Subtotal:</span>
            <span className="text-zinc-800 px-2 rounded-full font-bold">
              {formatoDinero(pedidoAEditar?.total || 0)}
            </span>
          </div>

          {pedidoAEditar?.para_llevar ? (
            <div className="flex items-center justify-between gap-1 text-sm text-zinc-800 w-full p-2">
              <span className="text-sm text-zinc-800">Valor de envío</span>
              <span className="text-zinc-800 px-2 rounded-full font-bold">
                {formatoDinero(valorEnvio)}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-1 text-sm text-zinc-800 w-full p-2">
              <span className="text-sm text-zinc-800">Servicio voluntario</span>
              <span className="text-zinc-800 px-2 rounded-full font-bold">
                {formatoDinero(servicioVoluntario)}
              </span>
            </div>
          )}
          {/* Total */}
          <div className="w-full px-5 mt-4 text-right flex justify-end items-center">
            <span className="text-sm text-rose-500 mt-2 font-semibold">
              <span className="text-black">Total a pagar:</span>{" "}
              <span className="font-semibold text-base">
                {" "}
                {formatoDinero(precioTotal)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleNuevoPedido;
