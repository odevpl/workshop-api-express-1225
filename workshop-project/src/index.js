import express from "express";
import productRoutes from "./routes/products.routes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
