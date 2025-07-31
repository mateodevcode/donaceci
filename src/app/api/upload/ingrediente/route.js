// src/app/api/upload/producto/route.js

import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Ingrediente from "@/models/ingrediente";
import Producto from "@/models/producto";

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
  const cantidad = formData.get("cantidad");
  const producto = formData.get("producto");
  const opcion = formData.get("opcion");
  const ingredienteId = formData.get("ingredienteId");

  if (!opcion || (opcion === "editar" && !ingredienteId)) {
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
      const fileName = `ingrediente_${nombre || "imagen"}_${Date.now()}.jpg`;

      // Si estamos editando, obtener publicId anterior para eliminar
      if (opcion === "editar") {
        const ingre = await Ingrediente.findById(ingredienteId);
        if (!ingre)
          return NextResponse.json(
            { error: "Ingrediente no encontrada" },
            { status: 404 }
          );
        oldPublicId = ingre.publicId;
      }

      uploadResponse = await imagekit.upload({
        file: buffer,
        fileName,
        folder: "/Ingredientes",
        useUniqueFileName: false,
        transformation: {
          pre: "c-at_least,h-250,w-250",
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

      const nuevoIngrediente = await Ingrediente.create({
        nombre,
        cantidad,
        publicId: uploadResponse.fileId,
        imagen: uploadResponse.url,
      });

      const productoIngrediente = await Producto.findById(producto);

      if (!productoIngrediente) {
        return NextResponse.json(
          { error: "Producto no encontrado" },
          { status: 404 }
        );
      } else {
        // Agregar el nuevo ingrediente al producto
        productoIngrediente.ingredientes.push(nuevoIngrediente._id);
        await productoIngrediente.save();
      }

      return NextResponse.json(
        { message: "Ingreidente creado", ingrediente: nuevoIngrediente },
        { status: 200 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (nombre) {
        updates.nombre = nombre;
      }
      if (cantidad) {
        updates.cantidad = cantidad;
      }
      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.imagen = uploadResponse.url;
      }

      const updated = await Ingrediente.findByIdAndUpdate(
        ingredienteId,
        updates,
        {
          new: true,
        }
      );

      // Eliminar imagen anterior si se subió una nueva
      if (uploadResponse && oldPublicId) {
        try {
          await imagekit.deleteFile(oldPublicId);
        } catch (e) {
          console.warn("No se eliminó imagen anterior:", e.message);
        }
      }

      return NextResponse.json(
        { message: "Ingrediente actualizada", ingrediente: updated },
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
