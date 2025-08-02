"use client";

import dynamic from "next/dynamic";

// Importa RedocStandalone dinámicamente para evitar problemas con SSR (Next.js)
const RedocStandalone = dynamic(
  () => import("redoc").then((mod) => mod.RedocStandalone),
  { ssr: false }
);

export default function Docs() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* El archivo openapi.json debe estar en la carpeta /public */}
      <RedocStandalone specUrl="/openapi.json" />
    </div>
  );
}
