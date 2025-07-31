import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const rol = req.nextauth.token?.rol;

    // Si no tiene cargo, redirige a inicio
    if (!rol) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Regla para 'empleado': no puede entrar a rutas que contengan /admin
    if (rol === "empleado" && pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Regla para 'normal': no puede entrar a rutas con /admin ni /mainfud
    if (
      rol === "usuario" &&
      (pathname.includes("/admin") || pathname.includes("/master"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 'admin' puede acceder a todo
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/", // Redirección si no está autenticado
    },
  }
);

// Aplica el middleware solo a estas rutas
export const config = {
  matcher: ["/master/:path*", "/admin/:path*"],
};
