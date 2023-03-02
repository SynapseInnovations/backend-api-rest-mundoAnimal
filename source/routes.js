const express = require("express");
const app = express();

app.use('/app/producto', require("./app/producto/producto.routes"));

module.exports = app;