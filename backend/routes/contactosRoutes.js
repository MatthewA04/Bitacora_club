const express = require("express");
const router = express.Router();
const contactosController = require("../controllers/contactosController");

router.post("/cotizaciones", contactosController.crearCotizacion);
router.get("/contactos", contactosController.obtenerContactos);
router.put("/contactos/:id", contactosController.actualizarEstado);
router.delete("/contactos/:id", contactosController.eliminarContacto);

module.exports = router;