import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const rol = req.nextauth.token?.rol;

    // ❌ Bloquea por completo el acceso a /admin para todos
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ Si no tiene rol, redirige a inicio
    if (!rol) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🚫 Empleado no puede entrar a rutas que contengan /admin (ya cubierto arriba)
    if (rol === "empleado" && pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🚫 Usuario no puede entrar a /admin ni /master
    if (
      rol === "usuario" &&
      (pathname.includes("/admin") || pathname.includes("/master"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ Admin puede acceder a todo excepto /admin (ya bloqueado arriba)
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/", // Redirección si no está autenticado
    },
  }
);

export const config = {
  matcher: ["/master/:path*", "/admin/:path*"],
};
