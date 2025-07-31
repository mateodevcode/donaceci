"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { PiPicnicTableBold } from "react-icons/pi";
import { RiSendPlaneFill } from "react-icons/ri";

export default function GenerarQR() {
  const [tableNumber, setTableNumber] = useState("");
  const [qrValue, setQrValue] = useState("");
  const svgRef = useRef(null);

  const generateQR = () => {
    if (tableNumber.trim()) {
      const baseUrl = process.env.NEXT_PUBLIC_SCANNER_URL;
      const url = `${baseUrl}/menu?mesa=${tableNumber}`;
      setQrValue(url);
    }
  };

  const downloadQR = () => {
    const svg = svgRef.current;

    if (!svg) return;

    // Convertimos SVG a imagen PNG
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = `qr-mesa-${tableNumber}.png`;
      link.href = pngFile;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="text-zinc-800 p-4 w-full">
      <h2 className="font-semibold">Generar Código QR para Mesa</h2>

      {!qrValue && (
        <div className="mt-4">
          <div className="w-full flex items-center gap-2">
            <div className="w-80 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center border-[1px] border-zinc-100">
              <button className="cursor-pointer select-none">
                <PiPicnicTableBold className="text-lg text-zinc-800" />
              </button>
              <input
                type="text"
                placeholder="Ej: 14"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-40 border-none outline-none text-zinc-800 ml-2 text-sm"
              />
            </div>
            <button
              className="p-3 bg-black hover:bg-black/80 rounded-md flex items-center justify-center shadow-lg cursor-pointer select-none ml-2 active:scale-95 duration-75"
              onClick={generateQR}
            >
              <RiSendPlaneFill className="text-lg text-white" />
            </button>
          </div>
        </div>
      )}

      {qrValue && (
        <div className="mt-[20px] bg-white p-4 rounded-lg">
          <QRCode
            value={qrValue}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            ref={svgRef}
          />
          {/* ref solo funciona en React.forwardRef, así que usamos una envoltura */}
          <svg
            ref={svgRef}
            style={{ display: "none" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <QRCode value={qrValue} size={200} />
          </svg>

          <div className="flex flex-col items-center justify-center mt-4 w-full">
            <button
              className="mt-4 py-3 px-5 bg-blue-500 rounded-md flex items-center justify-center shadow-lg cursor-pointer select-none text-white active:scale-95 duration-75"
              onClick={downloadQR}
            >
              Descargar
            </button>
            <button
              className="mt-4 py-3 px-5 bg-blue-500 rounded-md flex items-center justify-center shadow-lg cursor-pointer select-none text-white active:scale-95 duration-75"
              onClick={() => {
                setQrValue("");
                setTableNumber("");
              }}
            >
              Generar otro QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
