// "use client";
// // hooks/useOrden.js

// import { MainfudContext } from "@/context/MainfudContext";
// import { useContext, useState } from "react";

// const useNotificacionPedido = () => {
//   const [notificaciones, setNotificaciones] = useState([]);
//   const notificacionSound = new Audio("/sonidos/add-cart.mp3");
//   const { itemsSeleccionados } = useContext(MainfudContext);

//   useEffect(() => {
//     if (notificaciones.length > 0) {
//       // Reproducir el sonido cada vez que se agregue una nueva notificación
//       notificacionSound.play().catch((err) => {
//         console.warn("No se pudo reproducir el sonido:", err);
//       });
//     }
//   }, [notificaciones]); // Se ejecuta cada vez que cambie el array

//   const agregarNotificacion = () => {
//     const nuevaNotificacion = `Notificación ${notificaciones.length + 1}`;
//     setNotificaciones((prev) => [...prev, nuevaNotificacion]);
//   };

//   return {
//     agregarNotificacion,
//   };
// };

// export default useNotificacionPedido;
