const { ventaModel  } = require("./venta.model");

const registrarVenta = async(req,res) =>{
      try{
            const query = await ventaModel.Registrar(req.body);
            return res.status(200).json({
                  error: false,
                  msg: "Se ha registrado la venta exitosamente",
            });
      }catch(error){
            console.log(error)
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
                  msg: "Lista de ventas cargada exitosamente.",
                  data: query
            });
      } catch (error) {
            console.log(error)
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
                  msg: `Se ha anulado la boleta N° ${req.query.numero_boleta} exitosamente.`
            });
      }catch(error){
            console.log(error)
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
