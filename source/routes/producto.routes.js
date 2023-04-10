const express = require("express");
const router = express.Router();
const { productoController } = require("../app/producto/producto.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { multerParser } = require("../libs/multerConfig");

// Producto
router.get("", [authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador],productoController.mostrarProductos);
router.get("/mantenedor",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador],productoController.obtenerMantenedor);
router.post("/agregar",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador,multerParser.Producto.single("imagen")],productoController.agregarProducto);
router.put("/modificar",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador, multerParser.Producto.single("imagen")],productoController.modificarProducto);
router.delete("/eliminar",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador],productoController.eliminarProducto);
router.get("/historial",[authToken.VerificarToken,authToken.VerificarOperadorOrAdministrador],productoController.historialProducto);

module.exports = router;
