import {
  formatearFechaColombia,
  getFechaColombia,
} from "@/utils/getFechaColombia";
import React from "react";
import ListaOrdenes from "../ListaOrdenes";
import ListaMesas from "../ListaMesas";

const Mesas = ({ listaOrdenes, busqueda }) => {
  const hoy = getFechaColombia();

  const soloOrdenesParaComerAqui = listaOrdenes.filter((orden) => {
    const fechaOrden = formatearFechaColombia(orden.createdAt);
    return (
      orden.para_llevar === false &&
      orden.estado === "pendiente" &&
      fechaOrden === hoy &&
      (orden.pedido.toLowerCase().includes(busqueda.toLowerCase()) ||
        orden.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });
  return (
    <div className="">
      <ListaOrdenes listaOrdenes={soloOrdenesParaComerAqui} />
      <ListaMesas listaOrdenes={soloOrdenesParaComerAqui} />
    </div>
  );
};

export default Mesas;
