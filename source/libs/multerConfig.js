const { throws } = require("assert");
const multer = require("multer");
const path = require("path");

const MIMETYPES = ['image/jpeg','image/png'];

const producto = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "productos"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.nombre + path.extname(file.originalname));  
      },
      fileFilter: function(req, file, cb){
            try{
                  if (MIMETYPES.includes(file.mimetype)){
                        console.log("=)1");
                        cb(null, true); 
                  }
                  else{
                        console.log("=)2"); 
                        cb(new Error(`Solo se admiten imágenes del tipo ${MIMETYPES.join(' ')} estan permitidos.`));
                  } 
            }catch(error){
                  throw new TypeError("xd")
            }
      },
      limits:{
            fieldSize: 2000000 //2 MB
      }
});

const cuenta = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "cuentas"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.rut + path.extname(file.originalname));  
      },
      fileFilter: function(req, file, cb){
            if(MIMETYPES.includes(file.mimetype)) cb(null, true);
            else cb(new Error(`Solo se admiten imágenes del tipo ${MIMETYPES.join(' ')} estan permitidos.`));
      },
      limits:{
            fieldSize: 2000000 //2 MB
      }
});

const marca = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public", "marcas"));
      },
      filename: function (req, file, cb) {
            cb(null, req.body.nombre + path.extname(file.originalname));
      },
      fileFilter: function(req, file, cb){
            if(MIMETYPES.includes(file.mimetype)) cb(null, true);
            else cb(new Error(`Solo se admiten imágenes del tipo ${MIMETYPES.join(' ')} estan permitidos.`));
      },
      limits:{
            fieldSize: 2000000 //2 MB
      }
});
const Producto = multer({ storage: producto });
const Cuenta = multer({ storage: cuenta});
const Marca = multer({ storage: marca});
const Categoria = multer();
const Mascota = multer();
const Venta = multer();
module.exports.multerParser = {
      Cuenta,
      Producto,
      Marca,
      Categoria,
      Mascota,
      Venta
}