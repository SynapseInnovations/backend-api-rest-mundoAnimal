const { animalModel } = require("./animal.model");

const mostrarAnimales = async(req, res) => {
      try{
            const listaAnimales = await animalModel.Mostrar();
            return res.status(200).json({
                  error:false,
                  msg: "Lista de todos los animales disponibles",
                  data: listaAnimales
            });
      }catch(error){
            console.log(error)
            return res.status(400).json({
                  error: true,
                  msg: ''+ error.message
            });
      }
};
const registrarAnimal = async(req, res) =>{
      try{
            const consulta_insercionAnimal = await animalModel.Registrar(req.body);
            return res.json({
                  error: false,
                  msg: "Se ha ingresado el animal de forma exitosa",
                  data: consulta_insercionAnimal
            })
      }catch(error){
            return res.json({
                  error:true,
                  msg: ''+error.message
            });
      }
};

const modificarAnimal = async(req, res) =>{
      try{
            const consulta_modificarAnimal = await animalModel.Modificar(req.body)
            return res.json({
                  error: false,
                  msg: `Se ha modificado con exito el animal ${req.body.id}`,
                  data: consulta_modificarAnimal
            })
      }catch(error){
            console.log(error)
            return res.json({
                  error: true,
                  msg: "" + error.message,
            });
      }
};



module.exports.animalController = {
      mostrarAnimales,
      registrarAnimal,
      modificarAnimal
}