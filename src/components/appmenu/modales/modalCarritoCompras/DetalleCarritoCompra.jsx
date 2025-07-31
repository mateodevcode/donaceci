"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useCarritoCompras from "@/hooks/useCarritoCompras";
import useOrden from "@/hooks/useOrden";
import useSonido from "@/hooks/useSonido";
import { formatoDinero } from "@/utils/formatoDinero";
import { ordenesSchema } from "@/validations/validations/ordenes";
import Image from "next/image";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { RiFileList2Line } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
import { toast } from "sonner";

const DetalleCarritoCompra = () => {
  const {
    itemsSeleccionados,
    setItemsSeleccionados,
    idOrdenCreadaPendiente,
    setOpenModalCarritoCompras,
    formDatos,
  } = useContext(MainfudContext);
  const {
    agregarNuevoPedido,
    agregarProducto,
    getCantidadEnCarrito,
    restarProducto,
    crearOrdenBaseDatos,
    actualizarOrdenBaseDatos,
    totalCarrito,
  } = useCarritoCompras();
  const { totalUnidades } = useOrden();
  const { sonidoAgregarAlCarrito, sonidoRemoverDelCarrito } = useSonido();

  const handleClickPedir = async () => {
    try {
      const data = {
        ...formDatos,
        listaPedidos: itemsSeleccionados,
        estado: "pendiente",
        para_llevar: formDatos.para_llevar,
        name: formDatos.name,
        direccion: formDatos.direccion,
        mesa: Number(formDatos.mesa), // <--- Importante convertir a number
        telefono: formDatos.telefono,
        comentarios: formDatos.comentarios,
      };

      const errores = ordenesSchema(data);

      if (errores.length > 0) {
        errores.forEach((e) => toast.error(e));
        return;
      }
      agregarNuevoPedido(itemsSeleccionados);
      setItemsSeleccionados([]);
      await crearOrdenBaseDatos(formDatos, itemsSeleccionados);
      toast.success("Se ha realizado el pedido", {
        duration: 1000,
        position: "top-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
      setOpenModalCarritoCompras(false);
    } catch (error) {
      toast.error("Error al realizar el pedido", {
        duration: 1000,
        position: "top-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
      console.error("Error al crear la orden:", error);
    }
  };

  const handleClickAnadirPedido = async () => {
    await actualizarOrdenBaseDatos(idOrdenCreadaPendiente, itemsSeleccionados);
    setItemsSeleccionados([]);
    toast.success("Pedido añadido correctamente", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    setOpenModalCarritoCompras(false);
  };

  return (
    <>
      <div className="w-full p-4 flex flex-col items-center gap-2">
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
                className="w-20 h-20 object-cover rounded-full"
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
        {/* Comentarios */}
        <div className="w-full p-4 bg-white rounded-md mb-4">
          <div className="">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
              <RiFileList2Line />
              <span>Comentarios:</span>
            </div>
            <p className="text-sm text-zinc-800 break-words whitespace-pre-line">
              {formDatos.comentarios
                ? formDatos.comentarios
                : "Sin comentarios"}
            </p>
          </div>
        </div>

        <div className="w-full p-2 bg-white rounded-md">
          <div className="flex items-center justify-between gap-1 text-sm text-black w-full p-2 border-b-[1px] border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {totalUnidades}{" "}
                {totalUnidades > 1
                  ? "productos seleccionados"
                  : "producto seleccionado"}
              </span>
            </div>
          </div>
          {/* Subtotal */}
          <div className="flex items-center justify-between gap-1 text-sm text-zinc-800 w-full p-2">
            <span className="text-sm text-zinc-800">Subtotal:</span>
            <span className="text-zinc-800 px-2 rounded-full font-bold">
              {formatoDinero(totalCarrito)}
            </span>
          </div>
        </div>
        {/* Boton solicitar pedido */}
        <div className="flex items-center justify-between gap-1 w-full mt-5">
          {idOrdenCreadaPendiente ? (
            <button
              className="w-full bg-amber-400 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-400/50"
              onClick={handleClickAnadirPedido}
            >
              Agregar al pedido
            </button>
          ) : (
            <button
              className="w-full bg-amber-400 text-white px-4 py-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-500"
              onClick={handleClickPedir}
            >
              Pedir
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DetalleCarritoCompra;
