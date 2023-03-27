const express = require("express");
const router = express.Router();
const { productoController } = require("../app/producto/producto.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");
const cargaImagen = require("../libs/multerConfig");

// Producto
router.get("", [authToken.VerificarToken],productoController.mostrarProductos);
router.post("/agregar",[authToken.VerificarToken,cargaImagen.single("imagen")],productoController.agregarProducto);
router.delete("/eliminar/:codigo",[authToken.VerificarToken],productoController.eliminarProducto);

// FALTA POR HACER
//router.put("/modificar",[authToken.VerificarToken, authToken.VerificarVendedorOrAdministrador],productoController.modificarProducto);

/*
// Producto - Animal
router.get("/animal");
router.post("/animal/registrar");
router.put("/animal/modificar")
router.delete("/animal/eliminar")

// Producto - Categoria
router.get("/categoria");
router.post("/categoria/registrar");
router.put("/categoria/modificar");
router.delete("/categoria/eliminar");

// Producto - Marca
router.get("/marca");
router.post("/marca/registrar");
router.put("/marca/modificar");
router.delete("/marca/eliminar");
*/
module.exports = router;
