const express = require("express");
const router = express.Router();
const { categoriasController } = require("../app/categoria/categoria.controller")

// Producto - Categoria
router.get("", categoriasController.mostrarCategorias);
//router.post("/categoria/registrar");
//router.put("/categoria/modificar");
//router.delete("/categoria/eliminar");

module.exports = router;