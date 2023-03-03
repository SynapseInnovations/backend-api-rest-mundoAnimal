const { productoModel  } = require("../../model/producto.model")

const mostrarProductos = async(req,res) =>{
      try{
            let consulta_mostrarProductos = await productoModel.VerProductos();
            return res.json(consulta_mostrarProductos);
            /*return res.json({
                  error: false,
                  data: consulta_mostrarProductos
            })*/
      }catch(error){
            return res.json({
                  error: true,
                  msg: ''+error
            })
      }
}

const agregarProducto = async(req, res) =>{
      try{
            let consulta_insercionProducto = await productoModel.AgregarProducto(req.body);
            return res.json({
                  error: false,
                  msg: "Se ha ingresado el producto de forma exitosa",
                  data: consulta_insercionProducto
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error
            })
      }
}

module.exports.productController = {
      mostrarProductos,
      agregarProducto
}