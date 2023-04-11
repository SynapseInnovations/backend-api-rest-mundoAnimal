const express = require("express");
const router = express.Router();
const { ventaController } = require("../app/venta/venta.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { VerificarVenta } = require("../middlewares/VerificarVenta")
const { multerParser } = require("../libs/multerConfig");

// Venta
router.get("",[authToken.VerificarToken, authToken.VerificarOperadorOrAdministrador],ventaController.mostrarVentas);
router.post("/registrar_venta",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador,multerParser.Venta.none(),VerificarVenta.StockInventario], ventaController.registrarVenta); 
router.delete("/eliminar",     [authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador],ventaController.eliminarVenta);
module.exports = router;