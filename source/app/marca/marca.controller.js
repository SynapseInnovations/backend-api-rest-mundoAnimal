const Marca = require("../../class/marca");
const { marcaModel } = require("./marca.model");

const mostrarMarcas = async(req, res) => {
      try{
            const query = await marcaModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de marcas cargada exitosamente.",
                  data: query
            });
      }catch(error){
            console.log(error)
            return res.status(400).json({
                  error: true,
                  msg: ''+ error.message
            });
      }
};
const registrarMarca = async(req, res) =>{
      try{
            const query = await marcaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: `Se ha ingresado la marca de forma exitosa.`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarMarca = async(req, res) =>{
      try{
            const query = await marcaModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito la marca.`,
                  data: query
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};

const eliminarMarca = async(req, res)=>{
      try{
            const query = await Marca.Eliminar(req.query.id)
            return res.json({
                  error: false,
                  msg: `Se ha eliminado con exito la marca.`,
                  data: query
            });
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: ''+error.message
            });
      }
};

module.exports.marcasController = {
      registrarMarca,
      mostrarMarcas,
      modificarMarca,
      eliminarMarca
}