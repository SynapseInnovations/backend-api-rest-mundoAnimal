const { productoModel  } = require("../../model/producto.model")

const mostrarProductos = async(req,res) =>{
      try{
            let consulta_mostrarProductos = await productoModel.VerProductos();
            return res.json({
                  error: false,
                  data: consulta_mostrarProductos
            })
      }catch(error){
            return res.json({
                  error: true,
                  msg: ''+error
            })
      }
}

module.exports.productController = {
      mostrarProductos
}