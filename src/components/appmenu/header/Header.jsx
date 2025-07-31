"use client";

import React, { useContext } from "react";
import { BsList } from "react-icons/bs";
import PaginaQR from "../QRScanner/PaginaQR";
import { MdShoppingCart } from "react-icons/md";
import { AnimateNumber } from "../animateNumber/AnimateNumber";
import { MainfudContext } from "@/context/MainfudContext";
import useOrden from "@/hooks/useOrden";

const Header = () => {
  const {
    openModalMenuHamburguesa,
    setOpenModalMenuHamburguesa,
    openModalCarritoCompras,
    setOpenModalCarritoCompras,
    itemsSeleccionados,
  } = useContext(MainfudContext);
  const { totalUnidades } = useOrden();

  return (
    <div className="w-11/12 flex items-center justify-between z-10 py-4 mt-4 ">
      <div
        className="w-24 flex items-center justify-start cursor-pointer select-none active:scale-95 duration-75"
        onClick={() => setOpenModalMenuHamburguesa(!openModalMenuHamburguesa)}
      >
        <BsList className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-300 cursor-pointer select-none hover:text-zinc-600" />
      </div>

      {/* <div className="flex items-center gap-2 w-24 justify-end">
        <PaginaQR classname="bg-white hover:bg-white/50 w-9 h-9 flex items-center justify-center rounded-md shadow-lg cursor-pointer select-none active:scale-95 duration-75 text-xl text-zinc-800" />
        <div
          className={`w-10 h-10   rounded-full flex items-center justify-center shadow-lg cursor-pointer select-none active:scale-95 duration-75 relative ${
            itemsSeleccionados.length > 0
              ? "animate-bounce bg-amber-400 text-white hover:bg-amber-400/50"
              : "bg-white text-black hover:bg-white/50"
          }`}
          onClick={() => setOpenModalCarritoCompras(!openModalCarritoCompras)}
        >
          <MdShoppingCart className="text-lg" />
          <div className="cursor-pointer transition-colors active:scale-95 duration-75 flex items-center gap-1 select-none absolute -bottom-3 -right-2">
            <AnimateNumber value={totalUnidades} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
