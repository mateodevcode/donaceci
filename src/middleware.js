import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const rol = req.nextauth.token?.rol;

    // Si no está autenticado (sin rol), redirige a inicio o login
    if (!rol) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Protegemos /docs: solo admin puede entrar
    if (pathname.startsWith("/docs") && rol !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Regla para 'empleado': no puede entrar a rutas que contengan /admin
    if (rol === "empleado" && pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Regla para 'usuario': no puede entrar a rutas con /admin ni /master
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

// Ahora incluimos /docs en las rutas protegidas
export const config = {
  matcher: ["/master/:path*", "/admin/:path*", "/docs/:path*"],
};
