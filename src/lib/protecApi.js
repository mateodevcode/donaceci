import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const allowedOrigins = ["https://www.donaceci.com"];
const apiKey = process.env.API_SECRET_KEY;

export async function protectApi(req) {
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  const clientKey = req.headers.get("x-api-key");

  // 1. Desarrollo: permitir siempre
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // 2. Viene del frontend real (navegador desde donaceci.com)
  const isFrontend = allowedOrigins.some((url) => origin.startsWith(url));
  if (isFrontend) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }
    return token;
  }

  // 3. Si viene de otra herramienta (sin origen), se requiere x-api-key
  if (clientKey && clientKey === apiKey) {
    return true;
  }

  // 4. Bloquear todo lo demás
  return NextResponse.json(
    { message: "Acceso bloqueado: origen no permitido o clave inválida" },
    { status: 403 }
  );
}
