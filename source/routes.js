const express = require("express");
const app = express();

app.use('/usuario', require("./routes/cuenta.routes"));
app.use("/producto", require("./routes/producto.routes"));
app.use("/venta", require("./routes/venta.routes"));

app.use("/marca", require("./routes/marca.routes"));
app.use("/categoria", require("./routes/categoria.routes"));
app.use("/mascota", require("./routes/mascota.routes"));


module.exports = app;