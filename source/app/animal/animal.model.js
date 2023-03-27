const  conexion = require("../../database");

const Mostrar = async(req, res) =>{
      const sql_Mostrar = `
      SELECT * FROM Animal
      `
      return await conexion.query(sql_Mostrar)
};

module.exports.animalModel = {
      Mostrar
}