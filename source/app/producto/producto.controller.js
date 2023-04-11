const { productoModel  } = require("./producto.model")

const mostrarProductos = async(req,res) =>{
      try{
            const query = await productoModel.VerProductos();
            return res.json({
                  error: false,
                  msg: "Lista de productos cargada exitosamente.",
                  data: query
            });
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

const obtenerMantenedor= async(req,res) => {
      try{
            const query = await productoModel.ObtenerMantenedor();
            return res.json({
                  error: false,
                  msg: "Cargados los datos de la categorización",
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const agregarProducto = async(req, res) =>{
      try{
            const query = await productoModel.Agregar(req.body, req.file, req.headers["token"]);
            return res.json({
                  error: false,
                  msg: `Se ha ingresado el producto ${req.body.codigo_barra} de forma exitosa.`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarProducto = async(req, res) =>{
      try{
            const query = await productoModel.Modificar(req.body, req.file, req.headers["token"])
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito el producto ${req.body.codigo_barra}`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const eliminarProducto = async(req, res) =>{
      try {
            const query = await productoModel.Eliminar(req.query.codigo_barra, req.headers["token"]);
            return res.status(200).json({
                  error: false,
                  msg: `Se ha eliminado con exito el producto ${req.body.codigo_barra}`,
                  data: query
            });
      }catch(error) {
            console.log(error)
            return res.json({
                  error:true,
                  msg: ''+error.message
            })
      }
};

const historialProducto = async(req,res) =>{
      try{
            const query = await productoModel.VerHistorialProducto()
            return res.status(200).json({
                  error: false,
                  msg: 'Historial de cambios de los productos cargado exitosamente.',
                  data: query
            });
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.productoController = {
      mostrarProductos,
      agregarProducto,
      modificarProducto,
      eliminarProducto,
      obtenerMantenedor,
      historialProducto
};