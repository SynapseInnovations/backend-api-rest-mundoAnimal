const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt")

router.get("",cuentaController.mostrarUsuarios)
router.post("/crear_cuenta",cuentaController.registrarUsuario);
router.post("/iniciar_sesion", cuentaController.iniciarSesion);
router.get("/perfil",[authToken.VerificarToken],cuentaController.perfilUsuario)
router.post("/modificar", [authToken.VerificarToken], cuentaController.modificarUsuario)

module.exports = router;