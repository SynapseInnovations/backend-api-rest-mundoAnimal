const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { multerParser } = require("../libs/multerConfig");


router.get("",cuentaController.mostrarUsuarios)
router.post("/crear_cuenta",[multerParser.Cuenta.single('imagen')],cuentaController.registrarUsuario);
router.post("/iniciar_sesion", cuentaController.iniciarSesion);
router.get("/perfil",[authToken.VerificarToken],cuentaController.perfilUsuario)
router.post("/modificar", [authToken.VerificarToken, multerParser.Cuenta.single('imagen')], cuentaController.modificarUsuario);
router.delete("/eliminar",[authToken.VerificarToken], cuentaController.eliminarUsuario);

module.exports = router;