const Animal = require("../../class/animal");
const conexion = require("../../database")

const Mostrar = async(req, res) =>{
      const sql_Mostrar = `
      SELECT * FROM Animal
      `
      return await conexion.query(sql_Mostrar)
};
const Registrar = async(animal) => {
      const newAnimal = new Animal(animal)
      
      return await newAnimal.Registrar();
};

const Modificar = async(animal) =>{
      const newAnimal = new Animal(animal)
      return await newAnimal.Modificar();
};
module.exports.animalModel = {
      Mostrar,
      Registrar,
      Modificar
}