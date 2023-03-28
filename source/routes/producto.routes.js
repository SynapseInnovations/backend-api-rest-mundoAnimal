const express = require("express");
const router = express.Router();
const { productoController } = require("../app/producto/producto.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const { imagenFormat } = require("../libs/multerConfig");

// Producto
router.get("", [authToken.VerificarToken],productoController.mostrarProductos);
router.post("/agregar",[authToken.VerificarToken,imagenFormat.imagenProducto.single("imagen")],productoController.agregarProducto);
router.delete("/eliminar/:codigo",[authToken.VerificarToken],productoController.eliminarProducto);

// FALTA POR HACER
//router.put("/modificar",[authToken.VerificarToken, authToken.VerificarVendedorOrAdministrador],productoController.modificarProducto);

/*
// Producto - Animal
router.get("/animal");
router.post("/animal/registrar");
router.put("/animal/modificar")
router.delete("/animal/eliminar")

// Producto - Marca
router.get("/marca");
router.post("/marca/registrar");
router.put("/marca/modificar");
router.delete("/marca/eliminar");
*/
module.exports = router;
