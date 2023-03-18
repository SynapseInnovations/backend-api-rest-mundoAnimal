const { ventaModel  } = require("./venta.model");

const registrarVenta = async(req,res) =>{
      try{
            const consulta_mostrarProductos = await ventaModel.Registrar(req.body);
            return res.status(200).json({
                  error: true,
                  msg: "Se ha registrado la venta exitosamente",
                  data: consulta_mostrarProductos
            });
      }catch(error){
            console.error(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const mostrarVentas = async(req, res) =>{
      try {
            return res.json('mostrar venta')
      } catch (error) {
            console.error(error);
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

module.exports.ventaController = {
      mostrarVentas,
      registrarVenta
}
