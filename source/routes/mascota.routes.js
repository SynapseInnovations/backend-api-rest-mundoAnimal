const express = require("express");
const router = express.Router();
const { multerParser } = require("../libs/multerConfig")
const { authToken } = require("../middlewares/autenticacion.jwt");
const { mascotaController } = require("../app/mascota/mascota.controller")

// Producto - Mascota
router.get("", [authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador],mascotaController.mostrarMascotas);
router.post("/agregar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador,multerParser.Mascota.none()],mascotaController.registrarMascota);
router.put("/modificar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador, multerParser.Mascota.none()],mascotaController.modificarMascota);
router.delete("/eliminar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador],mascotaController.eliminarMascota);

module.exports = router;