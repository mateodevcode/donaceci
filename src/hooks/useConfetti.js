// hooks/useConfetti.js
import confetti from "canvas-confetti";

const useConfetti = () => {
  // Configuración de confetti
  const handleConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }, // Ajusta la posición inicial
    });
  };

  return {
    handleConfetti,
  };
};

export default useConfetti;
