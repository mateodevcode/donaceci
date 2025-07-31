"use client";
// hooks/useCarritoCompras.js

import { MainfudContext } from "@/context/MainfudContext";
import { useContext } from "react";
import { getId } from "@qrvey/id-generator";
import { actualizar_orden, crear_orden } from "@/lib/socket/orden_socket";
import useConfetti from "./useConfetti";
import { formatearDescripcion } from "@/utils/formatearDescripcion";
import { MasterContext } from "@/context/MasterContext";

const useCarritoCompras = () => {
  const {
    idOrdenCreadaPendiente,
    ordenPendiente,
    setFormDatos,
    setItemsSeleccionados,
    itemsSeleccionados,
    setOrdenPendiente,
    setOpenModalConfirmacionPedido,
    pedidoAEditar,
    setPedidoAEditar,
  } = useContext(MainfudContext);
  const { handleConfetti } = useConfetti();
  const customAlphabet = "0123456789ABCDEF";
  const customLength = 8;

  // Funcion para agregar un nuevo pedido a la orden
  const agregarNuevoPedido = (itemsSeleccionados) => {
    if (!itemsSeleccionados.length) return;

    const nuevoTotal = itemsSeleccionados.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const nuevoPedido = {
      id: getId(customAlphabet, customLength),
      pedido: `Pedido N° ${
        idOrdenCreadaPendiente
          ? (ordenPendiente?.listaPedidos?.length || 0) + 1
          : 1
      }`,
      items: itemsSeleccionados,
      total: nuevoTotal,
      estado: "pendiente",
    };
    setFormDatos((prev) => {
      const listaActualizada = [...(prev?.listaPedidos || []), nuevoPedido];
      const totalGeneral = Number(prev.total || 0) + Number(nuevoTotal);

      const formActualizado = {
        ...prev,
        listaPedidos: listaActualizada,
        total: totalGeneral,
      };

      localStorage.setItem("ordenStorage", JSON.stringify(formActualizado));
      return formActualizado;
    });
  };

  const agregarNuevoPedidoMaster = (id_orden_pendiente, itemsSeleccionados) => {
    if (!itemsSeleccionados.length) return;

    const nuevoTotal = itemsSeleccionados.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const nuevoPedido = {
      id: getId(customAlphabet, customLength),
      pedido: `Pedido N° ${
        id_orden_pendiente ? (pedidoAEditar?.listaPedidos?.length || 0) + 1 : 1
      }`,
      items: itemsSeleccionados,
      total: nuevoTotal,
      estado: "pendiente",
    };
    setFormDatos((prev) => {
      const listaActualizada = [...(prev?.listaPedidos || []), nuevoPedido];
      const totalGeneral = Number(prev.total || 0) + Number(nuevoTotal);

      // const formActualizado = {
      //   ...prev,
      //   listaPedidos: listaActualizada,
      //   total: totalGeneral,
      // };
      setPedidoAEditar((prev) => ({
        ...prev,
        listaPedidos: listaActualizada,
        total: totalGeneral,
      }));
      // localStorage.setItem("ordenStorage", JSON.stringify(formActualizado));
      // return formActualizado;
      return;
    });
  };

  // Función para agregar un producto al carrito
  const agregarProducto = (producto, cantidad = 1) => {
    setItemsSeleccionados((prev) => {
      const existe = prev.find((item) => item._id === producto._id);

      if (existe) {
        return prev.map((item) =>
          item._id === producto._id
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
              }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  // Obtener la cantidad de cada producto en el carrito
  const getCantidadEnCarrito = (productoId) => {
    const item = itemsSeleccionados.find((item) => item._id === productoId);
    return item ? item.cantidad : 0;
  };

  // Función para eliminar un producto del carrito (pedido temporal)
  const restarProducto = (id) => {
    setItemsSeleccionados(
      (prev) =>
        prev
          .map((item) =>
            item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
          )
          .filter((item) => item.cantidad > 0) // Elimina los que tengan cantidad 0
    );
  };

  // Función para crear una orden en la base de datos
  const crearOrdenBaseDatos = async (ordenCrear, itemsSeleccionados) => {
    const nuevoTotall = itemsSeleccionados.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const nuevoPedido = {
      id: getId(customAlphabet, customLength),
      pedido: `Pedido N° ${
        idOrdenCreadaPendiente
          ? (ordenPendiente?.listaPedidos?.length || 0) + 1
          : 1
      }`,
      items: itemsSeleccionados,
      total: nuevoTotall,
      estado: "pendiente",
    };
    const comentariosFormateados = formatearDescripcion(ordenCrear.comentarios);
    crear_orden(
      ordenCrear.pedido,
      ordenCrear.name,
      ordenCrear.direccion,
      ordenCrear.mesa,
      nuevoTotall,
      "pendiente",
      [nuevoPedido],
      ordenCrear.para_llevar,
      ordenCrear.id_usuario,
      ordenCrear.telefono,
      comentariosFormateados,
      ordenCrear.metodo_de_pago
    );
    setOpenModalConfirmacionPedido(true); // Abrimos el modal de confirmación de pedido
    handleConfetti(); // Ejecutamos el confetti
  };

  // Función para actualizar la orden en la base de datos
  const actualizarOrdenBaseDatos = async (
    id_orden_pendiente,
    itemsSeleccionados
  ) => {
    const totalActual = itemsSeleccionados.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const nuevoPedido = {
      id: getId(customAlphabet, customLength),
      pedido: `Pedido N° ${
        idOrdenCreadaPendiente
          ? (ordenPendiente?.listaPedidos?.length || 0) + 1
          : 1
      }`,
      items: itemsSeleccionados,
      total: totalActual,
      estado: "pendiente",
    };

    try {
      // Copiamos la lista actual de pedidos
      const listaordenes = [...ordenPendiente.listaPedidos];

      // Calculamos el nuevo total sumando al total anterior
      const nuevoTotal = Number(ordenPendiente.total) + Number(totalActual);

      actualizar_orden(id_orden_pendiente, {
        listaPedidos: [...listaordenes, nuevoPedido],
        total: nuevoTotal,
      });
      setOrdenPendiente((prev) => ({
        ...prev,
        listaPedidos: [...prev.listaPedidos, nuevoPedido],
        total: nuevoTotal,
      }));
    } catch (error) {
      console.error("🚨 Error al actualizar la orden:", error);
    }
  };

  const actualizarOrdenBaseDatosMaster = async (
    id_orden_pendiente,
    itemsSeleccionados
  ) => {
    const totalActual = itemsSeleccionados.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const nuevoPedido = {
      id: getId(customAlphabet, customLength),
      pedido: `Pedido N° ${
        pedidoAEditar ? (pedidoAEditar?.listaPedidos?.length || 0) + 1 : 1
      }`,
      items: itemsSeleccionados,
      total: totalActual,
      estado: "pendiente",
    };

    try {
      // Copiamos la lista actual de pedidos
      const listaordenes = [...pedidoAEditar.listaPedidos];

      // Calculamos el nuevo total sumando al total anterior
      const nuevoTotal = Number(pedidoAEditar.total) + Number(totalActual);

      actualizar_orden(id_orden_pendiente, {
        listaPedidos: [...listaordenes, nuevoPedido],
        total: nuevoTotal,
      });
      setOrdenPendiente((prev) => ({
        ...prev,
        listaPedidos: [...prev.listaPedidos, nuevoPedido],
        total: nuevoTotal,
      }));
    } catch (error) {
      console.error("🚨 Error al actualizar la orden:", error);
    }
  };

  // Calcular el total del carrito
  const totalCarrito = itemsSeleccionados.reduce((total, pedido) => {
    return total + pedido.precio * pedido.cantidad;
  }, 0);

  return {
    agregarProducto,
    agregarNuevoPedido,
    getCantidadEnCarrito,
    restarProducto,
    crearOrdenBaseDatos,
    actualizarOrdenBaseDatos,
    totalCarrito,
    agregarNuevoPedidoMaster,
    actualizarOrdenBaseDatosMaster,
  };
};

export default useCarritoCompras;
