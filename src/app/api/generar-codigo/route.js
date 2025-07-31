import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";
import nodemailer from "nodemailer";

export async function PATCH(req) {
  try {
    const { _id } = await req.json();
    await connectMongoDB();

    const generarCodigo = () => Math.floor(100000 + Math.random() * 900000);
    const codigo = generarCodigo();
    const resetUrl = `https://donaceci.com/restablecer-contrasena`;

    if (!_id) {
      return Response.json(
        {
          title: "El correo ingresado es inválido",
          message:
            "Necesitas ingresar tu email valido para poder recuperar tu contraseña",
        },
        { status: 400 }
      );
    }

    const usuario = await Usuario.findById({ _id });

    // Validar si ya existe un código y si han pasado menos de 15 minutos
    if (usuario.codigoVerificacion && usuario.dateCodigoVerificacion) {
      const ahora = new Date();
      const diferenciaEnMinutos = Math.floor(
        (ahora - usuario.dateCodigoVerificacion) / 1000 / 60
      );
      const MINUTOS_ESPERA = 5;

      if (diferenciaEnMinutos >= MINUTOS_ESPERA) {
        // Código expirado, limpiamos
        usuario.codigoVerificacion = "";
        usuario.dateCodigoVerificacion = null;
        usuario.intentosFallidos = 0;
        await usuario.save();
      } else {
        // Todavía es válido
        return new Response(
          JSON.stringify({
            title: "Código ya generado",
            message: `Debes esperar ${
              MINUTOS_ESPERA - diferenciaEnMinutos
            } minutos para solicitar un nuevo código.`,
          }),
          { status: 400 }
        );
      }
    }

    usuario.codigoVerificacion = codigo;
    usuario.dateCodigoVerificacion = new Date();
    usuario.intentosFallidos = 0;
    await usuario.save();

    // Configurar Nodemailer con Gmail
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Tu correo de Gmail
        pass: process.env.EMAIL_PASS, // Contraseña de aplicación (no la de tu cuenta normal)
      },
    });

    const mailOptions = {
      from: `"Seventwo Technologies" <${process.env.EMAIL_USER}>`,
      to: usuario.email,
      subject: `🔐Código de verificación para restablecer tu contraseña`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <table align="center" width="600" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
            <tr>
              <td align="center">
                <a href="https://seventwo.tech" target="_blank">
                  <img src="https://ik.imagekit.io/zglyrjsvp/st-email.png?updatedAt=1746291139378" alt="Seventwo Tech" style="max-width: 150px; margin-bottom: 20px;">
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <h2 style="color: #333; text-align: center;">¡Calma, calma... 🧘‍♂️ ya casi tienes tu nueva contraseña!</h2>
                <p style="color: #555; text-align: center;">
                  Por seguridad, todas las contraseñas están encriptadas y no podemos verlas.Pero no te preocupes, estás a un paso de crear una nueva.
                </p>
                <p style="text-align: center; font-size: 18px; color: #333;"><strong>Este es tu código OTP:</strong></p>
                <p style="text-align: center; font-size: 32px; font-weight: bold; color: #1010FF; margin: 10px 0;">${codigo}</p>
                <p style="text-align: center; color: #555;">Copia este código e ingrésalo en el siguiente enlace:</p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${resetUrl}?email=${encodeURIComponent(
        usuario.email
      )}" style="background-color: #1010FF; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Restablecer contraseña</a>
                </div>
                <p style="color: #777; text-align: center; font-size: 14px;">
                  Si tú no solicitaste esto, puedes ignorar este correo. Tu contraseña sigue segura.
                </p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="text-align: center; color: #777; font-size: 12px;">
                  © ${new Date().getFullYear()} Seventwo Technologies. Todos los derechos reservados.
                </p>
              </td>
            </tr>
          </table>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    const usuarios = await Usuario.find({});
    return new Response(
      JSON.stringify({
        title: "Código enviado",
        message:
          "Hemos enviado un código de verificación a tu correo electrónico.",
        user: usuario,
        users: usuarios,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enviando el correo:", error);
    return Response.json(
      { message: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}
