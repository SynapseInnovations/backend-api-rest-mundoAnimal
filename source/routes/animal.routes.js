const express = require("express");
const router = express.Router();
const { animalController } = require("../app/animal/animal.controller")

router.get("", animalController.mostrarAnimal)

module.exports = router;