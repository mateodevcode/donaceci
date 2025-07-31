"use client";

import { MainfudContext } from "@/context/MainfudContext";
import Image from "next/image";
import React, { useContext } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const CarritoVacio = () => {
  const { setOpenModalCarritoCompras } = useContext(MainfudContext);

  return (
    <div
      className="flex flex-col items-center gap-1 text-sm text-zinc-800 w-full p-4 h-[450px]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 w-full">
        <button
          onClick={() => setOpenModalCarritoCompras(false)}
          className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
        >
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
        <h3 className="text-xl font-semibold text-zinc-800 select-none">
          Mi Carrito
        </h3>
        <button
          className="text-white select-none"
          onClick={() => alert("Vaciar carrito")}
        >
          <RiDeleteBinLine className="text-xl" />
        </button>
      </div>
      {/* Menu */}
      <div className="flex flex-col items-center justify-center gap-2 text-center p-2">
        <Image
          src="/carrito-compras/cart-empty.png"
          alt="Carrito Vacio"
          width={800}
          height={800}
          className="w-52 h-52 object-contain"
        />
      </div>
      <span className="text-center text-zinc-600 leading-5 mb-2 w-7/12">
        Todavia no agregaste productos al carrito
      </span>
    </div>
  );
};

export default CarritoVacio;
