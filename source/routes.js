const express = require("express");
const app = express();

app.use('/producto', require("./routes/producto.routes"));
app.use('/usuario', require("./routes/cuenta.routes"));

module.exports = app;