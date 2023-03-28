const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { imagenFormat } = require("../libs/multerConfig");


router.get("",cuentaController.mostrarUsuarios)
router.post("/crear_cuenta",[imagenFormat.imagenCuenta.single('imagen')],cuentaController.registrarUsuario);
router.post("/iniciar_sesion", cuentaController.iniciarSesion);
router.get("/perfil",[authToken.VerificarToken],cuentaController.perfilUsuario)
router.post("/modificar", [authToken.VerificarToken,imagenFormat.imagenCuenta.single('imagen')], cuentaController.modificarUsuario)

module.exports = router;