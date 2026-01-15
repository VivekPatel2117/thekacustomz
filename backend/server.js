import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

console.log("Environment PORT:", process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
