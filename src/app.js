import express, { json } from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import NewProduct from "./routes/products.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", NewProduct, authRoutes);


export default app;
