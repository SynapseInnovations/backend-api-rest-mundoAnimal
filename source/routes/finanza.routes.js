const express = require("express");
const router = express.Router();
const { finanzaController } = require("../app/finanza/finanza.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");

// Venta
router.get("/historial",[authToken.VerificarToken, authToken.VerificarAdministrador],finanzaController.mostrarVentas);

module.exports = router;