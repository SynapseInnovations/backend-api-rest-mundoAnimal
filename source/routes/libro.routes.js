const express = require("express");
const { authToken } = require("../middlewares/autenticacion.jwt");
const router = express.Router();
const { libroController } = require("../app/libro/libro.controller");
const { multerParser } = require("../libs/multerConfig");

router.get("", [authToken.VerificarToken], libroController.MostrarLibro);
router.post("/registrar_libro",[authToken.VerificarToken,multerParser.Producto.none()], libroController.RegistrarLibro);

module.exports = router;