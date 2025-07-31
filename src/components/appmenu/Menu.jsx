"use client";

import React, { useContext, useEffect, useState } from "react";
import ModalProductoSeleccionado from "./modales/ModalProductoSeleccionado";
import { MainfudContext } from "@/context/MainfudContext";
import ModalCarritoCompras from "./modales/modalCarritoCompras/ModalCarritoCompras";
import ModalMenuHamburguesa from "./modales/modaMenuHamburguesa/ModalMenuHamburguesa";
import ModalPerfilMenu from "./modales/modalPerfilMenu/ModalPerfilMenu";
import ModalSoporte from "./modales/ModalSoporte";
import CardProducto from "./cardProducto/CardProducto";
import { useSession } from "next-auth/react";
import Loading from "../loading/Loading";
import ModalTipoPedido from "./modales/ModalTipoPedido";
import ModalDirecion from "./modales/ModalDireccionTelefono";
import ModalOpenScanearQR from "./modales/ModalQRMesaNombre";
import ModalConfirmacionPedido from "./modales/ModalConfirmacionPedido";
import ModalErrorPedido from "./modales/ModalErrorPedido";
import ModalPedido from "./modales/modalPedido/ModalPedido";
import Configuracion from "./modales/ModalConfiguracion";
import ModalIniciarSesion from "./modales/ModalIniciarSesion";
import useLocalStorage from "@/hooks/useLocalStorage";
import { actualizar_usuario } from "@/lib/socket/usuario_socket";
import ModalHistorialPedidos from "./modales/modalHistorialPedidos/ModalHistorialPedidos";
import Footer from "./footer/Footer";
import Buscar from "./buscar/Buscar";
import BannerPromocion from "./banner-promocion/BannerPromocion";
import Header from "./header/Header";
import Saludo from "./saludo/Saludo";
import Categoria from "./categoria/Categoria";
import ModalBloquearAppMenu from "./modales/ModalBloquearAppMenu";
import ModalRegistrarse from "./modales/ModalRegistrarse";
import ModalMetodosPago from "./modales/ModalMetodosPago";
import { useRouter, useSearchParams } from "next/navigation";
import ModalComentarios from "./modales/modalCarritoCompras/ModalComentarios";
import { toast } from "sonner";

