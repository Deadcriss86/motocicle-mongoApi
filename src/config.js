import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const FRONTEND_URL =
  "https://motoapiv4.vercel.app/" || "http://localhost:5173";
