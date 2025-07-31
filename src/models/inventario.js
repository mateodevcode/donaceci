import mongoose, { models, Schema } from "mongoose";

// Usamos el mismo _id del producto para tener una relación directa
const inventarioSchema = new Schema(
  {
    _id: {
      type: String, // mismo _id del producto original
      required: true,
    },
    stockActual: {
      type: Number,
      required: true,
      default: 0,
    },
    stockMinimo: {
      type: Number,
      required: true,
      default: 0,
    },
    ultimoArqueo: {
      type: Date,
      default: null, // lo dejamos null por defecto hasta que se haga el primero
    },
    ultimoMovimiento: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
    _id: false, // evita que Mongo cree su propio _id adicional (porque tú lo defines)
  }
);

const Inventario =
  models.Inventario || mongoose.model("Inventario", inventarioSchema);

export default Inventario;
