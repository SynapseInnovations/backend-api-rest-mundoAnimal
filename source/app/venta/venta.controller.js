const { ventaModel  } = require("./venta.model");

const registrarVenta = async(req,res) =>{
      try{
            await ventaModel.Registrar(req.body);
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
            const ventas = await ventaModel.VerVentas();
            return res.status(200).json({
                  error: false,
                  message: "",
                  data: ventas
            });
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
