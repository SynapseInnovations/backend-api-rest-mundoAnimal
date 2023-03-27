const express = require("express");
const router = express.Router();
const { marcasController } = require("../app/marca/marca.controller");

const { authToken } = require("../middlewares/autenticacion.jwt");

router.get("", marcasController.mostrarMarcas);
router.post("/agregar", marcasController.registrarMarca);
//router.put("/modificar", marcasController.modificarMarca);
//router.delete("/eliminar/:id_marcas", marcasController.eliminarMarca);

module.exports = router;
