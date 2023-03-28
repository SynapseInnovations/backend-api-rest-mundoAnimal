const express = require("express");
const router = express.Router();
const { marcasController } = require("../app/marca/marca.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { imagenFormat } = require("../libs/multerConfig")

router.get("", [authToken.VerificarToken ],marcasController.mostrarMarcas);
router.post("/agregar", [authToken.VerificarToken, imagenFormat.Marca.single('imagen')],marcasController.registrarMarca);
//router.put("/modificar", marcasController.modificarMarca);
//router.delete("/eliminar/:id_marcas", marcasController.eliminarMarca);

module.exports = router;
