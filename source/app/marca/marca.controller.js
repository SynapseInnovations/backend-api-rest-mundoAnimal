const { marcaModel } = require("./marca.model");

const mostrarMarcas = async(req, res) => {
      try{
            const listaMarcas = await marcaModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de todas las marcas disponibles",
                  data: listaMarcas
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
            console.log(req)
            const consulta_insercionMarca = await marcaModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: "Se ha ingresado la marca de forma exitosa",
                  data: consulta_insercionMarca
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarMarca = async(req, res) =>{
      try{
            const consulta_modificarMarca = await marcaModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito la marca ${req.body.id}`,
                  data: consulta_modificarMarca
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
      mostrarMarcas,
      modificarMarca,
      eliminarMarca
}