const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt")

router.get("",cuentaController.mostrarUsuarios)
router.post("/crear_cuenta",cuentaController.registrarUsuario);
router.get("/iniciar_sesion", cuentaController.iniciarSesion);


module.exports = router;