const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "productos"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.nombre + path.extname(file.originalname));  
      }
});

const cargaImagen = multer({ storage: storage });

module.exports = cargaImagen;
