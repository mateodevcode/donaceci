"use client";
// hooks/useOrden.js

import { MainfudContext } from "@/context/MainfudContext";
import { useContext } from "react";

const useOrden = () => {
  const { itemsSeleccionados } = useContext(MainfudContext);

  // Calcular el total de unidades en el carrito
  const totalUnidades = itemsSeleccionados.reduce(
    (acc, pedido) => acc + pedido.cantidad,
    0
  );

  return {
    totalUnidades,
  };
};

export default useOrden;
