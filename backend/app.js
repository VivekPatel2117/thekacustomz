import express from "express";
import cors from "cors";
import { testPostgres } from "./routes/health.postgres.js";
import product from "./routes/product.routes.js";
import collection from "./routes/collection.routes.js";
import reviewMediaRoutes from "./routes/reviewMedia.routes.js";
import productReviewRoutes from "./routes/productReview.routes.js";
const app = express();


app.use(cors());
app.use(express.json());

app.get("/health/postgres", testPostgres);
app.use("/api/products", product);
app.use("/api/collections", collection);
app.use("/api", productReviewRoutes);
app.use("/api", reviewMediaRoutes);

export default app;
