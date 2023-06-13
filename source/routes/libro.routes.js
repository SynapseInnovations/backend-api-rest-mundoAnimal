const express = require("express");
const { authToken } = require("../middlewares/autenticacion.jwt");
const router = express.Router();
const { libroController } = require("../app/libro/libro.controller");

router.get("", [authToken.VerificarToken], libroController.MostrarLibro);
router.post("/registrar_libro",[authToken.VerificarToken], libroController.RegistrarLibro);

module.exports = router;