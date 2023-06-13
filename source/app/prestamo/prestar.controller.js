const { prestamoModel } = require("./prestar.model");

const PrestarLibro = async(req,res) =>{
      try{
            await prestamoModel.Registrar(req.body)
            return res.status(200).json({
                  error: false,
                  msg: "Se ha registrado el prestamo"
            })
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message
            });
      }
};

const MostrarPrestamo = async(req,res) =>{
      try{
            const query = await prestamoModel.Mostrar();
            return res.status(200).json({
                  error: false,
                  msg: "Listado de todo prestamo",
                  data: query
            })
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message
            });
      }
};

module.exports.prestamoController = {
      PrestarLibro,
      MostrarPrestamo
}