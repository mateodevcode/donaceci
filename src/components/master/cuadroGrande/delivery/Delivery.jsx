import {
  formatearFechaColombia,
  getFechaColombia,
} from "@/utils/getFechaColombia";
import React from "react";
import ListaOrdenes from "../ListaOrdenes";
import ListaPedidosGrid from "../ListaPedidosGrid";

const Delivery = ({ listaOrdenes, busqueda }) => {
  const hoy = getFechaColombia();
  const soloOrdenesParaLlevar = listaOrdenes.filter((orden) => {
    const fechaOrden = formatearFechaColombia(orden.createdAt);
    return (
      fechaOrden === hoy &&
      orden.para_llevar === true &&
      (orden.pedido.toLowerCase().includes(busqueda.toLowerCase()) ||
        orden.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });
  return (
    <div>
      <ListaOrdenes listaOrdenes={soloOrdenesParaLlevar} />
      <ListaPedidosGrid listaOrdenes={soloOrdenesParaLlevar} />
    </div>
  );
};

export default Delivery;
