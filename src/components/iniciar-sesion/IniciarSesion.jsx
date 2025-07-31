"use client";

import Image from "next/image";
import { FormIniciarSesion } from "./FormIniciarSesion";
import Link from "next/link";

export default function IniciarSesion() {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <div className="flex justify-center gap-2">
        <Link href="/">
          <Image
            src={"/logo/logo.png"}
            alt="Logo"
            width={400}
            height={400}
            className="h-24 lg:h-40 w-auto border-4 border-white rounded-full bg-white"
          />
        </Link>
      </div>
      <FormIniciarSesion />
    </div>
  );
}
