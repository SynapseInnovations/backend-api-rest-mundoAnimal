const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");


router.get("",cuentaController.mostrarUsuarios)
router.post("/crear_cuenta", cuentaController.registrarUsuario);

module.exports = router;