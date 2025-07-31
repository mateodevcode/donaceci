"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { RiFileList3Line } from "react-icons/ri";

const PedidoVacio = () => {
  const router = useRouter();
  const { setOpenModalPedido } = useContext(MainfudContext);

  return (
    <div className="min-h-[40vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg border-0">
        <div className="p-8 text-center">
          {/* Icono principal */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-gray-100 to-orange-100 rounded-full flex items-center justify-center">
              <RiFileList3Line className="w-10 h-10 text-gray-600" />
            </div>
            {/* Iconos decorativos */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Contenido principal */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-200 mb-2">
            Sin pedido actual
          </h3>
          <p className="text-gray-600 mb-6 dark:text-zinc-300 text-sm px-4">
            Cuando realices tu primer pedido, aparecerá aquí su detalle
            completo.
          </p>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              className="bg-amber-400 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-300 mt-5 select-none text-sm"
              onClick={() => {
                setOpenModalPedido(false);
                router.push("/menu#menu");
              }}
            >
              Ver Menú Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoVacio;
