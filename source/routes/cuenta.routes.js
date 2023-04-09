const express = require("express");
const router = express.Router();
const { cuentaController } = require("../app/cuenta/cuenta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { multerParser } = require("../libs/multerConfig");


router.get("",[authToken.VerificarToken,authToken.VerificarAdministrador],cuentaController.mostrarUsuarios)
router.post("/crear_cuenta",[authToken.VerificarToken, authToken.VerificarAdministrador,multerParser.Cuenta.single('imagen')],cuentaController.registrarUsuario);

router.post("/iniciar_sesion", cuentaController.iniciarSesion);
router.get("/perfil",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador],cuentaController.perfilUsuario)

router.post("/modificar", [authToken.VerificarToken, authToken.VerificarAdministrador, multerParser.Cuenta.single('imagen')], cuentaController.modificarUsuario);
router.delete("/eliminar",[authToken.VerificarToken, authToken.VerificarAdministrador],cuentaController.eliminarUsuario);
router.put("/habilitar",  [authToken.VerificarToken, authToken.VerificarAdministrador],cuentaController.habilitarCuenta);

module.exports = router;