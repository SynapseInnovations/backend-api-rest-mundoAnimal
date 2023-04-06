const { productoModel  } = require("./producto.model")

const mostrarProductos = async(req,res) =>{
      try{
            let consulta_mostrarProductos = await productoModel.VerProductos();
            return res.json({
                  error: false,
                  data: consulta_mostrarProductos
            });
      }catch(error){
            console.error(error);
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

const obtenerMantenedor= async(req,res) => {
      try{
            let consulta_mostrarMantenedor = await productoModel.ObtenerMantenedor();
            return res.json({
                  error: false,
                  msg: "Se ha obtenido el mantenedor de una sola consulta",
                  data: consulta_mostrarMantenedor
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const agregarProducto = async(req, res) =>{
      try{
            let consulta_insercionProducto = await productoModel.Agregar(req.body, req.file, req.headers["token"]);
            return res.json({
                  error: false,
                  msg: "Se ha ingresado el producto de forma exitosa",
                  data: consulta_insercionProducto
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarProducto = async(req, res) =>{
      try{
            const consulta_modificarProducto = await productoModel.Modificar(req.body, req.file, req.headers["token"])
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito el producto ${req.body.codigo_barra}`,
                  data: consulta_modificarProducto
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
            const consulta_eliminarProducto = await productoModel.Eliminar(req.query.codigo_barra, req.headers["token"]);
            return res.status(200).json({
                  error: false,
                  msg: 'Se ha eliminado el producto',
                  data: consulta_eliminarProducto
            });
      }catch(error) {
            console.error(error)
            return res.json({
                  error:true,
                  msg: ''+error.message
            })
      }
};

const historialProducto = async(req,res) =>{
      try{
            const consulta_historialProducto = await productoModel.VerHistorialProducto()
            return res.status(200).json({
                  error: false,
                  msg: 'Historial de cambios en los productos',
                  data: consulta_historialProducto
            });
      }catch(error){
            console.error(error)
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