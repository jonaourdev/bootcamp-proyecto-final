const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Backend de DonHielo funcionando correctamente",
  });
});

// Ruta de healthcheck
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API saludable",
  });
});

module.exports = app;
