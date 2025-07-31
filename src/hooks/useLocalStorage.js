"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { useContext } from "react";

const useLocalStorage = () => {
  const { setFormDatos, setFormDatosUsuario } = useContext(MainfudContext);

  // actualizar los datos del formulario de la orden
  const actualizarCampoOrden = (campo, valor) => {
    setFormDatos((prev) => {
      const formActualizado = {
        ...prev,
        [campo]: valor,
      };

      // Guardar en localStorage cada vez que cambie algo
      localStorage.setItem("ordenStorage", JSON.stringify(formActualizado));

      return formActualizado;
    });
  };

  // Actualizar los datos dek fromulario del usuario
  const actualizarCampoUsuario = (campo, valor) => {
    setFormDatosUsuario((prev) => {
      const formActualizado = {
        ...prev,
        [campo]: valor,
      };
      // Guardar en localStorage cada vez que cambie algo
      localStorage.setItem("usuarioStorage", JSON.stringify(formActualizado));
      return formActualizado;
    });
  };

  return {
    actualizarCampoOrden,
    actualizarCampoUsuario,
  };
};

export default useLocalStorage;
