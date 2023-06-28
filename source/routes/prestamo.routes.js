const express = require("express");
const { authToken } = require("../middlewares/autenticacion.jwt");
const router = express.Router();
const { prestamoController } = require("../app/prestamo/prestar.controller");
const { multerParser } = require("../libs/multerConfig");

router.get("", [authToken.VerificarToken], prestamoController.MostrarPrestamo);
router.post("/prestar_libro",[authToken.VerificarToken, multerParser.Producto.none()], prestamoController.PrestarLibro);

module.exports = router;