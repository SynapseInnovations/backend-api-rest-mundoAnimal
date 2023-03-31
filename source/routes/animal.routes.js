const express = require("express");
const router = express.Router();
const { imagenFormat } = require("../libs/multerConfig")
const { authToken } = require("../middlewares/autenticacion.jwt");
const { animalController } = require("../app/animal/animal.controller")

// Producto - Animal
router.get("", [authToken.VerificarToken],animalController.mostrarAnimales);
router.post("/agregar",[authToken.VerificarToken,imagenFormat.Animal.none()],animalController.registrarAnimal);
router.put("/modificar",[authToken.VerificarToken, imagenFormat.Animal.none()],animalController.modificarAnimal);
//router.delete("/eliminar");

module.exports = router;