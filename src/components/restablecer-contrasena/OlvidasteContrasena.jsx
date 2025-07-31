"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BrickWallFire, CircleCheck } from "lucide-react";

import { toast } from "sonner";
import { MainfudContext } from "@/context/MainfudContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";

export default function OlvidasteContrasena() {
  const router = useRouter();
  const { usuarios, setUsuarios } = useContext(MainfudContext);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const user = usuarios.find(
      (usuario) => usuario.email === formData.email.toLowerCase()
    );
    setIdUsuario(user);
  }, [formData.email, usuarios]);

  const handleValidarCodigo = async () => {
    if (formData.email === "") {
      toast.error("Por favor, ingresa un email válido.");
      return;
    }

    if (!idUsuario) {
      toast.error("Por favor, ingresa un email válido.");
      return;
    }

    try {
      const res = await fetch(`/api/generar-codigo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: idUsuario?._id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const { title, message, user, users } = data;
        setUsuarios(users);
        toast.success(title, {
          description: message,
          style: {
            backgroundColor: "#34d777",
            color: "#000",
            borderColor: "#000",
          },
        });
        setMensaje(
          "Hemos enviado un código a tu correo electrónico, por favor revisa tu bandeja de entrada."
        );
        setTimeout(() => {
          router.push(
            "/restablecer-contrasena?email=" + decodeURIComponent(user.email)
          );
        }, 8000);
      } else {
        const error = await res.json();

        toast.error(error.title, {
          description: error.message,
        });
      }
    } catch (err) {
      toast.error("Error al registrar la cuenta. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          {/* Botón de regreso */}
          <Link
            href="/"
            className="inline-flex items-center text-black hover:text-black/50 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la página principal
          </Link>

          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600">
                <BrickWallFire className="h-6 w-6 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-zinc-800 text-center mb-2">
              ¿Contraseña? ¿Cuál contraseña?
            </h1>
            <div className="text-zinc-500 text-center mb-8 flex flex-col">
              <span className="text-rose-400">Eso está encriptado.</span>
              <span className="text-zinc-600 text-center font-semibold mt-4">
                Déjanos tu email y te ayudamos a volver.
              </span>
            </div>

            <form>
              <div className="space-y-6">
                {/* Campo de contraseña */}
                <div>
                  <label htmlFor="password" className="block text-black mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      <input
                        id="password"
                        type="text"
                        placeholder="Ingresa tu email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-zinc-100 text-black pr-10 p-3 rounded-lg w-full`}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleValidarCodigo}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full select-none font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Solicitar código
                  </button>
                </div>
                {mensaje && (
                  <Alert
                    variant="success"
                    className="text-green-500 bg-green-100 border-[1px] border-green-600"
                  >
                    <CircleCheck className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      {mensaje}
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-sm text-gray-500 text-center">
                    <Link
                      href="/restablecer-contrasena"
                      className="text-zinc-800 hover:text-zinc-700 font-semibold "
                    >
                      Ya tengo un código
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="bg-zinc-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-800 text-sm">
            © 2025 <strong>Doña Ceci.</strong> Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
