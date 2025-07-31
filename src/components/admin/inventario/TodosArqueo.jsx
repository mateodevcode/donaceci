"use client";

import { AdminContext } from "@/context/AdminContext";
import { MainfudContext } from "@/context/MainfudContext";
import { formatoFecha, formatoHora } from "@/utils/formatoFecha";
import React, { useContext } from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { TbAlertTriangleFilled } from "react-icons/tb";

const TodosArqueo = () => {
  const { arqueosInventarios } = useContext(AdminContext);
  const { usuarios } = useContext(MainfudContext);

  return (
    <div>
      {arqueosInventarios.length > 0 ? (
        <div className="space-y-4">
          {arqueosInventarios.map((arqueo) => {
            const usuario = usuarios.find(
              (user) => user._id === arqueo.usuario
            );

            const detallesConCambios = arqueo.detalles.filter(
              (producto) =>
                producto.diferencia !== 0 || producto.observacion?.trim() !== ""
            );

            const estado =
              detallesConCambios.length > 0 ? (
                <div className="flex items-center gap-2">
                  <TbAlertTriangleFilled className="text-amber-400" />{" "}
                  <span className="text-amber-400">
                    Se detectaron diferencias y se realizaron ajustes
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <GoCheckCircleFill className="text-green-700 text-xl" />{" "}
                  <span className="text-green-700">Inventario en orden</span>
                </div>
              );

            return (
              <div
                key={arqueo._id}
                className={`px-8 py-6 border-[1px] rounded-md shadow-sm bg-white ${
                  detallesConCambios.length > 0
                    ? "border-amber-400"
                    : "border-green-700"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {formatoFecha(arqueo.createdAt)},{" "}
                  {formatoHora(arqueo.createdAt)}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Realizado por:{" "}
                  <span className="font-medium text-gray-900">
                    {usuario?.name || "Desconocido"}
                  </span>
                </p>
                <div className={`text-sm font-semibold mb-2`}>{estado}</div>

                <p className="text-sm text-gray-600 mb-2 font-semibold">
                  Total de productos evaluados:{" "}
                  <span className="text-white bg-blue-700 px-2 py-1 rounded-lg">
                    {arqueo.detalles.length}
                  </span>
                </p>

                {detallesConCambios.length > 0 && (
                  <ul className="pl-4 text-sm text-gray-700 space-y-1">
                    {detallesConCambios.map((producto) => (
                      <li
                        key={producto.productoId}
                        className="flex flex-col md:flex-row gap-2 items-start md:items-center text-red-600"
                      >
                        <div className="flex items-center gap-2">
                          <HiOutlineDocumentCheck />
                          <span className="font-medium">{producto.nombre}</span>
                          :{" "}
                          <span>
                            Stock en sistema: {producto.stockSistema},
                          </span>
                        </div>{" "}
                        <span>Stock Físico: {producto.stockFisico}</span>
                        {producto.observacion?.trim() !== "" && (
                          <>
                            <br />
                            <span className="text-gray-500 italic">
                              Observación: {producto.observacion}
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <span className="text-gray-600 text-sm">
          Aún no se han registrado arqueos de inventario.
        </span>
      )}
    </div>
  );
};

export default TodosArqueo;
