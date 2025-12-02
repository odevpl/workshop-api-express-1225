import express from "express";
import productRoutes from "./routes/products.routes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
