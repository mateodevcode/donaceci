"use client";

import { useContext, useEffect, useState } from "react";
import QRScannerModal from "./QRScannerModal";
import { LuQrCode } from "react-icons/lu";
import { MainfudContext } from "@/context/MainfudContext";
import { toast } from "sonner";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function PaginaQR({ classname = "w-6 h-6", abrir = false }) {
  const { mesa, setMesa, usuario, setOpenModalQRMesaNombre, formDatos } =
    useContext(MainfudContext);
  const { actualizarCampoOrden } = useLocalStorage();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [resultadoQR, setResultadoQR] = useState(null);

  const manejarResultadoQR = (valor) => {
    setResultadoQR(valor);
    setModalAbierto(false);
  };

  useEffect(() => {
    if (abrir) {
      setModalAbierto(true);
    } else {
      setModalAbierto(false);
      setResultadoQR(null);
    }
  }, [abrir]);

  useEffect(() => {
    if (!resultadoQR) return;

    try {
      const url = new URL(resultadoQR);
      const params = new URLSearchParams(url.search);
      const mesaNumero = params.get("mesa");

      if (mesaNumero) {
        setMesa(mesaNumero);
      } else {
        console.warn("El QR no contiene el parámetro 'mesa'");
        setMesa(null);
      }
    } catch (error) {
      console.error("URL inválida:", error);
      setMesa(null);
    }
  }, [resultadoQR, setMesa]);

  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalAbierto]);

  return (
    <div className="flex items-center justify-center">
      <button className={`${classname}`} onClick={() => setModalAbierto(true)}>
        <LuQrCode />
      </button>

      {resultadoQR && (
        <div
          className="fixed inset-0 z-30 bg-opacity-60 flex justify-center items-center backdrop-blur-sm"
          onClick={() => {
            setModalAbierto(false);
            setResultadoQR(null);
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-md p-6 text-black border-[1px] border-gray-100 shadow-lg">
            <div className="text-2xl">
              {mesa ? (
                <div className="flex items-center gap-2 justify-center">
                  <strong>Mesa:</strong>{" "}
                  <span className="font-semibold text-2xl bg-amber-100 p-3 rounded-full w-10 h-10 flex items-center justify-center">
                    {mesa}
                  </span>
                </div>
              ) : (
                <>
                  {!resultadoQR.includes(
                    process.env.NEXT_PUBLIC_SCANNER_URL
                  ) && (
                    <span className="text-red-500 font-semibold bg-red-200 p-4 rounded-md text-xl">
                      QR Invalido
                    </span>
                  )}
                </>
              )}
            </div>
            {!resultadoQR.includes(process.env.NEXT_PUBLIC_SCANNER_URL) ? (
              <button
                className="bg-amber-400 text-white px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-300 mt-5 w-full font-semibold"
                onClick={() => setModalAbierto(true)}
              >
                Scannear QR
              </button>
            ) : (
              <button
                className="bg-amber-400 text-white px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer active:scale-95 hover:bg-amber-300 mt-5 w-full"
                onClick={() => {
                  if (!mesa) return;
                  actualizarCampoOrden("mesa", mesa);
                  toast.success("Mesa escaneada correctamente", {
                    position: "top-center",
                    style: {
                      backgroundColor: "#34d777",
                      color: "#000",
                      borderColor: "#000",
                    },
                  });
                  if (usuario || formDatos.name !== "") {
                    setOpenModalQRMesaNombre(false);
                  }
                }}
              >
                Confirmar
              </button>
            )}
          </div>
        </div>
      )}

      <QRScannerModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onResult={manejarResultadoQR}
      />
    </div>
  );
}
