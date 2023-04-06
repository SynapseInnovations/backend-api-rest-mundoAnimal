const { ventaModel  } = require("./venta.model");

const registrarVenta = async(req,res) =>{
      try{
            await query.Registrar(req.body);
            return res.status(200).json({
                  error: false,
                  msg: "Se ha registrado la venta exitosamente",
            });
      }catch(error){
            console.error(error)
            return res.status(400).json({
                  error: true,
                  msg: error.name+ " " + error.message,
            });
      }
};

const mostrarVentas = async(req, res) =>{
      try {
            const query = await ventaModel.VerVentas();
            return res.status(200).json({
                  error: false,
                  message: "Lista de ventas cargada exitosamente.",
                  data: query
            });
      } catch (error) {
            console.error(error);
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const eliminarVenta = async(req, res) => {
      try{
            const query = await ventaModel.Eliminar(req.query.numero_boleta);
            return res.status(200).json({
                  error: true,
                  msg: "Se ha anulado la venta exitosamente.}",
                  data: query
            });
      }catch(error){
            console.error(error);
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
}

module.exports.ventaController = {
      mostrarVentas,
      registrarVenta,
      eliminarVenta
}
