import React from "react";
import ListaPedidosGrid from "../ListaPedidosGrid";
import {
  formatearFechaColombia,
  getFechaColombia,
} from "@/utils/getFechaColombia";
import ListaOrdenes from "../ListaOrdenes";

const MasterOrdenes = ({ listaOrdenes, busqueda }) => {
  const hoy = getFechaColombia();
  const listaFiltrada = listaOrdenes.filter((orden) => {
    const fechaOrden = formatearFechaColombia(orden.createdAt);
    return (
      fechaOrden === hoy &&
      (orden.pedido.toLowerCase().includes(busqueda.toLowerCase()) ||
        orden.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  return (
    <div>
      <ListaOrdenes listaOrdenes={listaFiltrada} />
      <ListaPedidosGrid listaOrdenes={listaFiltrada} />
    </div>
  );
};

export default MasterOrdenes;
