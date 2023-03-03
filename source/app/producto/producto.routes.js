const express = require("express");
const router = express.Router();
const { productController } = require("./producto.controller");


router.get("", productController.mostrarProductos);
router.post("/agregar_producto", productController.agregarProducto);


module.exports = router;
