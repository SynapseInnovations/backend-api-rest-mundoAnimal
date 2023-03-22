const Venta = require("../class/venta")
const { productoModel } = require("../app/producto/producto.model");

const StockInventario = async(req,res,next) =>{
      try{
            const nuevaVenta = new Venta(req.body);
            const inventario = await productoModel.VerProductos();
            const respuesta = await nuevaVenta.ChequearInventario(inventario);

            if(!respuesta.stock){
                  throw new TypeError(`De ${respuesta.producto_nombre} solo hay ${respuesta.cantidad} unidades disponibles`);
            }
            next()
            
      }catch(error){
            return res.status(400).json({
                  error: true,
                  message: "" + error.message
            });
      }
};

module.exports.VerificarVenta = {
      StockInventario
}