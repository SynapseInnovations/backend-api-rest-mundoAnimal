const express = require("express");
const router = express.Router();
const { ventaController } = require("../app/venta/venta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { VerificarVenta } = require("../middlewares/VerificarVenta")
const { imagenFormat } = require("../libs/multerConfig");

// Venta
router.get("", ventaController.mostrarVentas);
router.post("/registrar_venta",[imagenFormat.Venta.none()], ventaController.registrarVenta); // Agregar la weaita xD

module.exports = router;