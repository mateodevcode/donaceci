"use client";

import { MainfudContext } from "@/context/MainfudContext";
import React, { useContext, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MasterContext } from "@/context/MasterContext";
import { VscListSelection } from "react-icons/vsc";
import { rutas_master } from "@/data/rutas_master";
import { normalizarOrdenes } from "@/utils/normalizarOrdenes";
import OrdenarCategorias from "./reordenarCategoria/OrdenarCategorias";
import { RiFunctionAddLine } from "react-icons/ri";
import { getId } from "@qrvey/id-generator";
import MasterOrdenes from "./masterOrdenes/MasterOrdenes";
import OrdenesVivas from "./ordenesVivas/OrdenesVivas";
import Delivery from "./delivery/Delivery";
import Mesas from "./mesas/Mesas";
import Disponibilidad from "./disponibilidad/Disponibilidad";
import Productos from "./productos/Productos";

const CuadroGrande = () => {
  const customAlphabet = "0123456789ABCDEF";
  const customLength = 8;
  const [busqueda, setBusqueda] = useState("");
  const { ordenes, setFormDatos } = useContext(MainfudContext);
  const {
    rutaSelect,
    openModalMenuMaster,
    setOpenModalMenuMaster,
    setOpenModalNuevoPedido,
  } = useContext(MasterContext);

  const listaOrdenes = normalizarOrdenes(ordenes);

  return (
    <div className="flex-1 h-full p-4 flex flex-col overflow-hidden">
      {/* Barra de búsqueda */}

      <div className="w-full flex items-center justify-between">
        <div className="mb-4 flex items-center gap-4">
          <button
            className="py-3 px-4 rounded-full bg-white shadow-md hover:bg-zinc-100 transition-colors flex md:hidden cursor-pointer select-none active:scale-95 duration-150"
            onClick={() => setOpenModalMenuMaster(!openModalMenuMaster)}
          >
            <VscListSelection className="text-xl" />
          </button>
          {rutaSelect === "inicio" && (
            <div className="max-w-md bg-white rounded-full shadow-lg px-4 py-3 flex items-center border border-zinc-100">
              <button className="cursor-pointer select-none">
                <BiSearchAlt className="text-lg text-zinc-800" />
              </button>
              <input
                type="text"
                placeholder="Pedido # 3451245"
                onChange={(e) => setBusqueda(e.target.value)}
                value={busqueda}
                className="w-full border-none outline-none text-zinc-800 ml-2 text-sm"
              />
            </div>
          )}
          {rutaSelect === "ordenes" && (
            <div className="max-w-md bg-white rounded-full shadow-lg px-4 py-3 flex items-center border border-zinc-100">
              <button className="cursor-pointer select-none">
                <BiSearchAlt className="text-lg text-zinc-800" />
              </button>
              <input
                type="text"
                placeholder="Pedido # 3451245"
                onChange={(e) => setBusqueda(e.target.value)}
                value={busqueda}
                className="w-full border-none outline-none text-zinc-800 ml-2 text-sm"
              />
            </div>
          )}

          {rutaSelect === "delivery" && (
            <div className="max-w-md bg-white rounded-full shadow-lg px-4 py-3 flex items-center border border-zinc-100">
              <button className="cursor-pointer select-none">
                <BiSearchAlt className="text-lg text-zinc-800" />
              </button>
              <input
                type="text"
                placeholder="Pedido # 3451245"
                onChange={(e) => setBusqueda(e.target.value)}
                value={busqueda}
                className="w-full border-none outline-none text-zinc-800 ml-2 text-sm"
              />
            </div>
          )}
        </div>

        <button
          className="flex items-center gap-2 mb-4 bg-white rounded-full shadow-md px-4 py-3 hover:bg-zinc-100 transition-colors cursor-pointer select-none active:scale-95 duration-150"
          onClick={() => {
            setOpenModalNuevoPedido(true);
            setFormDatos((prev) => ({
              ...prev,
              name: "Invitado",
              direccion: "",
              mesa: "",
              telefono: "",
              para_llevar: false,
              pedido: getId(customAlphabet, customLength),
              comentarios: "",
              listaPedidos: [],
              metodo_de_pago: "efectivo",
            }));
          }}
        >
          <RiFunctionAddLine className="text-xl" />
          <span className="font-semibold hidden md:flex">Nuevo pedido</span>
        </button>
      </div>

      {/* Lista de órdenes */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {rutas_master.map((ruta, index) => {
          const titulo = rutaSelect === ruta.ruta ? ruta.nombre : "";

          return (
            <h2 className="text-2xl font-semibold mb-2" key={index}>
              {titulo}
            </h2>
          );
        })}

        {rutaSelect === "inicio" && (
          <MasterOrdenes listaOrdenes={listaOrdenes} busqueda={busqueda} />
        )}

        {rutaSelect === "ordenes" && (
          <OrdenesVivas listaOrdenes={listaOrdenes} busqueda={busqueda} />
        )}

        {rutaSelect === "delivery" && (
          <Delivery listaOrdenes={listaOrdenes} busqueda={busqueda} />
        )}

        {rutaSelect === "mesas" && (
          <Mesas listaOrdenes={listaOrdenes} busqueda={busqueda} />
        )}

        {rutaSelect === "disponibilidad" && <Disponibilidad />}

        {rutaSelect === "productos" && (
          <Productos listaOrdenes={listaOrdenes} busqueda={busqueda} />
        )}

        {rutaSelect === "reordenar_categorias" && <OrdenarCategorias />}
      </div>
    </div>
  );
};

export default CuadroGrande;
