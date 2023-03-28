const { animalModel } = require("./animal.model")

const mostrarAnimal = async (req,res) => {
      try{
            const listaAnimales = await animalModel.Mostrar();
            return res.status(200).json({
                  error: false,
                  msg: "Lista de todos los tipos de animales.",
                  data: listaAnimales,
            });
      }catch(error){
            console.log(error);
            return res.status(400).json({
                  error: true,
                  msg: ''+ error.message
            });
      }
};

module.exports.animalController = {
      mostrarAnimal
}