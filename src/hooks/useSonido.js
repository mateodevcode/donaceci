// hooks/useSonido.js
import { MainfudContext } from "@/context/MainfudContext";
import { useContext } from "react";

const useSonido = () => {
  const { usuarioStorage } = useContext(MainfudContext);

  // Manejar sonido
  let audioInstance = null;
  const sonidoAgregarAlCarrito = () => {
    if (!usuarioStorage?.activar_sonido) return;

    if (audioInstance) {
      audioInstance.currentTime = 0; // Reinicia si ya se está reproduciendo
    } else {
      audioInstance = new Audio("/sonidos/add-cart.mp3");
    }

    audioInstance.play().catch((error) => {
      console.warn("No se pudo reproducir el sonido:", error);
    });
  };

  const sonidoRemoverDelCarrito = () => {
    if (!usuarioStorage?.activar_sonido) return;

    if (audioInstance) {
      audioInstance.currentTime = 0; // Reinicia si ya se está reproduciendo
    } else {
      audioInstance = new Audio("/sonidos/remove-cart.mp3");
    }

    audioInstance.play().catch((error) => {
      console.warn("No se pudo reproducir el sonido:", error);
    });
  };

  return {
    sonidoAgregarAlCarrito,
    sonidoRemoverDelCarrito,
  };
};

export default useSonido;
