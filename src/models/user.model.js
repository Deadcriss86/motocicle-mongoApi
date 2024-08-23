import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String },
  apellido: { type: String },
  nacionalidad: { type: String },
  celular: { type: String },
  cp: { type: String },
  ciudad: { type: String },
  calle: { type: String },
  delegacion: { type: String },
  referencias: { type: String },
  avatar: { type: String }, // Agrega este campo para el avatar
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
export default User;
