"use client";

import React from "react";
import ModalPedidoSeleccionado from "./modal/ModalPedidoSeleccionado";
import SidebarMaster from "./sidebar/SidebarMaster";
import CuadroGrande from "./cuadroGrande/CuadroGrande";
import ModalMenuMaster from "./modal/ModalMenuMaster";
import ModalCrearCategoria from "./modal/ModalCrearCategoria";
import Loading from "./loading/Loading";
import { useSession } from "next-auth/react";
import ModalCrearProducto from "./modal/ModalCrearProducto";
import ModalCrearIngrediente from "./modal/ModalCrearIngrediente";
import ModalSolicitarCuenta from "../appmenu/modales/ModalSolicitarCuenta";
import ModalNuevoPedido from "./modal/nuevoPedido/ModalNuevoPedido";
import ModalTicketImprimir from "./modal/ModalTicketImprimir";
import ModalEditarPedido from "./modal/editarPedido/ModalEditarPedido";

const Master = () => {
  const { status } = useSession();
  return (
    <div className="w-full h-svh bg-rose-100 flex p-4 gap-4">
      {/* Sidebar */}
      <div className="hidden md:block">
        <SidebarMaster />
      </div>

      {/* Cuadro grande (contenedor adaptable) */}
      <CuadroGrande />

      <ModalMenuMaster />
      <ModalPedidoSeleccionado />
      <ModalCrearCategoria />
      <ModalCrearProducto />
      <ModalCrearIngrediente />
      {status === "loading" && <Loading />}
      <ModalSolicitarCuenta />
      <ModalNuevoPedido />
      <ModalTicketImprimir />
      <ModalEditarPedido />

      {/* Estilos globales para el scrollbar */}

      <style jsx global>{`
        /* Scrollbar diferente para /menu */
        * {
          scrollbar-width: thin;
          scrollbar-color: #000 #ffe4e6;
        }

        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        *::-webkit-scrollbar-track {
          background: #483d03;
        }

        *::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #000;
        }
      `}</style>
    </div>
  );
};

export default Master;
