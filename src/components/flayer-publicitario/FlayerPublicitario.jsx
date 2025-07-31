"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const FlayerPublicitario = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Función para verificar si hoy es martes
    const esMartes = () => {
      const diaHoy = new Date().getDay(); // 0 = domingo, 1 = lunes, ..., 2 = martes
      return diaHoy === 2;
    };

    // Verificar si ya fue cerrado antes
    const flayerCerrado = localStorage.getItem("flayerPublicitarioClosed");

    // Verificar si ya fue mostrado en esta sesión (opcional)
    const flayerMostrado = localStorage.getItem("flayerPublicitarioShown");

    // Mostrar si:
    // 1. Es martes, o
    // 2. No se ha mostrado nunca y no fue cerrado
    // if (esMartes() || (!flayerMostrado && !flayerCerrado)) {
    if (!flayerMostrado && !flayerCerrado) {
      setIsVisible(true);
      localStorage.setItem("flayerPublicitarioShown", "true");
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("flayerPublicitarioClosed", "true"); // Guarda que fue cerrado
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <Image
          src="/flayer-publicitario/flayer.png"
          alt="Flayer Publicitario"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
        <div
          className="absolute top-8 right-8 cursor-pointer text-black bg-black/20 rounded-full p-2 hover:bg-black/30 transition-colors"
          onClick={handleClose}
        >
          <IoClose className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default FlayerPublicitario;
