const express = require("express");
const router = express.Router();
const { productoController } = require("../app/producto/producto.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { multerParser } = require("../libs/multerConfig");

// Producto
router.get("", [authToken.VerificarToken],productoController.mostrarProductos);
router.get("/mantenedor",[authToken.VerificarToken],productoController.obtenerMantenedor);
router.post("/agregar",[authToken.VerificarToken,multerParser.Producto.single("imagen")],productoController.agregarProducto);
router.post("/modificar",[authToken.VerificarToken, multerParser.Producto.single("imagen")],productoController.modificarProducto);
router.delete("/eliminar",[authToken.VerificarToken],productoController.eliminarProducto);

module.exports = router;
