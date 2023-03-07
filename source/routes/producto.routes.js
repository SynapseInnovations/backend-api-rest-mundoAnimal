const express = require("express");
const router = express.Router();
const { productController } = require("../app/producto/producto.controller");
const { authToken } = require("../middlewares/autenticacion.jwt");

router.get("", authToken.VerificarToken ,productController.mostrarProductos);
router.post("/agregar_producto", productController.agregarProducto);


module.exports = router;
