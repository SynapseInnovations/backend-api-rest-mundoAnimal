const conexion = require("../../database")

const Mostrar = async(req, res) =>{
      const sql_Mostrar = `
      SELECT * FROM Categoria
      `
      return await conexion.query(sql_Mostrar)
};

module.exports.categoriaModel = {
      Mostrar
}