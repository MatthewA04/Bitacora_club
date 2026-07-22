const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/admin/login", adminController.login);
router.get("/resumen/metricas", adminController.obtenerMetricas);

module.exports = router;