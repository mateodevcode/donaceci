"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useCarritoCompras from "@/hooks/useCarritoCompras";
import useSonido from "@/hooks/useSonido";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoNombre } from "@/utils/formatoNombre";
import Image from "next/image";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

const CardProductoNuevoPedido = ({ productos }) => {
  const { sonidoAgregarAlCarrito } = useSonido();
  const { agregarProducto } = useCarritoCompras();

  const handleClickAñadirItem = (item) => {
    sonidoAgregarAlCarrito();
    toast.success("se ha agregado al carrito", {
      duration: 700,
      position: "bottom-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    agregarProducto(item);
  };

  return (
    <div className="w-11/12 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos?.map((item, index) => (
        <div
          key={index}
          className={`bg-white shadow-lg rounded-lg p-4 flex flex-col items-center select-none relative overflow-hidden ${
            item.disponibilidad
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50 pointer-events-none"
          }`}
        >
          {!item.disponibilidad && (
            <div className="absolute top-8 -left-10 w-[160px] bg-red-600 text-white text-sm font-semibold text-center rotate-[-45deg] shadow-md py-1">
              Agotado
            </div>
          )}

          <div className="bg-zinc-50 dark:bg-zinc-100 rounded-full w-28 h-28 p-3 flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.nombre}
              width={100}
              height={100}
              className="w-20 h-20 shadow-png rounded-full object-cover"
            />
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-black text-xs mt-2">
              {formatoNombre(item.nombre, 16)}
            </h3>
            <div className="flex items-center justify-between w-full mt-1">
              <span className="text-gray-600 text-xs font-semibold font-roboto">
                {formatoDinero(item.precio)}
              </span>
              <button
                className="flex items-center justify-center bg-amber-400 rounded-full w-7 h-7 cursor-pointer select-none active:scale-95 duration-75"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickAñadirItem(item);
                }}
              >
                <FiPlus className="text-xl text-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProductoNuevoPedido;
