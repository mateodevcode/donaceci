// src/app/api/upload/categoria/route.js

import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Categoria from "@/models/categoria";
import { formatearNombre } from "@/utils/formatearNombre";
import { formatearNombreMayus } from "@/utils/formatearNombreMayus";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function fileToBuffer(file) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request) {
  await connectMongoDB();

  const formData = await request.formData();
  const file = formData.get("file");
  const nombre = formData.get("nombre");
  const opcion = formData.get("opcion");
  const categoriaId = formData.get("categoriaId");

  if (!opcion || (opcion === "editar" && !categoriaId)) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  try {
    let uploadResponse = null;
    let oldPublicId = null;

    // Si hay imagen, validar y subir
    if (file && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Solo se permiten imágenes" },
          { status: 400 }
        );
      }
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: "Máx 2MB" }, { status: 400 });
      }

      const buffer = await fileToBuffer(file);
      const fileName = `categoria_${nombre || "imagen"}_${Date.now()}.jpg`;

      // Si estamos editando, obtener publicId anterior para eliminar
      if (opcion === "editar") {
        const cat = await Categoria.findById(categoriaId);
        if (!cat)
          return NextResponse.json(
            { error: "Categoría no encontrada" },
            { status: 404 }
          );
        oldPublicId = cat.publicId;
      }

      uploadResponse = await imagekit.upload({
        file: buffer,
        fileName,
        folder: "/categorias",
        useUniqueFileName: false,
        transformation: {
          pre: "c-at_least,h-500,w-500",
        },
      });
    }

    // CREAR
    if (opcion === "crear") {
      if (!nombre || !uploadResponse) {
        return NextResponse.json(
          { error: "Nombre e imagen requeridos para crear" },
          { status: 400 }
        );
      }

      const catt = await Categoria.find({});
      const lonCatt = catt.length;

      const nuevaCategoria = await Categoria.create({
        nombre: formatearNombreMayus(nombre),
        publicId: uploadResponse.fileId,
        imagen: uploadResponse.url,
        nombreFormateado: formatearNombre(nombre),
        position: lonCatt + 1,
      });

      return NextResponse.json(
        { message: "Categoría creada", categoria: nuevaCategoria },
        { status: 200 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (nombre) {
        updates.nombre = formatearNombreMayus(nombre);
        updates.nombreFormateado = formatearNombre(nombre);
      }

      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.imagen = uploadResponse.url;
      }

      const updated = await Categoria.findByIdAndUpdate(categoriaId, updates, {
        new: true,
      });

      // Eliminar imagen anterior si se subió una nueva
      if (uploadResponse && oldPublicId) {
        try {
          await imagekit.deleteFile(oldPublicId);
        } catch (e) {
          console.warn("No se eliminó imagen anterior:", e.message);
        }
      }

      return NextResponse.json(
        { message: "Categoría actualizada", categoria: updated },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Opción no válida" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error en el servidor", details: err.message },
      { status: 500 }
    );
  }
}
