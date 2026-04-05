const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const usersRoutes = require("./src/routes/users.routes");
const productsRoutes = require("./src/routes/products.routes");
const cartRoutes = require("./src/routes/cart.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/cart", cartRoutes);

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
