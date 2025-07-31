"use client";

import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [openModalSidebar, setOpenModalSidebar] = useState(true);
  const [openModalPerfilAdmin, setOpenModalPerfilAdmin] = useState(false);
  const [asientos, setAsientos] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [
    openModalConfirmrEliminarProducto,
    setOpenModalConfirmarEliminarProducto,
  ] = useState(false);
  const [productoIventarioSeleccionado, setProductoInventarioSeleccionado] =
    useState(null);
  const [formDatosInventario, setFormDatosInventario] = useState({
    _id: "",
    stockActual: 0,
    stockMinimo: 0,
    ultimoArqueo: new Date().toISOString(),
    ultimoMovimiento: new Date().toISOString(),
  });
  const [nuevoProducto, setNuevoProducto] = useState(false);
  const [editarProducto, setEditarProducto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [arqueosInventarios, setArqueosInventarios] = useState([]);

  useEffect(() => {
    const fetchAsientos = async () => {
      const res = await fetch("/api/asientos");
      const data = await res.json();
      setAsientos(data);
    };

    fetchAsientos();
  }, []);

  // Aplanar los movimientos para renderizarlos como libro diario
  const movimientos = asientos.flatMap((asiento) =>
    asiento.movimientos.map((mov) => ({
      ...mov,
      fecha: asiento.fecha,
      detalle: asiento.detalle,
    }))
  );

  useEffect(() => {
    const fetchInventario = async () => {
      const res = await fetch("/api/inventario");
      const data = await res.json();
      setInventario(data);
    };

    fetchInventario();
  }, []);

  useEffect(() => {
    const fetchArqueos = async () => {
      const res = await fetch("/api/arqueo-inventario");
      const data = await res.json();
      setArqueosInventarios(data);
    };
    fetchArqueos();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        openModalSidebar,
        setOpenModalSidebar,
        openModalPerfilAdmin,
        setOpenModalPerfilAdmin,
        asientos,
        setAsientos,
        movimientos,
        inventario,
        setInventario,
        openModalConfirmrEliminarProducto,
        setOpenModalConfirmarEliminarProducto,
        productoIventarioSeleccionado,
        setProductoInventarioSeleccionado,
        formDatosInventario,
        setFormDatosInventario,
        nuevoProducto,
        setNuevoProducto,
        editarProducto,
        setEditarProducto,
        productoSeleccionado,
        setProductoSeleccionado,
        arqueosInventarios,
        setArqueosInventarios,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
