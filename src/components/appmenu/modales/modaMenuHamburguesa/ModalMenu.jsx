"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ModalMenu({ isOpen, onClose, children }) {
  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel del Drawer */}
      <div
        className={`absolute top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out w-[70vw] max-w-[500px] rounded-r-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Drawer</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
