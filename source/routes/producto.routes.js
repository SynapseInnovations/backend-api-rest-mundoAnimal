const express = require("express");
const router = express.Router();
const { productoController } = require("../app/producto/producto.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { imagenFormat } = require("../libs/multerConfig");

// Producto
router.get("", [authToken.VerificarToken],productoController.mostrarProductos);
router.post("/agregar",[authToken.VerificarToken,imagenFormat.imagenProducto.single("imagen")],productoController.agregarProducto);
router.delete("/eliminar/:codigo",[authToken.VerificarToken],productoController.eliminarProducto);

module.exports = router;
