"use client";

import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MainfudContext } from "@/context/MainfudContext";
import { signIn } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { toast } from "sonner";

export function FormRegistrarse({ className, ...props }) {
  const {
    usuarios,
    setUsuarios,
    setOpenModalRegistrarse,
    setOpenModalIniciarSesion,
  } = useContext(MainfudContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    direccion: "",
    telefono: "",
    publicId: "",
    estado: "activo",
    intentosFallidos: 0,
    bloqueado: false,
    codigoVerificacion: "",
    dateCodigoVerificacion: Date.now(),
    id_ordenes_almacenadas: [],
    activar_sonido: true,
    rol: "usuario", // Agregar rol por defecto
    cargo: "", // Agregar cargo por defecto
  });
  const [verContraseña, setVerContraseña] = useState(false);
  const [errores, setErrores] = useState("");

  const validarUsuarioExistente = usuarios.some(
    (usuario) => usuario.email === formData.email.toLowerCase()
  );

  useEffect(() => {
    setTimeout(() => {
      setErrores("");
    }, 7000);
  }, [errores]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Campos vacios", {
        description: "Por favor completa todos los campos requeridos.",
      });
      return;
    }

    if (validarUsuarioExistente) {
      toast.error("Este correo ya está registrado.", {
        description: "Por favor, utiliza otro correo electrónico.",
      });
      return;
    }

    try {
      const res = await fetch("/api/registrarse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Registro exitoso", {
          description: "Ingresa a tus credenciales para continuar.",
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#34d777",
            color: "#000",
            borderColor: "#000",
          },
        });
        setUsuarios(data.usuarios);
        setFormData({
          name: "",
          email: "",
          password: "",
          imageUrl: "",
          direccion: "",
          telefono: "",
          publicId: "",
          estado: "activo",
          intentosFallidos: 0,
          bloqueado: false,
          codigoVerificacion: "",
          dateCodigoVerificacion: Date.now(),
          id_ordenes_almacenadas: [],
          activar_sonido: true,
          rol: "usuario",
          cargo: "",
        });
        setVerContraseña(false);
        setOpenModalRegistrarse(false);
        setOpenModalIniciarSesion(true);
      } else {
        const error = await res.json();
        toast.error(error.message, {
          description: "Por favor, intenta nuevamente.",
          duration: 2000,
          position: "top-center",
          style: {
            background: "#FEE2E2", // Light red background
            color: "#B91C1C", // Dark red text
            borderColor: "#B91C1C", // Dark red border
          },
        });
        setErrores(error.message);
      }
    } catch (err) {
      toast.error("Error al registrar la cuenta. Inténtalo de nuevo.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={("flex flex-col gap-6 text-white relative", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold my-2 md:my-5">Crear una cuenta</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative mt-4">
          <span className="text-xs bg-amber-50 absolute left-4 -top-2 px-2 text-zinc-400">
            Nombre
          </span>
          <div className="relative flex items-center gap-4">
            <BsFillPersonFill className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Marcos Pérez"
              onChange={handleChange}
              value={formData.name}
              required
              name="name"
              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-2 border-[1px] border-zinc-200 rounded-full px-4 py-3 relative">
          <span className="text-xs bg-amber-50 absolute left-4 -top-2 px-2 text-zinc-400">
            Correo Electrónico
          </span>
          <div className="relative flex items-center gap-4">
            <MdOutlineMail className="h-4 w-4 text-muted-foreground" />
            <input
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
          <span className="text-xs bg-amber-50 absolute left-4 -top-2 px-2 text-zinc-400">
            Contraseña
          </span>
          <div className="relative flex items-center gap-4">
            <MdLockOutline className="text-xl text-muted-foreground" />
            <input
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

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="w-full cursor-pointer select-none flex items-center justify-center gap-2 bg-[#eec802] p-2 rounded-full text-black hover:bg-[#eec802]/50 transition-colors duration-200 active:scale-95 text-sm"
          >
            Registrarse
          </button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after">
            <span className="relative z-10 bg-amber-50 px-2 text-zinc-400">
              O continúa con
            </span>
          </div>
          <button
            variant="outline"
            className="w-full cursor-pointer select-none flex items-center justify-center gap-4 bg-white p-2 rounded-full text-black hover:bg-zinc-300 transition-colors duration-200 active:scale-95 border-[1px] border-zinc-300 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              signIn("google", {
                callbackUrl: "/menu",
              });
            }}
          >
            <FcGoogle />
            Registrate con Google
          </button>
        </div>
      </div>
      <div className="text-center text-sm my-5">
        Ya tienes una cuenta{" "}
        <button
          className="font-semibold hover:text-[#eec802] cursor-pointer select-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenModalIniciarSesion(true);
            setOpenModalRegistrarse(false);
          }}
        >
          Inicia sesión
        </button>
      </div>
    </form>
  );
}
