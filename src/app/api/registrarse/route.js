import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";
import { validarPassword } from "@/utils/validarPassword";
import bcrypt from "bcrypt";

export async function POST(req) {
  await connectMongoDB();
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      imageUrl,
      direccion,
      telefono,
      publicId,
      estado,
      intentosFallidos,
      bloqueado,
      codigoVerificacion,
      dateCodigoVerificacion,
      id_ordenes_almacenadas,
      activar_sonido,
      rol,
      cargo,
    } = body;

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "El usuario ya existe, inicia sesión" }),
        {
          status: 400,
        }
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ message: "Correo electrónico inválido" }),
          {
            status: 400,
          }
        );
      }
    }

    if (password.length < 10) {
      return new Response(
        JSON.stringify({
          message: "La contraseña debe tener al menos 10 caracteres",
        }),
        {
          status: 400,
        }
      );
    }

    if (!validarPassword(password)) {
      return new Response(
        JSON.stringify({
          message:
            "La contraseña debe contener al menos una letra minuscula, una letra mayúscula, un número y un carácter especial @ $ ! % * ? &",
        }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Usuario.create({
      name,
      email,
      password: hashedPassword,
      imageUrl,
      direccion,
      telefono,
      publicId,
      estado,
      intentosFallidos,
      bloqueado,
      codigoVerificacion,
      dateCodigoVerificacion,
      id_ordenes_almacenadas,
      activar_sonido,
      rol,
      cargo,
    });

    const usuarios = await Usuario.find({});

    return new Response(
      JSON.stringify({ message: "Usuario creado", usuarios }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return new Response(JSON.stringify({ message: "Error en el registro" }), {
      status: 500,
    });
  }
}
