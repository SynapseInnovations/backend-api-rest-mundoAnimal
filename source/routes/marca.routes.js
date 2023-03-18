const express = require("express");
const router = express.Router();
const { marcasController } = require("../app/producto/marca/marca.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");

router.get("", marcasController.mostrarTodasMarcas);
router.post("/registrar", marcasController.registrarMarca);
//router.put("/modificar", marcasController.modificarMarca);
//router.delete("/eliminar/:id_marcas", marcasController.eliminarMarca);

module.exports = router;
