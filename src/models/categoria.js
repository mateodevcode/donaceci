import mongoose, { models, Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    nombreFormateado: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Categoria =
  models.Categoria || mongoose.model("Categoria", categoriaSchema);
export default Categoria;
