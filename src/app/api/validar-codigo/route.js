import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";

export async function POST(req) {
  try {
    const { email, codigoVerificacion } = await req.json();
    await connectMongoDB();

    if (!email) {
      return new Response(
        JSON.stringify({
          title: "Ingresa tu email",
          message: "Por favor ingresa tu email",
        }),
        {
          status: 400,
        }
      );
    }

    if (!codigoVerificacion) {
      return new Response(
        JSON.stringify({
          title: "Ingresa tu código",
          message: "Por favor ingresa tu código de verificación",
        }),
        {
          status: 400,
        }
      );
    }

    // Verificar si el usuario existe
    const user = await Usuario.findOne({ email });

    const ahora = new Date();
    const diferenciaEnMinutos = Math.floor(
      (ahora - user.dateCodigoVerificacion) / 1000 / 60
    );
    const MINUTOS_ESPERA = 5;

    if (!user || user.codigoVerificacion === "") {
      return new Response(
        JSON.stringify({
          title: "Verifica tu email",
          message:
            "El correo electrónico no está registrado o no tiene un código de verificación",
        }),
        { status: 400 }
      );
    }

    if (codigoVerificacion.length < 6) {
      return new Response(
        JSON.stringify({
          title: "Código inválido",
          message: "El código de verificación debe tener 6 dígitos",
        }),
        { status: 400 }
      );
    }

    // Verificar si el código es correcto
    if (user.codigoVerificacion !== codigoVerificacion) {
      user.intentosFallidos += 1; // Incrementar intentos fallidos

      if (user.intentosFallidos > 2) {
        user.bloqueado = true; // Bloquear al usuario
        await user.save();
        const validarCodigo = false;
        return Response.json(
          {
            title: "Codigo invalido",
            message:
              "El codigo de verificación no es correcto. Solicita un nuevo código",
            validarCodigo,
          },
          { status: 403 }
        );
      }

      await user.save(); // Guardar cambios en la base de datos
      const validarCodigo = true;
      return Response.json(
        {
          title: `${
            user.intentosFallidos === 1
              ? `${user.intentosFallidos} intento Fallido`
              : `${user.intentosFallidos} intentos Fallidos`
          }`,
          message: "El código de verificación no es correcto",
          validarCodigo,
        },
        { status: 401 }
      );
    }

    if (
      user.codigoVerificacion === codigoVerificacion &&
      diferenciaEnMinutos > MINUTOS_ESPERA
    ) {
      return Response.json(
        {
          title: "Código expirado",
          message: `El código de verificación ha expirado. Solicita un nuevo código`,
        },
        { status: 401 }
      );
    }

    user.codigoVerificacion = ""; // Limpiar el código de verificación

    await user.save();

    return Response.json(
      { message: "Puedes restablecer tu contraseña", id: user._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al validar el código:", error);
    return new Response.json(
      JSON.stringify({ message: "Error al validar el código" }),
      { status: 500 }
    );
  }
}
