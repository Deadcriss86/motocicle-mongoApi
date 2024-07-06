import express, { json } from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import NewProduct from "./routes/products.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", NewProduct, authRoutes);

export default app;
