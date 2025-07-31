"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import React, { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { toast } from "sonner";

const ListaProductos = () => {
  const {
    setOpenModalCrearCategoria,
    setEditarCategoria,
    setCategoria,
    setFormDatosCategoria,
    setOpenModalProducto,
    setEditarProducto,
    producto,
    setProducto,
    setFormDatosProducto,
    setOpenModalIngrediente,
    setEditarIngrediente,
    setIngrediente,
    setFormDatosIngrediente,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    productoSeleccionado,
    setProductoSeleccionado,
    ingredienteSeleccionado,
    setIngredienteSeleccionado,
  } = useContext(MasterContext);
  const { categorias, productos, ingredientes } = useContext(MainfudContext);

  const listaProductos = productos?.filter(
    (producto) => producto.categoria === categoriaSeleccionada
  );

  const ingredientesDelProducto = ingredientes?.filter((ingrediente) => {
    const idIngrediente = ingrediente?._id?.toString();
    const ingredientesDelProducto = productoSeleccionado?.ingredientes?.map(
      (id) => id?.toString()
    );
    return ingredientesDelProducto?.includes(idIngrediente);
  });

  return (
    <div className="flex md:flex-row flex-col">
      {/* Categorias */}
      <div className="w-full md:w-80 p-4">
        <div className="flex items-center justify-between w-full md:w-72">
          <h3 className="text-xl font-semibold">Categorias</h3>
          <button
            className="rounded-full text-rose-500 hover:text-rose-400 active:scale-95 duration-150 text-3xl cursor-pointer select-none"
            onClick={() => {
              setOpenModalCrearCategoria(true);
              setEditarCategoria(false);
              setCategoria(null);
              setFormDatosCategoria({
                nombre: "",
                imagen: "",
                opcion: "crear",
                categoriaInicial: "",
              });
            }}
          >
            <AiFillPlusCircle />
          </button>
        </div>
        <div className="mt-4 gap-2 flex flex-col">
          {categorias.map((categoria, index) => (
            <div
              key={index}
              onClick={() => {
                setCategoriaSeleccionada(categoria.nombreFormateado);
                setProductoSeleccionado(null);
                setIngredienteSeleccionado(null);
                setProducto(null);
                setIngrediente(null);
              }}
              className={`flex items-center gap-3 justify-between p-3 rounded-full cursor-pointer select-none active:scale-95 duration-150 ${
                categoriaSeleccionada === categoria.nombreFormateado
                  ? "bg-[#252235] border-[1px] border-white/50 text-white"
                  : "border-[1px] border-white bg-white/50"
              }`}
            >
              <h4 className="text-sm mx-2">{categoria.nombre}</h4>
              <button
                className="text-rose-500 hover:text-rose-400 active:scale-95 duration-150 text-lg cursor-pointer select-none mx-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditarCategoria(true);
                  setCategoria(categoria);
                  setOpenModalCrearCategoria(true);
                }}
              >
                <VscSettings />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Productos */}
      <div className="w-full md:w-80 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Productos</h3>
          <button
            className="rounded-full text-rose-500 hover:text-rose-400 active:scale-95 duration-150 text-3xl cursor-pointer select-none"
            onClick={() => {
              setOpenModalProducto(true);
              setEditarProducto(false);
              setProducto(null);
              setFormDatosProducto({
                nombre: "",
                precio: "",
                image: "",
                publicId: "",
                categoria: "",
                descripcion: "",
                categoria: "",
                ingredientes: [],
                opcion: "crear",
                disponible_comer_aqui: true,
                disponible_para_llevar: true,
              });
            }}
          >
            <AiFillPlusCircle />
          </button>
        </div>
        <div className="mt-4 gap-2 flex flex-col">
          {listaProductos.map((product, index) => (
            <div
              key={index}
              onClick={() => {
                setProductoSeleccionado(product);
                setProducto(product);
              }}
              className={`flex items-center gap-3 justify-between p-3 rounded-full cursor-pointer select-none active:scale-95 duration-150 ${
                productoSeleccionado?.nombre === product.nombre
                  ? "bg-[#252235] border-[1px] border-white/50 text-white"
                  : "border-[1px] border-white bg-white/50"
              }`}
            >
              <h4 className="text-sm mx-2">{product.nombre}</h4>
              <button
                className="text-rose-500 hover:text-rose-400 active:scale-95 duration-150 text-lg cursor-pointer select-none mx-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditarProducto(true);
                  setProducto(product);
                  setOpenModalProducto(true);
                }}
              >
                <VscSettings />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Ingredientes */}
      <div className="w-full md:w-80 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Ingredientes</h3>
          <button
            className="rounded-full text-rose-500 hover:text-rose-400 active:scale-95 duration-150 text-3xl cursor-pointer select-none"
            onClick={() => {
              if (!producto) {
                toast.error(
                  `Debes seleccionar un producto primero para agregar ingredientes.`,
                  {
                    position: "top-center",
                    style: {
                      background: "#FEE2E2", // Light red background
                      color: "#B91C1C", // Dark red text
                      borderColor: "#B91C1C", // Dark red border
                    },
                  }
                );
                return;
              }
              setOpenModalIngrediente(true);
              setEditarIngrediente(false);
              setIngrediente(null);
              setFormDatosIngrediente({
                nombre: "",
                cantidad: "",
                imagen: "",
                publicId: "",
                opcion: "crear",
              });
            }}
          >
            <AiFillPlusCircle />
          </button>
        </div>
        <div className="mt-4 gap-2 flex flex-col">
          {ingredientesDelProducto.map((ingre, index) => (
            <div
              key={index}
              onClick={() => {
                setIngrediente(ingre);
                setIngredienteSeleccionado(ingre.nombre);
              }}
              className={`flex items-center gap-3 justify-between p-3 rounded-full cursor-pointer select-none active:scale-95 duration-150 ${
                ingredienteSeleccionado === ingre.nombre
                  ? "bg-[#252235] border-[1px] border-white/50 text-white"
                  : "border-[1px] border-white bg-white/50"
              }`}
            >
              <h4 className="text-sm mx-2">{ingre.nombre}</h4>
              <button
                className="text-rose-500 hover:text-rose-400 active:scale-95 duration-150 text-lg cursor-pointer select-none mx-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditarIngrediente(true);
                  setIngrediente(ingre);
                  setOpenModalIngrediente(true);
                }}
              >
                <VscSettings />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaProductos;
