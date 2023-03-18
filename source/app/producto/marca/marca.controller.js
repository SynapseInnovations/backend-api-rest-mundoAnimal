const { marcaModel } = require("./marca.model");

const registrarMarca = async(req, res)=>{
      try{
            let marcaRegistrada = await marcaModel.Registrar(req.body);
            return res.json({
              error: false,
              msg: "Se ha registrado la Marca",
              data: marcaRegistrada
            });
      }catch(error){
            console.error(error)
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

const mostrarTodasMarcas = async(req, res)=>{
      try{
            let marcasRegistradas = await marcaModel.MostrarTodo();
            return res.json({
                  error: false,
                  msg: "Lista de todas las marcas del sistema",
                  data: marcasRegistradas
            });
      }catch(error){
            console.error(error)
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

const modificarMarca = async(req, res)=>{
      try{
            return res.json({
                  error: false,
                  msg: "",
                  data: []
            });
      }catch(error){
            console.error(error)
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

const eliminarMarca = async(req, res)=>{
      try{
            return res.json({
                  error: false,
                  msg: "Se ha eliminado la marca",
                  data: []
            });
      }catch(error){
            console.error(error)
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

module.exports.marcasController = {
      registrarMarca,
      mostrarTodasMarcas,
      modificarMarca,
      eliminarMarca
}