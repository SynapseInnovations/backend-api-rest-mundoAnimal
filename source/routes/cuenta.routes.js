const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt")

router.get("",cuentaController.mostrarUsuarios)
router.post("/crear_cuenta",cuentaController.registrarUsuario);
router.post("/iniciar_sesion", cuentaController.iniciarSesion);
router.get("/asignar_rol",[authToken.VerificarToken ,authToken.VerificarAdministrador],cuentaController.asignarRol);
router.get("/perfil",[authToken.VerificarToken,authToken.VerificarUsuario],cuentaController.perfilUsuario)

module.exports = router;