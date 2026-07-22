const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de directorio y subida de archivos (Multer)
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// Importación y montaje de Rutas
app.use("/api", require("./routes/contactosRoutes"));
app.use("/api", require("./routes/noticiasRoutes")(upload));
app.use("/api", require("./routes/promocionesRoutes")(upload));
app.use("/api", require("./routes/adminRoutes"));

// Manejo global de 404 y Errores 500
app.use((req, res) => res.status(404).json({ error: `Ruta ${req.originalUrl} no encontrada.` }));
app.use((err, req, res, next) => {
  console.error("🔥 Error no controlado:", err);
  res.status(500).json({ error: err.message || "Error interno del servidor." });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});