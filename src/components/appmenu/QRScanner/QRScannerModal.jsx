"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { IoClose } from "react-icons/io5";

export default function QRScannerModal({ isOpen, onClose, onResult }) {
  const qrRegionId = "qr-reader";
  const scannerRef = useRef(null);
  const [mensaje, setMensaje] = useState("Iniciando escáner...");

  useEffect(() => {
    let isMounted = true;

    if (isOpen) {
      const qrScanner = new Html5Qrcode(qrRegionId);
      scannerRef.current = qrScanner;
      setMensaje("Buscando código QR...");

      qrScanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          async (decodedText) => {
            if (!decodedText || !isMounted) return;

            setMensaje("Código encontrado...");

            try {
              await qrScanner.stop();
              qrScanner.clear();
              scannerRef.current = null;
              limpiarDOM();
            } catch (err) {
              console.warn("Error al detener el escáner:", err);
            }

            onResult(decodedText);
          },
          () => {
            // Errores de escaneo silenciosos
          }
        )
        .catch((err) => {
          console.error("Error al iniciar el escáner:", err);
          setMensaje("No se pudo iniciar la cámara.");
        });
    }

    return () => {
      isMounted = false;

      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .then(() => {
            scannerRef.current = null;
            limpiarDOM();
          })
          .catch((err) => {
            console.warn("Error al limpiar el escáner:", err);
          });
      } else {
        limpiarDOM();
      }
    };
  }, [isOpen, onResult]);

  const limpiarDOM = () => {
    const contenedor = document.getElementById(qrRegionId);
    if (contenedor) {
      contenedor.innerHTML = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 bg-opacity-60 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-950 rounded-xl p-4 w-10/12 max-w-md relative border-[1px] border-zinc-200 dark:border-slate-600 shadow-lg text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-zinc-400 text-zinc-800 dark:text-zinc-300"
        >
          <IoClose className="w-6 h-6 cursor-pointer" />
        </button>
        <h2 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-300">
          Escanea tu mesa
        </h2>
        <div id={qrRegionId} className="w-full h-auto" />
        <p className="text-center pt-2 text-zinc-800 dark:text-zinc-300">
          {mensaje}
        </p>
      </div>
    </div>
  );
}
