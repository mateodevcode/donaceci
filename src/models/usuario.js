import mongoose, { models, Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    direccion: {
      type: String,
      default: "",
    },
    telefono: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
    estado: {
      type: String,
      default: "activo",
    },
    intentosFallidos: {
      type: Number,
      default: 0,
    },
    bloqueado: {
      type: Boolean,
      default: false,
    },
    codigoVerificacion: {
      type: String,
      default: "",
    },
    dateCodigoVerificacion: {
      type: Date,
      default: Date.now,
    },
    id_ordenes_almacenadas: {
      type: [String],
      default: [],
    },
    activar_sonido: {
      type: Boolean,
      default: true,
    },
    rol: {
      type: String,
      default: "usuario", // Agregar rol por defecto
    },
    cargo: {
      type: String,
      default: "", // Agregar cargo por defecto
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = models.Usuario || mongoose.model("Usuario", usuarioSchema);
export default Usuario;
