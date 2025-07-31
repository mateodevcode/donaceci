"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Eye, EyeOff, Lock } from "lucide-react";

import ValidarCodigo from "./ValidarCodigo";
import { toast } from "sonner";
import { MainfudContext } from "@/context/MainfudContext";

export default function RestablecerPassword() {
  const [iscodigoValidado, setIsCodigoValidado] = useState(false);
  const { idReset, setUsuarios } = useContext(MainfudContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  // Validación de contraseña
  const validatePassword = (value) => {
    if (value.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    if (!/[A-Z]/.test(value)) {
      return "La contraseña debe incluir al menos una letra mayúscula";
    }
    if (!/[a-z]/.test(value)) {
      return "La contraseña debe incluir al menos una letra minúscula";
    }
    if (!/[0-9]/.test(value)) {
      return "La contraseña debe incluir al menos un número";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "La contraseña debe incluir al menos un carácter especial";
    }
    return "";
  };

  // Validación de coincidencia de contraseñas
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Las contraseñas no coinciden";
    }
    return "";
  };

  // Manejo de cambios en los campos
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(value),
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Si hay errores, no continuar
    if (passwordError || confirmPasswordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/usuarios/${idReset}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { title, message, users } = data;
        setUsuarios(users);
        toast.success(title, {
          description: message,
          style: {
            backgroundColor: "#34d777",
            color: "#000",
            borderColor: "#000",
          },
        });
        setResetComplete(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Verificar la fortaleza de la contraseña
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthText = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"];
  const strengthColor = [
    "bg-red-600",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-600",
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {iscodigoValidado && (
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

            {resetComplete ? (
              <div className="bg-white rounded-xl p-8 text-center z-40">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 mx-auto mb-6">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-black mb-4">
                  ¡Contraseña restablecida!
                </h1>
                <p className="text-zinc-600 mb-6">
                  Tu contraseña ha sido actualizada correctamente. Ahora puedes
                  iniciar sesión con tu nueva contraseña.
                </p>
                <Link
                  href={{ pathname: "/menu", query: { showModal: "true" } }}
                >
                  <button className="w-full bg-amber-400 hover:bg-amber-500 text-white p-3 rounded-full select-none font-semibold transition-colors duration-200 cursor-pointer">
                    Iniciar sesión
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-black text-center mb-2">
                  Restablecer contraseña
                </h1>
                <p className="text-zinc-600 text-center mb-8">
                  Crea una nueva contraseña segura para tu cuenta de Seventwo
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Campo de contraseña */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-black mb-2"
                      >
                        Nueva contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={handlePasswordChange}
                          className={`bg-zinc-100 text-black pr-10 p-3 rounded-lg w-full ${
                            errors.password ? "border-red-500" : ""
                          }`}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-800 hover:text-zinc-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}

                      {/* Indicador de fortaleza de contraseña */}
                      {password && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-zinc-800">
                              Fortaleza:
                            </span>
                            <span
                              className={`text-sm ${
                                passwordStrength < 3
                                  ? "text-red-400"
                                  : passwordStrength === 3
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              {strengthText[passwordStrength - 1]}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-[#0c0a1d] rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                strengthColor[passwordStrength - 1]
                              }`}
                              style={{
                                width: `${(passwordStrength / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Requisitos de contraseña */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div
                          className={`text-xs ${
                            password.length >= 8
                              ? "text-green-400"
                              : "text-gray-500"
                          } flex items-center`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              password.length >= 8
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          Mínimo 8 caracteres
                        </div>
                        <div
                          className={`text-xs ${
                            /[A-Z]/.test(password)
                              ? "text-green-400"
                              : "text-gray-500"
                          } flex items-center`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              /[A-Z]/.test(password)
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          Una mayúscula
                        </div>
                        <div
                          className={`text-xs ${
                            /[a-z]/.test(password)
                              ? "text-green-400"
                              : "text-gray-500"
                          } flex items-center`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              /[a-z]/.test(password)
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          Una minúscula
                        </div>
                        <div
                          className={`text-xs ${
                            /[0-9]/.test(password)
                              ? "text-green-400"
                              : "text-gray-500"
                          } flex items-center`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              /[0-9]/.test(password)
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          Un número
                        </div>
                        <div
                          className={`text-xs ${
                            /[!@#$%^&*(),.?":{}|<>]/.test(password)
                              ? "text-green-400"
                              : "text-gray-500"
                          } flex items-center`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              /[!@#$%^&*(),.?":{}|<>]/.test(password)
                                ? "bg-green-400"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          Un carácter especial
                        </div>
                      </div>
                    </div>

                    {/* Campo de confirmar contraseña */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-black mb-2"
                      >
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          className={`bg-zinc-100 text-black pr-10 p-3 rounded-lg w-full ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-800 hover:text-zinc-600"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full select-none font-semibold transition-colors duration-200 cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Procesando..."
                          : "Restablecer contraseña"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      )}

      {!iscodigoValidado && (
        <ValidarCodigo setIsCodigoValidado={setIsCodigoValidado} />
      )}
    </div>
  );
}
