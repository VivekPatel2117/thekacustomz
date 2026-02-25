import express from "express";
import cors from "cors";
import { testPostgres } from "./routes/health.postgres.js";
import product from "./routes/product.routes.js";
import collection from "./routes/collection.routes.js";
import reviewMediaRoutes from "./routes/reviewMedia.routes.js";
import productReviewRoutes from "./routes/productReview.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();


app.use(cors());
app.use(express.json());

app.get("/health/postgres", testPostgres);
app.use("/api/products", product);
app.use("/api/collections", collection);
app.use("/api", productReviewRoutes);
app.use("/api", reviewMediaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
export default app;
