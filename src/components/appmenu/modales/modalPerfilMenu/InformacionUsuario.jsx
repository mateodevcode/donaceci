"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { actualizar_usuario } from "@/lib/socket/usuario_socket";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { RiIdCardLine } from "react-icons/ri";
import { TbHome } from "react-icons/tb";
import { toast } from "sonner";
import ConfirmarEliminarCuenta from "../../confirmacion-eliminar-cuenta/ConfirmarEliminarCuenta";
import BotonesSesion from "./BotonesSesion";

const InformacionUsuario = () => {
  const { usuario } = useContext(MainfudContext);
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [usuarioInitial, setUsuarioInitial] = useState(usuario);
  const [datosPerfil, setDatosPerfil] = useState({
    name: usuario?.name || "",
    email: usuario?.email || "",
    password: usuario?.password || "",
    telefono: usuario?.telefono || "",
    direccion: usuario?.direccion || "",
  });

  useEffect(() => {
    if (usuario) {
      setUsuarioInitial(usuario);
      setDatosPerfil({
        name: usuario.name || "",
        email: usuario.email || "",
        password: usuario.password || "",
        telefono: usuario.telefono || "",
        direccion: usuario.direccion || "",
      });
    }
  }, [usuario]);

  const actualizarPerfil = async () => {
    if (!datosPerfil.name) {
      toast.error("Por favor, Ingresa un nombre", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }

    if (!datosPerfil.email) {
      toast.error("Por favor, Ingresa un email", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }
    if (!datosPerfil.telefono) {
      toast.error("Por favor, Ingresa un telefono", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }
    if (!datosPerfil.direccion) {
      toast.error("Por favor, Ingresa una dirección", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }

    if (
      datosPerfil.name === usuarioInitial?.name &&
      datosPerfil.email === usuarioInitial?.email &&
      datosPerfil.password === usuarioInitial?.password &&
      datosPerfil.telefono === usuarioInitial?.telefono &&
      datosPerfil.direccion === usuarioInitial?.direccion
    ) {
      toast.error("No hay cambios para guardar", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }
    actualizar_usuario(usuario?._id, {
      name: datosPerfil.name,
      email: datosPerfil.email,
      password: datosPerfil.password,
      telefono: datosPerfil.telefono,
      direccion: datosPerfil.direccion,
    });
    toast.success("Perfil actualizado Correctamente", {
      position: "top-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    setEditarPerfil(false);
  };

  return (
    <form className="w-11/12 md:w-[450px] h-96 px-5">
      <div className="bg-white p-10 rounded-lg text-zinc-800 gap-3 flex flex-col">
        {/* Avatar */}
        <div className="relative z-10 flex flex-col items-center mb-8">
          <Image
            src={usuario?.imageUrl || "/perfil/avatar.png"}
            alt={`Imagen de ${usuario?.name}`}
            width={500}
            height={500}
            className="w-28 h-28 bg-amber-100 dark:text-zinc-950 dark:border-slate-700 rounded-full object-cover border-2 border-white shadow-lg"
          />
        </div>

        {editarPerfil ? (
          <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Nombre
            </span>
            <div className="relative flex items-center gap-4">
              <RiIdCardLine className="h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                type="text"
                placeholder="Marcos Pérez"
                onChange={(e) => {
                  setDatosPerfil({
                    ...datosPerfil,
                    name: e.target.value,
                  });
                }}
                value={datosPerfil?.name}
                required
                name="name"
                className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 border-[1px] border-zinc-100 rounded-md px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Nombre
            </span>
            <div className="relative flex items-center gap-4">
              <RiIdCardLine className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-zinc-500">
                {usuario?.name || "Invitado"}
              </span>
            </div>
          </div>
        )}
        {editarPerfil ? (
          <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Correo Electrónico
            </span>
            <div className="relative flex items-center gap-4">
              <MdOutlineMail className="h-4 w-4 text-muted-foreground" />
              <input
                id="emial"
                type="text"
                placeholder="ejemplo@gmail.com"
                onChange={(e) => {
                  setDatosPerfil({
                    ...datosPerfil,
                    email: e.target.value,
                  });
                }}
                value={datosPerfil.email}
                required
                name="emial"
                className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 border-[1px] border-zinc-100 rounded-md px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Correo Electrónico
            </span>
            <div className="relative flex items-center gap-4">
              <MdOutlineMail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-zinc-500">
                {usuario?.email || "invitado@gmail.com"}
              </span>
            </div>
          </div>
        )}
        {editarPerfil ? (
          <div className="grid gap-2 border-[1px] rounded-full px-4 py-3 relative border-zinc-200">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Contraseña
            </span>
            <div className="relative flex items-center gap-4">
              <MdLockOutline className="h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="text"
                placeholder="**********"
                onChange={(e) => {
                  setDatosPerfil({
                    ...datosPerfil,
                    password: e.target.value,
                  });
                }}
                value={datosPerfil.password}
                required
                name="password"
                className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 border-[1px] border-zinc-100 rounded-md px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Contraseña
            </span>
            <div className="relative flex items-center gap-4">
              <MdLockOutline className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-zinc-500">
                {usuario?.password || "*********"}
              </span>
            </div>
          </div>
        )}
        {editarPerfil ? (
          <div className="grid gap-2 border-[1px] rounded-full px-4 py-3 relative border-zinc-200">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Telefono
            </span>
            <div className="relative flex items-center gap-4">
              <BsFillTelephoneFill className="h-4 w-4 text-muted-foreground" />
              <input
                id="telefono"
                type="text"
                placeholder="300 2888529"
                onChange={(e) => {
                  setDatosPerfil({
                    ...datosPerfil,
                    telefono: e.target.value,
                  });
                }}
                value={datosPerfil.telefono}
                required
                name="telefono"
                className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 border-[1px] border-zinc-100 rounded-md px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Telefono
            </span>
            <div className="relative flex items-center gap-4">
              <BsFillTelephoneFill className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-zinc-500">
                {usuario?.telefono || "3002888529"}
              </span>
            </div>
          </div>
        )}
        {editarPerfil ? (
          <div className="grid gap-2 border-[1px] rounded-full px-4 py-3 relative border-zinc-200">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Dirección
            </span>
            <div className="relative flex items-center gap-4">
              <TbHome className="h-4 w-4 text-muted-foreground" />
              <input
                id="direccion"
                type="text"
                placeholder="Ejemplo: Calle Falsa 123"
                onChange={(e) => {
                  setDatosPerfil({
                    ...datosPerfil,
                    direccion: e.target.value,
                  });
                }}
                value={datosPerfil.direccion}
                required
                name="direccion"
                className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 border-[1px] border-zinc-100 rounded-md px-4 py-3 relative">
            <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-800">
              Dirección
            </span>
            <div className="relative flex items-center gap-4">
              <TbHome className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-zinc-500">
                {usuario?.direccion || "Calle 123"}
              </span>
            </div>
          </div>
        )}
      </div>
      {usuario && (
        <div className="flex flex-col gap-2 mt-4">
          {editarPerfil ? (
            <button
              onClick={() => actualizarPerfil()}
              className="w-full bg-amber-400 text-white py-2 rounded-full font-semibold hover:bg-amber-300 transition-colors shadow-lg cursor-pointer select-none active:scale-95 duration-75"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={() => setEditarPerfil(true)}
              className="w-full bg-amber-400 text-white py-2 rounded-full font-semibold hover:bg-amber-300 transition-colors shadow-lg cursor-pointer select-none active:scale-95 duration-75"
            >
              Editar perfil
            </button>
          )}
          {editarPerfil ? (
            <button
              className="w-full bg-amber-400 text-white py-2 rounded-full font-semibold hover:bg-amber-300 transition-colors shadow-lg cursor-pointer select-none active:scale-95 duration-75"
              onClick={() => setEditarPerfil(false)}
            >
              Cancelar
            </button>
          ) : (
            <ConfirmarEliminarCuenta id={usuario?._id} />
          )}
        </div>
      )}
      <BotonesSesion />
    </form>
  );
};

export default InformacionUsuario;
