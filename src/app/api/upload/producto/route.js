// src/app/api/upload/producto/route.js

import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Producto from "@/models/producto";
import { formatearNombreMayus } from "@/utils/formatearNombreMayus";
import { formatearDescripcion } from "@/utils/formatearDescripcion";

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
  const precio = formData.get("precio");
  const categoria = formData.get("categoria");
  const descripcion = formData.get("descripcion");
  const ingredientes = formData.get("ingredientes");
  const opcion = formData.get("opcion");
  const productoId = formData.get("productoId");
  const disponible_comer_aqui = formData.get("disponible_comer_aqui");
  const disponible_para_llevar = formData.get("disponible_para_llevar");
  const insumos = formData.get("insumos");

  if (!opcion || (opcion === "editar" && !productoId)) {
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
      const fileName = `producto_${nombre || "imagen"}_${Date.now()}.jpg`;

      // Si estamos editando, obtener publicId anterior para eliminar
      if (opcion === "editar") {
        const pro = await Producto.findById(productoId);
        if (!pro)
          return NextResponse.json(
            { error: "Producto no encontrada" },
            { status: 404 }
          );
        oldPublicId = pro.publicId;
      }

      uploadResponse = await imagekit.upload({
        file: buffer,
        fileName,
        folder: "/productos",
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

      const nuevoProducto = await Producto.create({
        nombre: formatearNombreMayus(nombre),
        precio: parseFloat(precio),
        categoria,
        descripcion: formatearDescripcion(descripcion),
        publicId: uploadResponse.fileId,
        image: uploadResponse.url,
        ingredientes: ingredientes ? JSON.parse(ingredientes) : [],
        disponible_comer_aqui: disponible_comer_aqui === "true",
        disponible_para_llevar: disponible_para_llevar === "true",
        insumos: insumos ? JSON.parse(insumos) : [],
      });

      return NextResponse.json(
        { message: "Producto creado", producto: nuevoProducto },
        { status: 200 }
      );
    }

    // EDITAR
    if (opcion === "editar") {
      const updates = {};

      if (nombre) {
        updates.nombre = formatearNombreMayus(nombre);
      }
      if (precio) {
        updates.precio = parseFloat(precio);
      }
      if (categoria) {
        updates.categoria = categoria;
      }
      if (descripcion) {
        updates.descripcion = formatearDescripcion(descripcion);
      }
      if (ingredientes) {
        updates.ingredientes = JSON.parse(ingredientes);
      }
      if (uploadResponse) {
        updates.publicId = uploadResponse.fileId;
        updates.image = uploadResponse.url;
      }
      if (disponible_comer_aqui !== undefined) {
        updates.disponible_comer_aqui = disponible_comer_aqui;
      }
      if (disponible_para_llevar !== undefined) {
        updates.disponible_para_llevar = disponible_para_llevar;
      }
      if (insumos) {
        updates.insumos = JSON.parse(insumos);
      }

      const updated = await Producto.findByIdAndUpdate(productoId, updates, {
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
        { message: "Producto actualizada", producto: updated },
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
