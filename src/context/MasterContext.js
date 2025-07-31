"use client";

import { createContext, use, useContext, useEffect, useState } from "react";
import { MainfudContext } from "./MainfudContext";

export const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  const { usuario, setFormDatos, setFormDatosUsuario } =
    useContext(MainfudContext);

  const [openModalPedidoSeleccionado, setOpenModalPedidoSeleccionado] =
    useState(false);
  const [pedidoSeleccionadoMaster, setPedidoSeleccionadoMaster] =
    useState(null);
  const [rutaSelect, setRutaSelect] = useState("disponibilidad");
  const [openModalMenuMaster, setOpenModalMenuMaster] = useState(false);
  const [openModalCrearCategoria, setOpenModalCrearCategoria] = useState(false);
  const [editarCategoria, setEditarCategoria] = useState(null);
  const [categoria, setCategoria] = useState(null); // Para editar una categoría específica
  const [formDatosCategoria, setFormDatosCategoria] = useState({
    nombre: "",
    imagen: "",
    opcion: "crear",
    categoriaInicial: "",
  });
  const [openModalProducto, setOpenModalProducto] = useState(false);
  const [editarProducto, setEditarProducto] = useState(null);
  const [producto, setProducto] = useState(null); // Para editar un producto específico
  const [formDatosProducto, setFormDatosProducto] = useState({
    nombre: "",
    precio: "",
    image: "",
    publicId: "",
    categoria: "",
    descripcion: "",
    ingredientes: [],
    opcion: "crear",
    disponible_comer_aqui: true,
    disponible_para_llevar: true,
    insumos: [],
  });
  const [openModalIngrediente, setOpenModalIngrediente] = useState(false);
  const [editarIngrediente, setEditarIngrediente] = useState(null);
  const [ingrediente, setIngrediente] = useState(null); // Para editar un ingrediente específico
  const [formDatosIngrediente, setFormDatosIngrediente] = useState({
    nombre: "",
    precio: "",
    image: "",
    publicId: "",
    opcion: "crear",
  });

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("ejecutivos");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState(null);
  const [openModalNuevoPedido, setOpenModalNuevoPedido] = useState(false);
  const [openModalTicket, setOpenModalTicket] = useState(false);
  const [datosTicket, setDatosTicket] = useState(null);
  const [openModalEditarPedido, setOpenModalEditarPedido] = useState(false);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("id_usuario", usuario._id);
      setFormDatos((prev) => ({
        ...prev,
        id_usuario: usuario._id,
      }));
      setFormDatosUsuario((prev) => ({
        ...prev,
        id_usuario: usuario._id,
        name: usuario.name,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        email: usuario.email,
        imageUrl: usuario.imageUrl,
        publicId: usuario.publicId,
        rol: usuario.rol,
      }));
    }
  }, [usuario, setFormDatos, setFormDatosUsuario]);

  return (
    <MasterContext.Provider
      value={{
        openModalPedidoSeleccionado,
        setOpenModalPedidoSeleccionado,
        pedidoSeleccionadoMaster,
        setPedidoSeleccionadoMaster,
        rutaSelect,
        setRutaSelect,
        openModalMenuMaster,
        setOpenModalMenuMaster,
        openModalCrearCategoria,
        setOpenModalCrearCategoria,
        editarCategoria,
        setEditarCategoria,
        categoria,
        setCategoria,
        formDatosCategoria,
        setFormDatosCategoria,
        openModalProducto,
        setOpenModalProducto,
        editarProducto,
        setEditarProducto,
        producto,
        setProducto,
        formDatosProducto,
        setFormDatosProducto,
        openModalIngrediente,
        setOpenModalIngrediente,
        editarIngrediente,
        setEditarIngrediente,
        ingrediente,
        setIngrediente,
        formDatosIngrediente,
        setFormDatosIngrediente,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        productoSeleccionado,
        setProductoSeleccionado,
        ingredienteSeleccionado,
        setIngredienteSeleccionado,
        openModalNuevoPedido,
        setOpenModalNuevoPedido,
        openModalTicket,
        setOpenModalTicket,
        datosTicket,
        setDatosTicket,
        openModalEditarPedido,
        setOpenModalEditarPedido,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};
