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

const agregarProducto = async(req, res) =>{
      try{
            let consulta_insercionProducto = await productoModel.Agregar(req.body, req.file);
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

      }catch(error){
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const eliminarProducto = async(req, res) =>{
      try {
            const consulta_eliminarProducto = await productoModel.Eliminar(req.params.codigo);
            return res.status(200).json({
                  error: false,
                  msg: 'Se ha eliminado el producto',
                  data: consulta_eliminarProducto
            });
      }catch(error) {
            return res.json({
                  error:true,
                  msg: ''+error.message
            })
      }
};

module.exports.productoController = {
      mostrarProductos,
      agregarProducto,
      modificarProducto,
      eliminarProducto
};