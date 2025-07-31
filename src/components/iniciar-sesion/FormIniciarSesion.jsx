"use client";

import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MainfudContext } from "@/context/MainfudContext";
import { signIn } from "next-auth/react";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import { toast } from "sonner";

export function FormIniciarSesion({ className, ...props }) {
  const {
    usuarios,
    setUsuarios,
    setOpenModalRegistrarse,
    setOpenModalIniciarSesion,
  } = useContext(MainfudContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [verContraseña, setVerContraseña] = useState(false);
  const [contadorClick, setContadorClick] = useState(0);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const verificarBloqueos = usuarios.find(
    (usuario) =>
      usuario.email.toLowerCase() === formData.email.toLowerCase() &&
      usuario.bloqueado === true
  );

  useEffect(() => {
    if (contadorClick > 3) {
      const cargarUsuarios = async () => {
        const response = await fetch("/api/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsuarios(data);
      };
      cargarUsuarios();
    }
  }, [contadorClick, setUsuarios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContadorClick(contadorClick + 1);

    if (verificarBloqueos) {
      toast.error("Usuario bloqueado", {
        description:
          `Tu cuenta ${verificarBloqueos.email} está bloqueada. ` +
          "Por favor, restablece tu contraseña o contacta al soporte.",
        duration: 2000,
        position: "top-center",
        style: {
          background: "#FEE2E2", // Light red background
          color: "#B91C1C", // Dark red text
          borderColor: "#B91C1C", // Dark red border
        },
      });
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      callbackUrl: "/menu", // o a donde quieras redirigir
    });

    if (res?.ok) {
      toast.success("Inicio exitoso", {
        description: "Disfruta de tu experiencia en Mainfud.",
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
      setOpenModalIniciarSesion(false);
      setOpenModalRegistrarse(false);
    } else {
      toast.error(res?.error, {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#FEE2E2", // Light red background
          color: "#B91C1C", // Dark red text
          borderColor: "#B91C1C", // Dark red border
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={("flex flex-col gap-6 text-white relative", className)}
      {...props}
    >
      <div className="grid gap-6 mt-12">
        <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative">
          <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
            Correo Electrónico
          </span>
          <div className="relative flex items-center gap-4">
            <MdOutlineMail className="h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="marcos@gmail.com"
              onChange={handleChange}
              required
              name="email"
              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-2 border-[1px] rounded-full px-4 py-3 relative border-zinc-200">
          <span className="text-xs bg-white absolute left-4 -top-2 px-2 text-zinc-400">
            Contraseña
          </span>
          <div className="relative flex items-center gap-4">
            <MdLockOutline className="text-xl text-muted-foreground" />
            <input
              id="password"
              type={verContraseña ? "text" : "password"}
              placeholder="**********"
              onChange={handleChange}
              value={formData.password}
              required
              name="password"
              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
            />
            <div className="flex items-center justify-center">
              {verContraseña ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer"
                  onClick={() => setVerContraseña(true)}
                />
              )}
            </div>
          </div>
        </div>
        <Link
          href="/olvidaste-tu-contrasena"
          className="ml-auto text-xs underline-offset-4 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="w-full cursor-pointer select-none flex items-center justify-center gap-2 bg-[#eec802] p-2 rounded-full text-black hover:bg-[#eec802]/50 transition-colors duration-200 active:scale-95 text-sm"
          >
            Iniciar sesión
          </button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after">
            <span className="relative z-10 bg-white px-2 text-zinc-400">
              O continúa con
            </span>
          </div>
          <button
            variant="outline"
            className="w-full cursor-pointer select-none flex items-center justify-center gap-4 bg-zinc-200 p-2 rounded-full text-black hover:bg-zinc-300 transition-colors duration-200 active:scale-95 border-[1px] border-zinc-300 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              signIn("google", {
                callbackUrl: "/menu",
              });
            }}
          >
            <FcGoogle />
            Iniciar sesión con Google
          </button>
        </div>
      </div>
      <div className="text-center text-sm my-5">
        ¿No tienes una cuenta?{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenModalRegistrarse(true);
            setOpenModalIniciarSesion(false);
          }}
          className="font-semibold hover:text-[#eec802] cursor-pointer select-none"
        >
          Regístrate
        </button>
      </div>
    </form>
  );
}
