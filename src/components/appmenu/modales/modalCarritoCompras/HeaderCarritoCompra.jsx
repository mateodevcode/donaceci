"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useSonido from "@/hooks/useSonido";
import React, { useContext } from "react";
import { BsCartXFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import { toast } from "sonner";

const HeaderCarritoCompra = () => {
  const {
    setOpenModalCarritoCompras,
    setItemsSeleccionados,
    openModalComentarios,
    setOpenModalComentarios,
  } = useContext(MainfudContext);
  const { sonidoRemoverDelCarrito } = useSonido();

  return (
    <div className="flex items-center justify-between px-4 py-4 w-full mb-4">
      <div className="w-24">
        <button
          onClick={() => setOpenModalCarritoCompras(false)}
          className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
        >
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
      </div>
      <h3 className="text-xl font-semibold text-zinc-800 select-none">
        Mi Carrito
      </h3>
      <div className="flex items-center justify-end gap-2 flex-row w-24">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-400 active:scale-95 transition-transform duration-200 hover:bg-amber-300"
          onClick={() => setOpenModalComentarios(!openModalComentarios)}
        >
          <RiFileList2Line className="text-lg text-white cursor-pointer" />
        </button>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white active:scale-95 transition-transform duration-200 hover:bg-zinc-100"
          onClick={() => {
            setOpenModalCarritoCompras(false);
            sonidoRemoverDelCarrito();
            setItemsSeleccionados([]);
            toast.success("Carrito vaciado correctamente", {
              duration: 900,
              position: "top-center",
              style: {
                backgroundColor: "#34d777",
                color: "#000",
                borderColor: "#000",
              },
            });
          }}
        >
          <BsCartXFill className="text-lg text-zinc-800 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default HeaderCarritoCompra;
