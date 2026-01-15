import express from "express";
import cors from "cors";
import { testPostgres } from "./routes/health.postgres.js";
import product from "./routes/product.routes.js";
import collection from "./routes/collection.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health/postgres", testPostgres);
app.use("/api/products", product);
app.use("/api/collections", collection);
export default app;
