const express = require("express");
const router = express.Router();
const promocionesController = require("../controllers/promocionesController");

module.exports = (upload) => {
  router.get("/promociones", promocionesController.obtenerPromociones);
  router.get("/promociones/:id", promocionesController.obtenerPromocionPorId);
  router.post("/promociones", upload.single("imagen"), promocionesController.crearPromocion);
  router.put("/promociones/:id", upload.single("imagen"), promocionesController.actualizarPromocion);
  router.delete("/promociones/:id", promocionesController.eliminarPromocion);
  router.get("/destinos-activos", promocionesController.obtenerDestinosActivos);

  return router;
};