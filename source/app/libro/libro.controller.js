const { libroModel } = require("./libro.model");

const MostrarLibro = async(req,res) =>{
      try{
            const query = await libroModel.Mostrar();
            return res.status(200).json({
                  error: false,
                  msg: "Listado de todos los libros registrados",
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

const RegistrarLibro = async(req,res) =>{
      try{
            await libroModel.Registrar(req.body);
            return res.status(200).json({
                  error: false,
                  msg: `Se ha registrado el libro '${req.body.titulo}'`
            })
      }catch(error){
            console.error(error);
            return res.status(400).json({
                  error: true,
                  msg: "" + error.message
            });
      }
};

module.exports.libroController = {
      RegistrarLibro,
      MostrarLibro
}