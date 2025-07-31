"use client";
import { AdminContext } from "@/context/AdminContext";
import { getFechaColombia } from "@/utils/getFechaColombia";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import FormAjuste from "./FormAjuste";

const CierreDiario = () => {
  const { asientos } = useContext(AdminContext);
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);
  const [ajustes, setAjustes] = useState([]);
  const [validarCuadre, setValidarCuadre] = useState(null);

  const calcularResumen = () => {
    let debe = 0;
    let haber = 0;

    // Recorres todos los asientos del día
    asientos.forEach((asiento) => {
      asiento.movimientos.forEach((mov) => {
        debe += mov.debe || 0;
        haber += mov.haber || 0;
      });
    });

    // Le sumas o restas los ajustes manuales
    ajustes.forEach((ajuste) => {
      debe += ajuste.debe || 0;
      haber += ajuste.haber || 0;
    });

    setTotalDebe(debe);
    setTotalHaber(haber);

    // Validar si cuadra
    if (debe === haber) {
      setValidarCuadre(true);
    } else {
      setValidarCuadre(false);
    }
  };

  useEffect(() => {
    if (validarCuadre !== null) {
      const cuadre = setTimeout(() => {
        setValidarCuadre(null);
      }, 5000);

      return () => clearTimeout(cuadre);
    }
  }, [validarCuadre, setTotalDebe, setTotalHaber, setAjustes]);

  return (
    <div className="w-full px-4 py-2">
      <h2 className="text-lg font-bold mb-2">Cierre Diario</h2>
      <div className="flex flex-row justify-between items-start mb-4 w-full gap-4">
        <div className="flex flex-col gap-4 mb-2 w-1/2 p-6">
          <span className="font-semibold text-lg">
            Cierre Caja - {getFechaColombia()}
          </span>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">
              Total Debe: ${totalDebe.toLocaleString()}
            </p>
            <p className="font-semibold">
              Total Haber: ${totalHaber.toLocaleString()}
            </p>
            <p>
              Faltante o sobrante:{" "}
              {totalDebe !== totalHaber
                ? `$${Math.abs(totalDebe - totalHaber).toLocaleString()}`
                : "No hay faltante ni sobrante"}
            </p>
            {validarCuadre !== null && (
              <>
                {validarCuadre ? (
                  <span className="text-green-700 bg-green-100 border border-green-500 font-semibold p-3 rounded-lg text-sm">
                    ¡Felicidades! Ya puedes cuadrar la caja.
                  </span>
                ) : (
                  <span className="text-red-700 bg-red-100 border border-red-500 font-semibold p-3 rounded-lg text-sm">
                    ¡Ups! Parece que la caja no cuadra. Por favor, revisa los
                    asientos y ajusta los movimientos.
                  </span>
                )}
              </>
            )}
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full transition-colors duration-200 active:scale-95"
            onClick={calcularResumen}
          >
            Calcular Resumen
          </button>

          <button
            disabled={totalDebe !== totalHaber}
            // onClick={cerrarCajaFinal}
            className={`${
              totalDebe === totalHaber ? "bg-green-600" : "bg-red-400"
            }  text-white px-4 py-2 rounded-full hover:bg-green-700 w-full transition-colors duration-200 active:scale-95`}
          >
            Cuadrar Caja
          </button>
        </div>
        <FormAjuste
          onAgregarAjuste={(ajuste) => setAjustes((prev) => [...prev, ajuste])}
        />
      </div>
    </div>
  );
};

export default CierreDiario;
