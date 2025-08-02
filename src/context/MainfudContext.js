"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getId } from "@qrvey/id-generator";
import { useSession } from "next-auth/react";
import socket from "@/lib/socket";

export const MainfudContext = createContext();

export const MainfudProvider = ({ children }) => {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false); // Estado para verificar la conexión del socket
  // Generador de ID para ordenes
  const customAlphabet = "0123456789ABCDEF";
  const customLength = 8;
  // Generador de ID para usuarios
  const customAlphabetId = "0123456789abcdefghijklmnopqrstuvwxyz";
  const customLengthId = 16;

  // Modales Appmenu
  const [openModalCarritoCompras, setOpenModalCarritoCompras] = useState(false);
  const [openModalProductoSeleccionado, setOpenModalProductoSeleccionado] =
    useState(false);
  const [openModalMenuHamburguesa, setOpenModalMenuHamburguesa] =
    useState(false);
  const [openModalSoporte, setOpenModalSoporte] = useState(false);
  const [openModalConfiguracion, setOpenModalConfiguracion] = useState(false);
  const [openModalIniciarSesion, setOpenModalIniciarSesion] = useState(false);
  const [openModalConfirmacionPedido, setOpenModalConfirmacionPedido] =
    useState(false);
  const [openModalErrorPedido, setOpenModalErrorPedido] = useState(false);
  const [openModalPedido, setOpenModalPedido] = useState(false);
  const [openModalHistorialPedidos, setOpenModalHistorialPedidos] =
    useState(false);
  const [openModalPerfilMenu, setOpenModalPerfilMenu] = useState(false);
  const [openMondalDireccionTelefono, setOpenModalDireccionTelefono] =
    useState(false);
  const [openModalQRMesaNombre, setOpenModalQRMesaNombre] = useState(false);
  const [openMondalTipoPedido, setOpenModalTipoPedido] = useState(false);

  // Modales pagina inicio
  const [openModalContacto, setOpenModalContacto] = useState(false);
  const [
    openModalMenuHamburguesaPrincipal,
    setOpenModalMenuHamburguesaPrincipal,
  ] = useState(false);
  const [openModalBloquearAppMenu, setOpenModalBloquearAppMenu] =
    useState(false);
  const [openModalRegistrarse, setOpenModalRegistrarse] = useState(false);
  const [openModalSolicitarCuenta, setOpenModalSolicitarCuenta] =
    useState(false);
  const [openModalMetodosPago, setOpenModalMetodosPago] = useState(false);
  const [openModalComentarios, setOpenModalComentarios] = useState(false);

  // Variables de estado para manejar las ordenes y usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [usuarioStorage, setUsuarioStorage] = useState(null);
  const [ordenStorage, setOrdenStorage] = useState(null); // localStorage para manejar la orden pendiente
  const [idOrdenCreadaPendiente, setIdOrdenCreadaPendiente] = useState(null); // localStorage para manejar el ID de la orden pendiente
  const [itemsSeleccionados, setItemsSeleccionados] = useState([]);
  const [ordenPendiente, setOrdenPendiente] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const [mesa, setMesa] = useState(null); // Estado para manejar la mesa seleccionada
  const [tipoPedido, setTipoPedido] = useState(""); // Estado para manejar el tipo de pedido
  const [productoSeleccionadoMenu, setProductoSeleccionadoMenu] =
    useState(null); // Producto seleccionado del menú
  const [listaTodasLasOrdenes, setListaTodasLasOrdenes] = useState([]); // Maneja el historial de todas las ordenes
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(""); // Estado para manejar la categoría seleccionada
  const [categorias, setCategorias] = useState(null);
  const [productos, setProductos] = useState(null);
  const [ingredientes, setIngredientes] = useState(null);
  const [idReset, setIdReset] = useState("");
  const [pedidoAEditar, setPedidoAEditar] = useState(null);
  const [ordenId, setOrdenId] = useState(null);

  // Crear ID para el usuario y guardarlo en localStorage
  const id_usuario = getId(customAlphabetId, customLengthId);
  // para manejar los datos del formulario de la orden
  const [formDatos, setFormDatos] = useState({
    pedido: getId(customAlphabet, customLength),
    name: usuario?.name || "",
    direccion: usuario?.direccion || "",
    telefono: usuario?.telefono || "",
    mesa: null,
    total: 0,
    estado: "pendiente",
    listaPedidos: [],
    para_llevar: null,
    id_usuario: usuarioStorage?.id_usuario,
    cuenta_solicitada: false, // Asegurarse de que el campo exista
    comentarios: "", // Campo para comentarios
    metodo_de_pago: "", // Campo para medios de pago
  });

  // para manejar los datos del formulario de usuario
  const [formDatosUsuario, setFormDatosUsuario] = useState({
    name: "",
    email: "",
    imageUrl: "",
    direccion: "",
    telefono: "",
    id_ordenes_almacenadas: [],
    activar_sonido: true,
    id_usuario: "",
    imageUrl: "",
  });

  // Cargar datos iniciales desde localStorage si existen
  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioStorage");
    const storedId = localStorage.getItem("id_usuario");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormDatosUsuario(parsedUser);
      setUsuarioStorage(parsedUser);
    } else if (storedId) {
      const nuevoUsuario = {
        name: "",
        email: "",
        imageUrl: "",
        direccion: "",
        telefono: "",
        id_ordenes_almacenadas: [],
        activar_sonido: true,
        id_usuario: storedId,
        imageUrl: "",
      };
      setFormDatosUsuario(nuevoUsuario);
      localStorage.setItem("usuarioStorage", JSON.stringify(nuevoUsuario));
    } else {
      const nuevoId = id_usuario;
      localStorage.setItem("id_usuario", nuevoId);

      const nuevoUsuario = {
        name: "",
        email: "",
        imageUrl: "",
        direccion: "",
        telefono: "",
        id_ordenes_almacenadas: [],
        activar_sonido: true,
        id_usuario: nuevoId,
        imageUrl: "",
      };

      setFormDatosUsuario(nuevoUsuario);
      localStorage.setItem("usuarioStorage", JSON.stringify(nuevoUsuario));
    }
  }, []);

  // Cargar el ID de la orden creada pendiente desde localStorage al iniciar
  useEffect(() => {
    const storedIdOrden = localStorage.getItem("idOrdenCreadaPendiente");
    if (storedIdOrden) {
      setIdOrdenCreadaPendiente(storedIdOrden);
    }
  }, []);

  const categoriasFiltradas = useMemo(() => {
    return categorias?.filter((cat) => {
      const nombreFormateado = cat.nombreFormateado.toLowerCase();

      // Excluir directamente la categoría "insumos"
      if (nombreFormateado === "insumos") return false;

      return productos?.some((producto) => {
        const esDeCategoria = producto.categoria === nombreFormateado;

        if (!esDeCategoria) return false;

        if (formDatos?.para_llevar === true) {
          return producto.disponible_para_llevar === true;
        }

        if (formDatos?.para_llevar === false) {
          return producto.disponible_comer_aqui === true;
        }

        return true;
      });
    });
  }, [categorias, productos, formDatos]);

  useEffect(() => {
    if (categoriasFiltradas && categoriasFiltradas.length > 0) {
      const primeraCategoria = categoriasFiltradas
        .slice()
        .sort((a, b) => a.position - b.position)[0]; // ordenar por posición

      if (primeraCategoria) {
        setCategoriaSeleccionada(
          primeraCategoria.nombreFormateado.toLowerCase()
        );
      }
    }
  }, [categoriasFiltradas]);

  // Sincroniza usuarioStorage con formDatosUsuario
  useEffect(() => {
    setUsuarioStorage(formDatosUsuario);
  }, [formDatosUsuario]);

  // Guardar en localStorage cuando cambie formDatosUsuario
  useEffect(() => {
    if (!formDatosUsuario) return;
    localStorage.setItem("usuarioStorage", JSON.stringify(formDatosUsuario));
  }, [formDatosUsuario]);

  /////// plan basico de carga de datos //////
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch("/api/productos");
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("🚨 Error al cargar los productos:", error);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await fetch("/api/categorias");
        if (!response.ok) {
          throw new Error("Error al cargar las categorias");
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("🚨 Error al cargar las categorias:", error);
      }
    };
    cargarCategorias();
  }, []);

  /////// plan basico de carga de datos //////

  /// plan avanzado de carga de datos ////////
  // conectar el socket al servidor
  // useEffect(() => {
  //   if (!socket.connected) socket.connect();

  //   socket.on("connect", () => {
  //     console.log("Conectado:", socket.id);
  //     setIsConnected(true); // Aquí marcas que está conectado
  //     socket.emit("client:getordenes");
  //     socket.emit("client:getproductos");
  //   });

  //   socket.on("server:ordenes", setOrdenes);
  //   socket.on("server:productos", setProductos);

  //   socket.on("server:orden_creada", (data) => {
  //     setOrdenPendiente(data);
  //     setIdOrdenCreadaPendiente(data._id);
  //   });

  //   socket.on("server:actualizar_orden", (data) => {
  //     setOrdenPendiente(data);
  //   });

  //   socket.on("server:actualizar_usuario", (data) => {
  //     setUsuario(data);
  //   });

  //   socket.on("server:reordenar_categorias", (categorias) => {
  //     setCategorias(categorias);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Desconectado:", socket.id);
  //     setIsConnected(false); // Aquí marcas que está desconectado
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("server:ordenes");
  //     socket.off("server:productos");
  //     socket.off("server:orden_creada");
  //     socket.off("server:reordenar_categorias");
  //     socket.off("server:orden_creada_admin");
  //     socket.off("server:actualizar_orden");
  //     socket.off("server:actualizar_usuario");
  //     socket.off("disconnect");
  //   };
  // }, []);

  // Close Nueva logica para manejar el socket

  // Carga inicial de idOrdenCreadaPendiente desde localStorage y elimina del storage si la orden está terminada
  useEffect(() => {
    if (typeof window !== "undefined" && idOrdenCreadaPendiente) {
      if (ordenPendiente?.estado === "pendiente") {
        localStorage.setItem("idOrdenCreadaPendiente", idOrdenCreadaPendiente);
      } else if (
        ordenPendiente?.estado === "terminado" ||
        ordenPendiente?.estado === "cancelado"
      ) {
        localStorage.removeItem("idOrdenCreadaPendiente");
        setIdOrdenCreadaPendiente(null);
        setTipoPedido("");
        localStorage.removeItem("ordenStorage");
        const nuevaOrden = {
          pedido: getId(customAlphabet, customLength),
          name: usuario?.name || formDatosUsuario?.name || "",
          direccion: usuario?.direccion || formDatosUsuario?.direccion || "",
          telefono: usuario?.telefono || formDatosUsuario?.telefono || "",
          mesa: null,
          total: 0,
          estado: "pendiente",
          listaPedidos: [],
          para_llevar: null,
          id_usuario: id_usuario,
          cuenta_solicitada: false,
          comentarios: "", // Campo para comentarios
          metodo_de_pago: "", // Campo para medios de pago
        };
        setFormDatos(nuevaOrden);
        localStorage.setItem("ordenStorage", JSON.stringify(nuevaOrden));
      }
    }
  }, [
    idOrdenCreadaPendiente,
    ordenPendiente,
    usuario,
    customAlphabet,
    customLength,
    id_usuario,
    formDatosUsuario,
  ]);

  // cargar usuarios de base de datos
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch("/api/usuarios");
        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("🚨 Error al cargar los usuarios:", error);
      }
    };
    cargarUsuarios();
  }, []);

  // cargar categorias de base de datos
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await fetch("/api/categorias");
        if (!response.ok) {
          throw new Error("Error al cargar las categorias");
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("🚨 Error al cargar las categorias:", error);
      }
    };
    cargarCategorias();
  }, []);

  // cargar Ingredientes de base de datos
  useEffect(() => {
    const cargarIngredientes = async () => {
      try {
        const response = await fetch("/api/ingredientes");
        if (!response.ok) {
          throw new Error("Error al cargar los ingredientes");
        }
        const data = await response.json();
        setIngredientes(data);
      } catch (error) {
        console.error("🚨 Error al cargar los ingredientes:", error);
      }
    };
    cargarIngredientes();
  }, []);

  useEffect(() => {
    const cargarUsuario = async () => {
      if (!session?.user?.id) return; // Espera a que la sesión esté lista

      try {
        const response = await fetch(`/api/usuarios/${session.user.id}`);
        if (!response.ok) {
          throw new Error("Error al cargar el usuario");
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("🚨 Error al cargar el usuario:", error);
      }
    };

    cargarUsuario();
  }, [session]);

  // Cargar datos de la orden desde localStorage al iniciar
  useEffect(() => {
    const storedOrden = localStorage.getItem("ordenStorage");
    if (storedOrden) {
      const parsedOrden = JSON.parse(storedOrden);
      setFormDatos(parsedOrden); // rellenamos formDatos con los datos guardados
    } else {
      const nuevaOrden = {
        pedido: getId(customAlphabet, customLength),
        name: "",
        direccion: "",
        telefono: "",
        mesa: null,
        total: 0,
        estado: "pendiente",
        listaPedidos: [],
        para_llevar: null,
        id_usuario: id_usuario, // Agregar el id_usuario por defecto
        cuenta_solicitada: false, // Asegurarse de que el campo exista
        comentarios: "", // Campo para comentarios
      };
      setFormDatos(nuevaOrden);
      localStorage.setItem("ordenStorage", JSON.stringify(nuevaOrden));
    }
  }, []);

  // Guarda automáticamente cuando formDatos cambie
  useEffect(() => {
    if (!formDatos) return;
    localStorage.setItem("ordenStorage", JSON.stringify(formDatos));
  }, [formDatos]);

  useEffect(() => {
    if (!formDatosUsuario) return;
    localStorage.setItem("usuarioStorage", JSON.stringify(formDatosUsuario));
  }, [formDatosUsuario]);

  //  Carga de la orden pendiente desde la base de datos
  useEffect(() => {
    const cargarOrdenPendiente = async () => {
      const response = await fetch(`/api/ordenes/${idOrdenCreadaPendiente}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrdenPendiente(data);
      }
    };
    if (idOrdenCreadaPendiente) {
      cargarOrdenPendiente();
    }
  }, [idOrdenCreadaPendiente]); // Dependencia para que se ejecute al cambiar el ID de la orden pendiente o al cargar el componente

  useEffect(() => {
    if (!usuario) {
      const usuarioStorage =
        JSON.parse(localStorage.getItem("usuarioStorage")) || [];
      const listaOrdenes = usuarioStorage.id_ordenes_almacenadas;
      const ordenesFiltradas = ordenes.filter((orden) =>
        listaOrdenes.includes(orden._id.toString())
      );
      setListaTodasLasOrdenes(ordenesFiltradas.reverse());
    } else {
      const listaOrdenes = usuario.id_ordenes_almacenadas || [];
      const ordenesFiltradas = ordenes.filter((orden) =>
        listaOrdenes.includes(orden._id.toString())
      );
      setListaTodasLasOrdenes(ordenesFiltradas.reverse());
    }
  }, [ordenPendiente, ordenes, usuario]);

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
  }, [usuario]);

  useEffect(() => {
    if (!ordenId) return;
    // Cargar el pedido a editar desde la base de datos
    const cargarPedidoAEditar = async () => {
      const ordenAeditar = ordenes.find((orden) => orden._id === ordenId);
      if (ordenAeditar) {
        setPedidoAEditar(ordenAeditar);
      } else {
        console.error("🚨 No se encontró la orden con el ID:", ordenId);
      }
    };
    cargarPedidoAEditar();
  }, [ordenId, ordenes, setPedidoAEditar, setOrdenId]);

  return (
    <MainfudContext.Provider
      value={{
        // Modales Appmenu
        openModalCarritoCompras,
        setOpenModalCarritoCompras,
        openModalProductoSeleccionado,
        setOpenModalProductoSeleccionado,
        openModalMenuHamburguesa,
        setOpenModalMenuHamburguesa,
        openModalSoporte,
        setOpenModalSoporte,
        openModalConfiguracion,
        setOpenModalConfiguracion,
        openModalIniciarSesion,
        setOpenModalIniciarSesion,
        openModalConfirmacionPedido,
        setOpenModalConfirmacionPedido,
        openModalErrorPedido,
        setOpenModalErrorPedido,
        openModalPedido,
        setOpenModalPedido,
        openModalHistorialPedidos,
        setOpenModalHistorialPedidos,
        openMondalDireccionTelefono,
        setOpenModalDireccionTelefono,
        openModalPerfilMenu,
        setOpenModalPerfilMenu,
        openModalQRMesaNombre,
        setOpenModalQRMesaNombre,
        openMondalTipoPedido,
        setOpenModalTipoPedido,
        // close Modales Appmenu
        // Modales pagina inicio
        openModalContacto,
        setOpenModalContacto,
        openModalMenuHamburguesaPrincipal,
        setOpenModalMenuHamburguesaPrincipal,
        // close Modales pagina inicio
        // Variables de estado para manejar las ordenes y usuarios
        isConnected,
        setIsConnected,
        usuarios,
        setUsuarios,
        usuario,
        setUsuario,
        usuarioStorage,
        ordenStorage,
        setOrdenStorage,
        idOrdenCreadaPendiente,
        itemsSeleccionados,
        setItemsSeleccionados,
        ordenPendiente,
        setOrdenPendiente,
        ordenes,
        setOrdenes,
        mesa,
        setMesa,
        tipoPedido,
        setTipoPedido,
        productoSeleccionadoMenu,
        setProductoSeleccionadoMenu,
        listaTodasLasOrdenes,
        setListaTodasLasOrdenes,
        formDatos,
        setFormDatos,
        formDatosUsuario,
        setFormDatosUsuario,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        categorias,
        setCategorias,
        productos,
        setProductos,
        ingredientes,
        setIngredientes,
        openModalBloquearAppMenu,
        setOpenModalBloquearAppMenu,
        openModalRegistrarse,
        setOpenModalRegistrarse,
        openModalSolicitarCuenta,
        setOpenModalSolicitarCuenta,
        openModalMetodosPago,
        setOpenModalMetodosPago,
        idReset,
        setIdReset,
        categoriasFiltradas,
        id_usuario,
        openModalComentarios,
        setOpenModalComentarios,
        pedidoAEditar,
        setPedidoAEditar,
        ordenId,
        setOrdenId,
      }}
    >
      {children}
    </MainfudContext.Provider>
  );
};
