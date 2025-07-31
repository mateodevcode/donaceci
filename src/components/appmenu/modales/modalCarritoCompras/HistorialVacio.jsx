"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { Clock, Receipt, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const HistorialVacio = () => {
  const router = useRouter();
  const { setOpenModalHistorialPedidos } = useContext(MainfudContext);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg border-0">
        <div className="p-8 text-center">
          {/* Icono principal */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-gray-100 to-orange-100 rounded-full flex items-center justify-center">
              <Receipt className="w-10 h-10 text-gray-600" />
            </div>
            {/* Iconos decorativos */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Contenido principal */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Sin historial de pedidos
          </h3>
          <p className="text-gray-600 mb-6 px-4 text-sm">
            Cuando realices tu primer pedido, aparecerá aquí tu historial
            completo.
          </p>

          {/* Beneficios del historial */}
          <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-lg p-4 mb-6 flex flex-col items-center">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center justify-center">
              <Star className="w-4 h-4 text-orange-500 mr-2" />
              ¿Por qué es útil el historial?
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Reordena tus platillos favoritos fácilmente</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Rastrea el estado de tus pedidos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Accede a tus recibos digitales</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              className="bg-amber-400 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-300 mt-5 select-none text-sm"
              onClick={() => {
                setOpenModalHistorialPedidos(false);
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

export default HistorialVacio;
