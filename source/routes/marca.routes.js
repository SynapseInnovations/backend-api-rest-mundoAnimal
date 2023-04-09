const express = require("express");
const router = express.Router();
const { marcasController } = require("../app/marca/marca.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { multerParser } = require("../libs/multerConfig")

router.get("", [authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador ],marcasController.mostrarMarcas);
router.post("/agregar", [authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador, multerParser.Marca.none()],marcasController.registrarMarca);
router.put("/modificar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador, multerParser.Marca.none()],marcasController.modificarMarca);
router.delete("/eliminar",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador],marcasController.eliminarMarca);

module.exports = router;
