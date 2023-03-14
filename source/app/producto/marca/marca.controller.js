const { Marca } = require("../../../class/marca")
const { marcaModel } = require("./marca.model");

const registrarMarca = async(req, res)=>{
      try{
            const marca = new Marca(req.body)
            let marcaRegistrada = await marcaModel.Registrar(marca);
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
                  msg: "",
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

module.exports.marcasController = {
      registrarMarca,
      mostrarTodasMarcas,
      modificarMarca,
      eliminarMarca
}