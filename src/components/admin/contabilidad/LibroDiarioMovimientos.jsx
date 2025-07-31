"use client";

import React, { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";
const LibroDiarioMovimientos = () => {
  const { asientos, movimientos } = useContext(AdminContext);
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">
        Libro Diario - Movimientos Contables
      </h2>
      {asientos.length === 0 && (
        <div>
          <p className="text-gray-500">
            No hay asientos contables registrados.
          </p>
        </div>
      )}
      {asientos.length > 0 && (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Detalle</th>
              <th className="border p-2">Código</th>
              <th className="border p-2">Cuenta</th>
              <th className="border p-2">Débito</th>
              <th className="border p-2">Crédito</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov, i) => (
              <tr key={i}>
                <td className="border p-2">{mov.fecha?.slice(0, 10)}</td>
                <td className="border p-2 italic">{mov.detalle}</td>
                <td className="border p-2">{mov.cuenta}</td>
                <td className="border p-2">{mov.nombre}</td>
                <td className="border p-2 text-right">
                  {mov.debe ? `$${mov.debe.toLocaleString()}` : ""}
                </td>
                <td className="border p-2 text-right">
                  {mov.haber ? `$${mov.haber.toLocaleString()}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibroDiarioMovimientos;
