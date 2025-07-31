import RestablecerPassword from "@/components/restablecer-contrasena/RestablecerPassword";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <RestablecerPassword />
    </Suspense>
  );
}
