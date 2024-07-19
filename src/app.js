import express, { json } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import NewProduct from "./routes/products.routes.js";
import Pedidos from "./routes/pedidos.routes.js";
import { FRONTEND_URL } from "./config.js";


const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


app.use("/api", Pedidos);
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", NewProduct);


export default app;
