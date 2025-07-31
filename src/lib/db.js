import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@donaceci.ivl1ioy.mongodb.net/?retryWrites=true&w=majority&appName=donaceci`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
};