const Menu = () => {
  // Puedes reemplazar esto con el nombre real del usuario
  const [busqueda, setBusqueda] = useState("");
  const {
    usuario,
    setUsuario,
    formDatosUsuario,
    idOrdenCreadaPendiente,
    categoriaSeleccionada,
    categorias,
    productos,
    formDatos,
    setFormDatos,
    setOpenModalIniciarSesion,
  } = useContext(MainfudContext);
  const { actualizarCampoOrden, actualizarCampoUsuario } = useLocalStorage();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const showModal = searchParams.get("showModal") === "true";
  const [hasMounted, setHasMounted] = useState(false);
  const mesaParam = searchParams.get("mesa");
  const router = useRouter();

  const categoriaTodoFiltrado = productos?.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  useEffect(() => {
    if (mesaParam) {
      const numeroMesa = Number(mesaParam);

      if (!isNaN(numeroMesa)) {
        // Solo asignamos si aún no está seteada o si es distinta
        if (!formDatos.mesa || formDatos.mesa !== numeroMesa) {
          setFormDatos((prev) => ({ ...prev, mesa: numeroMesa }));
          toast.success(`Mesa ${numeroMesa} asignada automáticamente`, {
            duration: 3000,
            position: "top-center",
            style: {
              backgroundColor: "#34d777",
              color: "#000",
              borderColor: "#000",
            },
          });

          // Quitar el parámetro "mesa" de la URL sin recargar
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("mesa");

          router.replace(`/menu?${newParams.toString()}`, { scroll: false });
        }
      } else {
        toast.error("Número de mesa inválido en el código QR", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#FEE2E2",
            color: "#B91C1C",
            borderColor: "#B91C1C",
          },
        });
      }
    }
  }, [mesaParam, searchParams, setFormDatos, formDatos.mesa, router]);

  useEffect(() => {
    // Si NO hay usuario o YA hay email en formDatosUsuario, no hacemos nada
    if (!usuario || formDatosUsuario.email) return;

    const { name, telefono, direccion, email, imageUrl, _id } = usuario;

    // Traer datos del localStorage
    const datosLocalStorage =
      JSON.parse(localStorage.getItem("usuarioStorage")) || {};
    const listaLocalStorageOrdenes =
      datosLocalStorage.id_ordenes_almacenadas || [];

    // Listas para sincronizar
    const listaUsuarioOrdenes = usuario.id_ordenes_almacenadas || [];
    const listaCombinadaOrdenes = [
      ...new Set([...listaUsuarioOrdenes, ...listaLocalStorageOrdenes]),
    ];

    const newTelefono = formDatosUsuario.telefono
      ? formDatosUsuario.telefono
      : telefono;
    const newDireccion = formDatosUsuario.direccion
      ? formDatosUsuario.direccion
      : direccion;

    // Campos comunes
    const camposUsuario = [
      { key: "name", value: name },
      { key: "telefono", value: newTelefono },
      { key: "direccion", value: newDireccion },
      { key: "email", value: email },
      { key: "imageUrl", value: imageUrl },
      { key: "id_usuario", value: _id },
      { key: "id_ordenes_almacenadas", value: listaCombinadaOrdenes },
    ];

    const camposOrden = [
      { key: "name", value: name },
      { key: "telefono", value: newTelefono },
      { key: "direccion", value: newDireccion },
      { key: "id_usuario", value: _id },
    ];

    localStorage.setItem("id_usuario", JSON.stringify(_id));

    let hayCambios = false;

    // Actualizamos solo si hay diferencias
    camposUsuario.forEach(({ key, value }) => {
      if (value !== undefined && formDatosUsuario[key] !== value) {
        actualizarCampoUsuario(key, value);
        hayCambios = true;
      }
    });

    camposOrden.forEach(({ key, value }) => {
      if (value !== undefined && formDatosUsuario[key] !== value) {
        actualizarCampoOrden(key, value);
        hayCambios = true;
      }
    });

    // Solo si hay cambios, mandamos al servidor
    if (hayCambios) {
      if (
        formDatosUsuario.direccion !== "" &&
        formDatosUsuario.direccion !== usuario.direccion
      ) {
        actualizar_usuario(usuario._id, {
          direccion: newDireccion,
        });
      }

      if (
        formDatosUsuario.telefono !== "" &&
        formDatosUsuario.telefono !== usuario.telefono
      ) {
        actualizar_usuario(usuario._id, {
          telefono: newTelefono,
        });
      }

      if (
        formDatosUsuario.id_ordenes_almacenadas !== "" &&
        formDatosUsuario.id_ordenes_almacenadas !==
          usuario.id_ordenes_almacenadas
      ) {
        actualizar_usuario(usuario._id, {
          id_ordenes_almacenadas: listaCombinadaOrdenes,
        });
      }

      // // Actualiza el usuario en el backend
      // actualizar_usuario(usuario._id, {
      //   direccion: formDatosUsuario.direccion,
      //   telefono: formDatosUsuario.telefono,
      //   id_ordenes_almacenadas: listaCombinadaOrdenes,
      // });
    }

    // Limpiar localStorage después de sincronizar
    localStorage.setItem(
      "usuarioStorage",
      JSON.stringify({
        ...datosLocalStorage,
        id_ordenes_almacenadas: [],
      })
    );
  }, [usuario, formDatosUsuario, actualizarCampoOrden, actualizarCampoUsuario]);

  useEffect(() => {
    if (!idOrdenCreadaPendiente) return;

    // Si hay usuario autenticado
    if (usuario && idOrdenCreadaPendiente) {
      const listaOrdenes = [...(usuario.id_ordenes_almacenadas || [])];
      const yaExiste = listaOrdenes.includes(idOrdenCreadaPendiente);

      if (yaExiste) return; // Detiene si ya existe

      const nuevaLista = [...listaOrdenes, idOrdenCreadaPendiente];

      // Actualiza el estado del usuario
      actualizar_usuario(usuario._id, {
        id_ordenes_almacenadas: nuevaLista,
      });
      setUsuario((prev) => ({
        ...prev,
        id_ordenes_almacenadas: nuevaLista,
      }));

      // Opcional: también sincroniza con localStorage o servidor
      // localStorage.setItem("usuario_ordenes", JSON.stringify(nuevaLista));

      return;
    }

    // Si NO hay usuario autenticado
    const datosLocalStorage =
      JSON.parse(localStorage.getItem("usuarioStorage")) || {};
    const listaLocal = [...(datosLocalStorage.id_ordenes_almacenadas || [])];
    const yaExisteLocal = listaLocal.includes(idOrdenCreadaPendiente);

    if (yaExisteLocal) return; // Detiene si ya existe

    const nuevaListaLocal = [...listaLocal, idOrdenCreadaPendiente];

    // Guarda de nuevo en localStorage
    actualizarCampoUsuario("id_ordenes_almacenadas", nuevaListaLocal);

    // Opcional: actualiza algún campo local si usas un estado como formDatos
    // actualizarCampoOrden("id_ordenes_almacenadas", nuevaListaLocal);
  }, [idOrdenCreadaPendiente, usuario, setUsuario, actualizarCampoUsuario]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (showModal) {
      const timer = setTimeout(() => {
        setOpenModalIniciarSesion(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, hasMounted, setOpenModalIniciarSesion]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-amber-50 dark:bg-slate-950">
      <div className="w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-6/12 relative flex flex-col items-center justify-start min-h-svh">
        {/* Header */}
        <Header />

        {/* Saludo */}
        <Saludo />

        {/* Buscador */}
        <Buscar setBusqueda={setBusqueda} busqueda={busqueda} />

        {/* Banner Publicitario */}
        {/* <BannerPromocion /> */}

        {/* Categoria */}
        <Categoria setBusqueda={setBusqueda} />

        {/* Renderizado de productos */}

        {busqueda === "" && (
          <>
            {categorias?.map((categoria, index) => {
              const nombreCategoria = categoria.nombreFormateado.toLowerCase();

              if (categoriaSeleccionada !== nombreCategoria) return null;

              const filtrarProductos = productos?.filter((item) => {
                const perteneceCategoria = item.categoria === nombreCategoria;

                if (!perteneceCategoria) return false;

                if (formDatos?.para_llevar === true) {
                  return item.disponible_para_llevar === true;
                }

                if (formDatos?.para_llevar === false) {
                  return item.disponible_comer_aqui === true;
                }

                // Si es null o undefined, mostrar todos los productos de la categoría
                return true;
              });

              return <CardProducto key={index} productos={filtrarProductos} />;
            })}
          </>
        )}

        {/* Si no hay categoria seleccionada, mostramos todo */}
        {categoriaTodoFiltrado?.length === 0 && (
          <div className="w-11/12 mt-6 flex items-center justify-center">
            <h3 className="text-gray-600 text-lg font-semibold text-center">
              No hay resultados para mostrar. Por favor, selecciona una
              categoría o realiza una búsqueda.
            </h3>
          </div>
        )}

        {busqueda !== "" && categoriaTodoFiltrado.length > 0 && (
          <CardProducto productos={categoriaTodoFiltrado} />
        )}
      </div>

      {/* Footer */}
      <Footer />

      <ModalProductoSeleccionado />
      <ModalCarritoCompras />
      <ModalMenuHamburguesa />
      <ModalIniciarSesion />
      <ModalRegistrarse />
      <ModalPerfilMenu />
      <ModalSoporte />
      <ModalTipoPedido />
      <ModalOpenScanearQR />
      <ModalDirecion />
      <ModalConfirmacionPedido />
      <ModalErrorPedido />
      <ModalPedido />
      <ModalHistorialPedidos />
      <Configuracion />
      <ModalBloquearAppMenu />
      <ModalMetodosPago />
      <ModalComentarios />

      {/* Estilos globales para el scrollbar */}

      <style jsx global>{`
        /* Scrollbar diferente para /menu */
        * {
          scrollbar-width: thin;
          scrollbar-color: #ffb900 #fffbeb;
        }

        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        *::-webkit-scrollbar-track {
          background: #483d03;
        }

        *::-webkit-scrollbar-thumb {
          background: #ffb900;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #ffb900;
        }
      `}</style>
    </div>
  );
};

export default Menu;
