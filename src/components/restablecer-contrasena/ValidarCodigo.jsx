"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FcOk } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { MainfudContext } from "@/context/MainfudContext";
import { validarOTP } from "@/utils/validarOTP";

export default function ValidarCodigo({ setIsCodigoValidado }) {
  const searchParams = useSearchParams();
  const emailUrl = searchParams.get("email");

  const { usuarios, setIdReset, setUsuarios } = useContext(MainfudContext);
  const [formData, setFormData] = useState({
    email: emailUrl ? emailUrl : "",
    codigoVerificacion: "",
  });
  const [validarUsuarioExistente, setValidarUsuarioExistente] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeOtp = (value) => {
    setFormData((prev) => ({ ...prev, codigoVerificacion: value }));
  };

  useEffect(() => {
    const usuarioExistente = usuarios.some(
      (usuario) =>
        usuario.email === formData.email.toLowerCase() &&
        usuario.codigoVerificacion !== "" &&
        usuario.intentosFallidos <= 3
    );
    setValidarUsuarioExistente(usuarioExistente);
  }, [formData.email, usuarios, formData.codigoVerificacion]);

  const handleValidarCodigo = async () => {
    try {
      const res = await fetch("/api/validar-codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        const { id, message } = data;
        setIdReset(id);
        toast.success("Codigo valido.", {
          description: message,
        });
        setIsCodigoValidado(true);
      } else {
        const error = await res.json();
        const { validarCodigo } = error;
        setValidarUsuarioExistente(validarCodigo);
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <Mail className="h-6 w-6 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-black text-center mb-2">
              Validar código de verificación
            </h1>
            <p className="text-zinc-500 text-center mb-8">
              Ingresa el código que hemos enviado a tu correo electrónico para
              restablecer tu contraseña.
            </p>

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
                        id="email"
                        type="text"
                        placeholder="Ingresa tu email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-zinc-100 text-black pr-10 p-3 rounded-lg w-full`}
                        required
                      />
                      {validarUsuarioExistente && (
                        <FcOk className="absolute right-2 top-1/2 transform -translate-y-1/2" />
                      )}
                      {formData.email && !validarUsuarioExistente && (
                        <IoMdCloseCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Campo de confirmar contraseña */}
                <div>
                  <p className="text-center text-black mb-2 font-semibold">
                    Codigo de verificación
                  </p>
                  <div className="flex items-center justify-center text-black placeholder:text-zinc-700">
                    <InputOTP
                      maxLength={6}
                      value={validarOTP(formData.codigoVerificacion)}
                      onChange={handleChangeOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleValidarCodigo}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full select-none font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Validar código
                  </button>
                </div>
                <span>
                  <p className="text-sm text-gray-500 text-center">
                    ¿No recibiste el código?{" "}
                    <Link
                      href="/olvidaste-tu-contrasena"
                      onClick={() => setIsCodigoValidado(false)}
                      className="text-zinc-800 hover:text-zinc-600"
                    >
                      Reenviar código
                    </Link>
                  </p>
                </span>
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
