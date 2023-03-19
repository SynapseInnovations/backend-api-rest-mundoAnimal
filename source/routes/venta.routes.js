const express = require("express");
const router = express.Router();
const { ventaController } = require("../app/venta/venta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");

// Venta
router.get("", ventaController.mostrarVentas);
router.post("/registrar_venta",[], ventaController.registrarVenta); // Agregar la weaita xD

module.exports = router;