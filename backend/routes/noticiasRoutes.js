const express = require("express");
const router = express.Router();
const noticiasController = require("../controllers/noticiasController");

module.exports = (upload) => {
  router.get("/noticias", noticiasController.obtenerNoticias);
  router.get("/noticias/:id", noticiasController.obtenerNoticiaPorId); 
  router.post("/noticias", upload.single("imagen"), noticiasController.crearNoticia);
  router.put("/noticias/:id", upload.single("imagen"), noticiasController.actualizarNoticia);
  router.delete("/noticias/:id", noticiasController.eliminarNoticia);

  return router;
};