const multer = require("multer");
const path = require("path");

const producto = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "productos"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.nombre + path.extname(file.originalname));  
      }
});

const cuenta = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "cuentas"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.rut + path.extname(file.originalname));  
      }
});

const marca = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "marcas"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.nombre + path.extname(file.originalname));
      },
});

const Producto = multer({ storage: producto });
const Cuenta = multer({ storage: cuenta});
const Marca = multer({ storage: marca});

module.exports.imagenFormat = {
      Cuenta,
      Producto,
      Marca
}