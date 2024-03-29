const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/autenticacion.jwt");
const { categoriasController } = require("../app/categoria/categoria.controller")
const { multerParser } = require("../libs/multerConfig")

// Producto - Categoria
router.get("", [authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador],categoriasController.mostrarCategorias);
router.post("/agregar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador,multerParser.Categoria.none()],categoriasController.registrarCategoria);
router.put("/modificar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador, multerParser.Categoria.none()],categoriasController.modificarCategoria);
router.delete("/eliminar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador, multerParser.Categoria.none()],categoriasController.eliminarCategoria);

module.exports = router;